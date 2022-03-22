package ICTPrj.server.service;

import ICTPrj.server.domain.entity.File;
import ICTPrj.server.domain.entity.Post;
import ICTPrj.server.domain.entity.User;
import ICTPrj.server.domain.repository.*;
import ICTPrj.server.dto.*;
import ICTPrj.server.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final FileRepository fileRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;

    @Value("${cloud.aws.s3.fileprefix}")
    private String filePrefix;

    private String getUserEmail(String userToken) {
        String userToken_ = userToken.substring(7);
        String userEmail = tokenProvider.getUserEmailFromToken(userToken_);
        return userEmail;
    }

    private ArrayList<File> getFileList(PostPathDto postPathDto, Post post) {
        ArrayList<File> files = new ArrayList<File>();

        for(FilePathDto filePath:postPathDto.getFiles()) {
            File file = File.builder()
                    .url(filePath.getPath())
                    .post(post)
                    .build();
            files.add(file);

            fileRepository.save(file);
        }

        return files;
    }

    public Long writePost(String userToken, PostPathDto postPathDto) {
        // 유저가 {회원 or 비회원}?
        String userEmail = getUserEmail(userToken);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized"));

        // post 미리 선언
        Post post = Post.builder()
                .user(user)
                .content(postPathDto.getContent())
                .build();

        postRepository.save(post);

        // files 가 이미지 이름으로 들어온다.
        // 변환 없이 이름 그대로 박기
        ArrayList<File> files = getFileList(postPathDto, post);

        post.setFiles(files);

        return postRepository.save(post).getId();
    }

    public Long modifyPost(String userToken, Long postId, PostPathDto postPathDto) {
        // 유저가 {회원 or 비회원}?
        String userEmail = getUserEmail(userToken);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized"));

        Post post = postRepository.findById(postId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 게시글 입니다."));

        if(!post.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized");
        }

        // 기존의 파일 삭제
        fileRepository.deleteAll(post.getFiles());


        ArrayList<File> files = getFileList(postPathDto, post);

        post.setContent(postPathDto.getContent());
        post.setFiles(files);

        return postRepository.save(post).getId();
    }

    public void deletePost(String userToken, Long postId) {
        String userEmail = getUserEmail(userToken);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 게시글 입니다."));

        if(!post.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unauthorized");
        }

        // 기존의 파일 삭제
        fileRepository.deleteAll(post.getFiles());
        likeRepository.deleteAll(post.getLikes());
        commentRepository.deleteAll(post.getComments());

        postRepository.delete(post);
    }

    public PostDto readPost(Long postId){
        Post post = postRepository.findById(postId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 게시글 입니다."));
        return PostDto.of(post, filePrefix);
    }

    public PostListDto getPostList(Long userId, Long cursor, Integer flag){
        List<Post> postList;
        if(flag == 1){
            if (userId == -1) {
                if (cursor == -1) {
                    postList = postRepository.findPosts();
                } else {
                    postList = postRepository.findPostsByCursor(cursor);
                }
            } else {
                if (cursor == -1) {
                    postList = postRepository.findPostsByFollowing(userId);
                } else {
                    postList = postRepository.findPostsByFollowingAndCursor(userId, cursor);
                }
            }
        }else{
            if(cursor == -1){
                postList = postRepository.findPostsById(userId);
            }else{
                postList = postRepository.findPostsByCursorAndId(userId, cursor);
            }
        }

        List<PostDto> posts = new ArrayList<>();
        for(Post post : postList){
            PostDto pt = PostDto.of(post, filePrefix);
            posts.add(pt);
        }

        return PostListDto.builder()
                .posts(posts)
                .build();
    }
}



