package ICTPrj.server.service;

import ICTPrj.server.domain.entity.Post;
import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.PostRepository;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.PostDto;
import ICTPrj.server.dto.SearchUsersDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SearchService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Value("${cloud.aws.s3.fileprefix}")
    private String filePrefix;

    public List<SearchUsersDto> searchUser(String query, Long cursorId) {
        query = "%" + query + "%";

        List<User> users = new ArrayList<>();

        if(cursorId == -1) {
            users = userRepository.findUsersByNicknameLike(query);
        }
        else {
            users = userRepository.findUsersByNicknameLikeCursor(query, cursorId);
        }
        List<SearchUsersDto> searchUsersDto = new ArrayList<SearchUsersDto>();

        for(User user: users) {
            searchUsersDto.add(SearchUsersDto.of(user));
        }

        return searchUsersDto;
    }

    public List<PostDto> searchPost(String query, Long cursorId) {
        query = "%" + query + "%";
        List<Post> posts = new ArrayList<>();

        if(cursorId == -1) {
            posts = postRepository.findPostsByContentLike(query);
        }
        else {
            posts = postRepository.findPostsByContentLikeCursor(query, cursorId);
        }

        List<PostDto> searchPostDto = new ArrayList<PostDto>();

        for(Post post: posts) {
            searchPostDto.add(PostDto.of(post, filePrefix));
        }

        return searchPostDto;
    }
}
