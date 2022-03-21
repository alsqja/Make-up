package ICTPrj.server.controller;

import ICTPrj.server.domain.entity.User;
import ICTPrj.server.dto.SearchUsersDto;
import ICTPrj.server.dto.UserDto;
import ICTPrj.server.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    @GetMapping("/user/search")
    public List<SearchUsersDto> searchUser(@RequestParam(value = "query") String query) {
        System.out.println("query = " + query);
        return searchService.searchUser(query);

    }
}
