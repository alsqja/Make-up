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
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @ManyToOne
    @JoinColumn(name = "User_id")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    List<File> files = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    List<Comment> comments = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "post")
    List<Likes> likes = new ArrayList<>();
}
