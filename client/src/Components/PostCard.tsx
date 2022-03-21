import { useState } from "react";
import styled from "styled-components";
import { IPost } from "../Dummys/dummy";
import {
  FaChevronRight,
  FaChevronLeft,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PostCardContainer = styled.div`
  font-family: "SUIT-Light";
  grid-column: 4 / span 9;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* min-height: 400px; */
  margin-top: 20px;
  border: 0.3px solid #c4c4c4;
  /* cursor: pointer; */
  @media only screen and (max-width: 768px) {
    grid-column: 4 / span 9;
  }
  @media only screen and (max-width: 501px) {
    grid-column: span 6;
  }
`;

const UserInfo = styled.div`
  display: flex;
  margin: 15px;
  width: 100%;
  font-family: "SUIT-Light";
  .photo {
    width: 35px;
    height: 35px;
    margin-right: 25px;
    margin-left: 25px;
    border-radius: 50%;
  }
  .name {
    font-weight: bolder;
    text-align: center;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .delete_button {
    width: 20px;
    height: 20px;
    margin-top: 10px;
    margin-left: 750px;
    cursor: pointer;
  }
`;
const Text = styled.div`
  width: 100%;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  padding: 20px 0;
  .text {
    background-color: #fff;
    margin: 0 30px;
  }
`;
const LikeComment = styled.div`
  margin-top: 15px;
  /* margin-left: 30px; */
  width: 100%;
  .like_button {
    margin-left: 30px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .comment_button {
    margin-left: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
const CommentBox = styled.div`
  width: 100%;
  margin: 15px;
  > div {
    margin-left: 30px;
  }
  .comments_info {
    display: flex;
    margin: 10px 30px;
    align-items: center;
  }
  .username {
    font-weight: bolder;
    margin-right: 15px;
    display: flex;
    align-items: center;
  }
  .comments_button {
    font-size: smaller;
    cursor: pointer;
    margin-left: 30px;
  }
  .photo {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 100px;
  }
`;

interface IImgProps {
  src: string;
}

const StyledFile = styled.div<IImgProps>`
  width: 100%;
  height: 500px;
  background-color: #f3f3f3;
  border-top: 0.3px solid #c4c4c4;
  background-image: url(${(props) => `'${props.src}'`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
`;

const FileButtonBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .left_btn {
    filter: drop-shadow(1px 2px 5px #00000090);
    font-size: 50px;
    color: #fff;
    margin-left: 20px;
    opacity: 0;
    cursor: pointer;
    /* @media only screen and (max-width: 501px) {
      opacity: 0.5;
    } */
  }
  > .right_btn {
    filter: drop-shadow(1px 2px 5px #000000b5);
    font-size: 50px;
    color: #fff;
    opacity: 0;
    margin-right: 20px;
    cursor: pointer;
    /* @media only screen and (max-width: 501px) {
      opacity: 0.5;
    } */
  }
  &:hover {
    > .left_btn {
      opacity: 0.5;
    }
    > .right_btn {
      opacity: 0.5;
    }
  }
`;

interface IProps {
  post: IPost;
}

export const PostCard = ({ post }: IProps) => {
  const [filePage, setFilePage] = useState(0);
  const navigate = useNavigate();

  const OpenPostHandler = (id: number) => {
    navigate(`/post/${id}`);
  };

  return (
    <PostCardContainer>
      <UserInfo
        onClick={() => {
          navigate(`/mypage/${post.user.id}`);
        }}
      >
        <img className="photo" src={post.user.profile} alt="" />
        <div className="name">{post.user.nickname}</div>
      </UserInfo>
      <StyledFile
        src={post.files[filePage]}
        onClick={() => {
          OpenPostHandler(post.id);
        }}
      >
        <FileButtonBox>
          <FaChevronLeft
            className="left_btn"
            onClick={(e) => {
              e.stopPropagation();
              if (!post.files[filePage - 1]) {
                return;
              }
              setFilePage(filePage - 1);
            }}
            style={filePage === 0 ? { opacity: "0" } : {}}
          />
          <FaChevronRight
            className="right_btn"
            onClick={(e) => {
              e.stopPropagation();
              if (!post.files[filePage + 1]) {
                return;
              }
              setFilePage(filePage + 1);
            }}
            style={filePage === post.files.length - 1 ? { opacity: "0" } : {}}
          />
        </FileButtonBox>
      </StyledFile>
      <Text>
        <div className="text">{post.content}</div>
      </Text>
      <LikeComment>
        {post.likes.filter((like) => like.userId === 0).length === 0 ? (
          <FaRegHeart className="like_button" />
        ) : (
          <FaHeart className="like_button" style={{ color: "red" }} />
        )}
      </LikeComment>
      <CommentBox>
        <div className="likes_num">{post.likes.length} 명이 좋아합니다.</div>
        <div className="comments_info">
          {post.comments.length === 0 ? (
            ""
          ) : (
            <img className="photo" src={post.comments[0].user.profile} alt="" />
          )}
          <div className="username">
            {post.comments.length === 0 ? null : post.comments[0].user.nickname}
          </div>
          <div className="text">
            {post.comments.length === 0 ? null : post.comments[0].content}
          </div>
        </div>
        <span
          className="comments_button"
          onClick={() => {
            OpenPostHandler(post.id);
          }}
        >
          {post.comments.length > 1
            ? `댓글 ${post.comments.length} 개 모두보기`
            : ""}
        </span>
      </CommentBox>
    </PostCardContainer>
  );
};
