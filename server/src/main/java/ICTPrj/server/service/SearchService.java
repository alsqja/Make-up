package ICTPrj.server.service;

import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.UserRepository;
import ICTPrj.server.dto.SearchUsersDto;
import ICTPrj.server.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SearchService {
    private final UserRepository userRepository;

    public List<SearchUsersDto> searchUser(String query) {
        query = "%" + query + "%";
        List<User> users = userRepository.findUsersByNicknameLike(query);
        List<SearchUsersDto> searchUsersDto = new ArrayList<SearchUsersDto>();

        for(User user: users) {
            searchUsersDto.add(SearchUsersDto.of(user));
        }

        return searchUsersDto;
    }
}
