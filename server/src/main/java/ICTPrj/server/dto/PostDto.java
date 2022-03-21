package ICTPrj.server.dto;

import ICTPrj.server.domain.entity.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;
    private String content;
    private DefaultUserDto user;
    private List<String> files;
    private List<CommentDto> comments;
    private List<LikeDto> likes;

    public static PostDto of(Post post, String filePrefix){
        List<String> fileList = new ArrayList<>();
        for(File file : post.getFiles()){
            String fileUrl = file.getUrl();
            fileList.add(filePrefix + fileUrl);
        }

        List<CommentDto> commentList = new ArrayList<>();
        for(Comment comment : post.getComments()){
            commentList.add(CommentDto.of(comment, filePrefix));
        }

        List<LikeDto> likeList = new ArrayList<>();
        for(Likes like : post.getLikes()){
            likeList.add(LikeDto.of(like));
        }

        return PostDto.builder()
                .id(post.getId())
                .content(post.getContent())
                .user(DefaultUserDto.of(post.getUser(), filePrefix))
                .files(fileList)
                .comments(commentList)
                .likes(likeList)
                .build();
    }
}
