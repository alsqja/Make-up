package ICTPrj.server.service;

import ICTPrj.server.domain.entity.Follow;
import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.FollowRepository;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    @Value("${cloud.aws.s3.fileprefix}")
    private String filePrefix;

    private Long getCount(User user, int flag){
        if(flag == 1)
            return followRepository.countByFollowing(user);
        else
            return followRepository.countByFollower(user);
    }

    public UserWithFollowDto signin(String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("없는 사용자입니다."));
        Long following = getCount(user, 0);
        Long follower = getCount(user, 1);
        return UserWithFollowDto.of(user, following, follower, filePrefix);
    }

    @Transactional
    public IdDto doFollow(String email, FollowDto followDto){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("없는 사용자입니다."));
        User other = userRepository.findById(followDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("없는 사용자입니다."));
        Boolean flag = followDto.getIsPlus();
        if(flag){
            Follow follow = Follow.builder()
                    .follower(user)
                    .following(other)
                    .build();
            followRepository.save(follow);
        }else{
            followRepository.deleteByFollowingAndFollower(other, user);
        }

        return IdDto.builder()
                .id(other.getId())
                .build();
    }

    public FollowUserDto getFollowList(Long userId, Long cursorId, int flag){
        List<User> userList;
        if(flag == 1){
            if(cursorId == -1){
                userList = userRepository.findFollowing(userId);
            }else{
                userList = userRepository.findFollowingByCursor(userId, cursorId);
            }
        }else{
            if(cursorId == -1){
                userList = userRepository.findFollower(userId);
            }else{
                userList = userRepository.findFollowerByCursor(userId, cursorId);
            }
        }

        List<DefaultUserDto> users = new ArrayList<DefaultUserDto>();
        for(User user : userList){
            users.add(DefaultUserDto.of(user, filePrefix));
        }
        return FollowUserDto.builder()
                .user(users)
                .build();
    }
}
