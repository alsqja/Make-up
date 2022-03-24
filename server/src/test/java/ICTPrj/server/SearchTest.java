package ICTPrj.server;

import ICTPrj.server.dto.PostDto;
import ICTPrj.server.dto.SearchUsersDto;
import ICTPrj.server.service.SearchService;
import org.apache.el.parser.AstFalse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
public class SearchTest {
    @Autowired
    private SearchService searchService;

    @Test
    @DisplayName("유저 검색 테스트")
    public void searchUserTest() {
        // Given
        String query = "user";
        Long cursorId = -1L;

        // When
        List<SearchUsersDto> searchedUser = searchService.searchUser(query, cursorId);

        // Then
        boolean falg = false;
        for(SearchUsersDto usersDto : searchedUser) {
            if(!usersDto.getNickname().contains(query)) {
                falg = true;
            }
        }

        assertEquals(falg, false);
    }

    @Test
    @DisplayName("게시글 검색 테스트")
    public void searchPostTest() {
        // Given
        String query = "search";
        Long cursorId = 5L;
        // When
        List<PostDto> postDtos = searchService.searchPost(query, cursorId);


        // Then
        boolean flag = false;
        for(PostDto postDto: postDtos) {
            if(!postDto.getContent().contains(query)) {
                flag = true;
            }
        }

        assertEquals(flag, false);
    }
}
