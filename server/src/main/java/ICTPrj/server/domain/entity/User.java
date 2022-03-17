package ICTPrj.server.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nickname;

    @Column
    private String password;

    @Column
    private String email;

    @Column
    private String profile;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    List<Post> posts = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    List<Comment> comments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    List<Likes> likes = new ArrayList<>();
}




