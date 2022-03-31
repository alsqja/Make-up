import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SideBar } from "../Components/SideBar";
import { IPostUser, IPostLike, IComment, serverUrl } from "../Dummys/dummy";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { AiOutlineDelete } from 'react-icons/ai';
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLogin, notify } from "../store/store";
import { v4 } from "uuid";

const PostOuter = styled.div`
  font-family: "SUIT-Light";
  padding-top: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;
  @media only screen and (max-width: 1200px) {
    width: 768px;
  }

  @media only screen and (max-width: 768px) {
    width: 500px;
  }

  @media only screen and (max-width: 500px) {
    width: 360px;
    column-gap: 16px;
    grid-template-columns: repeat(6, 1fr);
  }
`;

const PostContainer = styled.div`
  grid-column: 4 / span 9;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* min-height: 400px; */
  margin-top: 20px;
  border: 0.3px solid #c4c4c4;
  margin-bottom: 20px;

  /* cursor: pointer; */
  @media only screen and (max-width: 768px) {
    margin-left: 40px;
  }

  @media only screen and (max-width: 500px) {
    margin-left: 0;
    grid-column: span 6;
  }
`;

const UserInfo = styled.div`
  display: flex;
  margin: 15px;
  width: 100%;
  .photo {
    width: 40px;
    height: 40px;
    margin-right: 30px;
    margin-left: 30px;
    border-radius: 100px;
    /* border: 2px solid red; */
  }
  .name {
    font-weight: bolder;
    text-align: center;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .btnbox {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: right;
  }
  .btn {
    font-size: 20px;
    margin: 10px;
    cursor: pointer;
    &:hover {
      color: #dbdbdb;
    }
  }
`;

const Text = styled.div`
  width: 100%;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  padding: 20px 0;
  .text {
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
    min-width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 100px;
    /* border: 2px solid red; */
  }
  .box {
    margin-left: 0;
  }
  .btn_box {
    display: flex;
    justify-content: left;
    margin-left: 30px;
  }
  .btn {
    font-size: 15px;
    margin: 0 5px;
    cursor: pointer;
    &:hover {
      color: #dbdbdb;
    }
  }
  .like_button {
    cursor: pointer;
    margin-right: 5px;
    &:hover {
      color: #dbdbdb;
    }
  }
  .like_count {
    position: relative;
    top: -2px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    z-index: -1;
  }
`;

const CommentContent = styled.div`
  width: 80%;
  white-space: pre-wrap;
`

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

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const CommentInput = styled.textarea`
  &:focus {
    outline: none;
    border-bottom: 2px solid var(--main-color);
  }
  font-family: "SUIT-Light";
  resize: none;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  flex: 1;
  height: 30px;
  line-height: 30px;
`;

const CommentBtn = styled.div`
  color: #00417e;
  cursor: pointer;
  margin-right: 30px;
  height: 30px;
  width: 50px;
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    font-weight: bold;
  }
`;

export const Post = () => {
  const location = useLocation().pathname.split("/")[2];
  const id = +location;
  const myid = window.localStorage.getItem('userId')
  const [filePage, setFilePage] = useState(0);
  const [user, setUser] = useState<IPostUser>()
  const [files, setFiles] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [likes, setLikes] = useState<IPostLike[]>([])
  const [comments, setComments] = useState<IComment[]>([])
  const [isMine, setIsMine] = useState(false)
  const [commentValue, setCommentValue] = useState('')
  const login = useRecoilValue(isLogin)
  const [notification, setNotification] = useRecoilState(notify)

  const notifyHandler = (message: string) => {
    const uuid = v4()
    setTimeout(() => {
      setNotification([...notification, {uuid, message, dismissTime: 2000}])
    }, 0)
    setTimeout(() => {
      setNotification([])
    }, 2000)
  }

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken')
    axios
      .get(
        `https://www.bbo-sharp.com/api/post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then((res) => {
        if (myid === String(res.data.user.id)) {
          setIsMine(true)
        }
        setUser(res.data.user)
        setFiles(res.data.files)
        setContent(res.data.content)
        setLikes(res.data.likes)
        setComments(res.data.comments)
      })
  }, [id, myid]);

  const deletePostHandler = () => {
    const myid = window.localStorage.getItem('userId')
    const accessToken = window.localStorage.getItem('accessToken')
    axios
      .delete(
        `https://www.bbo-sharp.com/api/post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(() => {
        window.location.href = `/mypage/${myid}`
      })
  }

  const commentHandler = () => {
    if (!login) {
      notifyHandler('로그인 후 이용가능합니다.')
      return;
    }
    if (commentValue.length === 0) {
      notifyHandler('댓글을 입력해주세요')
      return;
    }
    const accessToken = window.localStorage.getItem('accessToken')
    axios
      .post(
        `${serverUrl}post/${id}/comment`,
        {
          content: commentValue
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then((data) => {
        axios
          .get(
            `${serverUrl}user?id=${myid}&cursor=-1`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          )
          .then((res) => {
            setComments([{
              id: data.data, 
              content: commentValue,
              user: res.data.user,
              likes: []
            }, ...comments])
            setCommentValue('')
          })
      })
  }

  const postLikeHandler = (isPlus: boolean) => {
    const accessToken = window.localStorage.getItem('accessToken')
    axios
      .post(
        `${serverUrl}likes`,
        {
          postId: id,
          commentId: null,
          isPlus: isPlus
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(() => {
        if (!myid) return;
        if (isPlus) {
          setLikes([...likes, {id: -1, userId: +myid}])
        }
        else {
          setLikes(likes.filter((el) => el.userId !== +myid))
        }
      })
      .catch((err) => console.log(err))
  }

  const commentLikeHandler = (id: number, isPlus: boolean) => {
    const accessToken = window.localStorage.getItem('accessToken')
    axios
      .post(
        `${serverUrl}likes`,
        {
          postId: null,
          commentId: id,
          isPlus: isPlus
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(() => {
        if (isPlus) {
          const copy = comments.map((comment: IComment) => {
            if (!myid) {
              return comment
            }
            if (comment.id === id) {
              return {...comment, likes: [...comment.likes, {id: -1, userId: +myid}]}
            }
            return comment
          })
          setComments(copy)
        }
        else {
          const copy = comments.map((comment) => {
            if (!myid) {
              return comment
            }
            if (comment.id === id) {
              return {...comment, likes: comment.likes.filter((like) => String(like.userId) !== myid)}
            }
            return comment
          })
          setComments(copy)
        }
      })
  }

  const commentDeleteHandler = (commentId: number) => {
    const accessToken = window.localStorage.getItem('accessToken')
    axios
      .delete(
        `${serverUrl}post/${id}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(() => {
        setComments(comments.filter((comment) => comment.id !== commentId))
      })
  }

  return (
    <PostOuter>
      <Container>
        <SideBar />
        <PostContainer>
          <UserInfo>
            <img className="photo" src={user?.profile} alt="" />
            <div className="name">{user?.nickname}</div>
            {isMine ? 
            <div className="btnbox">
              <AiOutlineDelete className="btn" onClick={deletePostHandler}/>
            </div> : ''}
            
          </UserInfo>
          {files.length !== 0 && <StyledFile src={files[filePage]}>
            <FileButtonBox>
              <FaChevronLeft
                className="left_btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!files[filePage - 1]) {
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
                  if (!files[filePage + 1]) {
                    return;
                  }
                  setFilePage(filePage + 1);
                }}
                style={
                  filePage === files.length - 1 ? { opacity: "0" } : {}
                }
              />
            </FileButtonBox>
          </StyledFile>}
          <Text>
            <div className="text">{content}</div>
          </Text>
          <LikeComment>
            {likes.filter((like) => String(like.userId) === myid).length === 0 ? (
              <FaRegHeart className="like_button" onClick={() => {
                postLikeHandler(true)
              }}/>
            ) : (
              <FaHeart className="like_button" style={{ color: "red" }} onClick={() => {
                postLikeHandler(false)
              }}/>
            )}
          </LikeComment>
          <CommentBox>
            <div className="likes_num">
              {likes.length} 명이 좋아합니다.
            </div>
            {comments.map((comment) => {
              return (
                <div className="box" key={comment.id}>
                  <div className="comments_info">
                    <img className="photo" src={comment.user.profile} alt="" />
                    <div className="username">{comment.user.nickname}</div>
                    <CommentContent>{comment.content}</CommentContent>
                  </div>
                  {String(comment.user.id) === myid ? 
                    <div className="btn_box">
                      {comment.likes.filter((like) => String(like.userId) === myid).length === 0 ? (
                        <FaRegHeart className="like_button" onClick={() => {
                          commentLikeHandler(comment.id, true)
                        }}/>
                      ) : (
                        <FaHeart className="like_button" style={{color: 'red'}} onClick={() => {
                          commentLikeHandler(comment.id, false)
                        }}/>
                      )}
                      <div className="like_count">{comment.likes.length}</div>
                      <AiOutlineDelete className="btn" onClick={() => {
                        commentDeleteHandler(comment.id)
                      }}/>
                    </div> : 
                    <div className="btn_box">
                      {comment.likes.filter((like) => String(like.userId) === myid).length === 0 ? (
                        <FaRegHeart className="like_button" onClick={() => {
                          commentLikeHandler(comment.id, true)
                        }}/>
                      ) : (
                        <FaHeart className="like_button" style={{color: 'red'}} onClick={() => {
                          commentLikeHandler(comment.id, false)
                        }}/>
                      )}
                      <div className="like_count">{comment.likes.length}</div>
                    </div>
                  }
                  
                </div>
              );
            })}
            <InputBox>
              <CommentInput placeholder="댓글 달기..." value={commentValue} onChange={(e) => {
                setCommentValue(e.target.value)
              }}/>
              <CommentBtn onClick={commentHandler}>게시</CommentBtn>
            </InputBox>
          </CommentBox>
        </PostContainer>
      </Container>
    </PostOuter>
  );
};
