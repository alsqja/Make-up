package ICTPrj.server.domain.entity;


import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "User_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "Post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "Comment_id")
    private Comment comment;
}
