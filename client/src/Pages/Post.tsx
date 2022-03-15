import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SideBar } from "../Components/SideBar";
import { IPost, dummyPosts } from "../Dummys/dummy";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";

const PostOuter = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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
`

const PostContainer = styled.div`
  grid-column: 4 / span 9;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* min-height: 400px; */
  margin-top: 20px;
  border: 1px solid black;
  margin-bottom: 20px;

  /* cursor: pointer; */

  @media only screen and (max-width: 500px) {
    grid-column: span 6;
  }
`

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
    border: 2px solid red;
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
`

const Text = styled.div`
  width: 100%;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  padding: 20px 0;
  .text {
    background-color: #fff;
    margin: 0 30px;
  }
`

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
`

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
    border: 2px solid red;
  }
`

interface IImgProps {
  src: string;
}

const StyledFile = styled.div<IImgProps>`
  width: 100%;
  height: 500px;
  background-color: black;
  background-image: url(${(props) => `'${props.src}'`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border: 1px solid black;
  display: flex;
  align-items: center;
`

const FileButtonBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .left_btn {
    font-size: 50px;
    color: #FFF;
    margin-left: 20px;
    opacity: 0;
    cursor: pointer;
  }
  > .right_btn {
    font-size: 50px;
    color: #FFF;
    opacity: 0;
    margin-right: 20px;
    cursor: pointer;
  }
  &:hover {
    > .left_btn {
      opacity: 0.5;
    }
    > .right_btn {
      opacity: 0.5;
    }
  }
`

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

const CommentInput = styled.textarea`
  resize: none;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  flex: 1;
`

const CommentBtn = styled.div`
  color: blue;
  cursor: pointer;
  margin-right: 30px;
  height: 30px;
  width: 50px;
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Post = () => {
  const location = useLocation().pathname.split('/')[2]
  const id = +location

  const [post, setPost] = useState<IPost>()
  const [filePage, setFilePage] = useState(0)

  useEffect(() => {
    setPost(dummyPosts.filter((post) => post.id === id)[0])
  }, [id])

  if (!post) {
    return <PostOuter>없음</PostOuter>
  }

  return (
    <PostOuter>
      <Container>
        <SideBar/>
        <PostContainer>
          <UserInfo onClick={(e) => {
            e.stopPropagation();
          }}>
            <img className='photo' src={post.user.profile} alt='' />
            <div className='name'>{post.user.nickname}</div>
            {/* <FontAwesomeIcon onClick={() => {
              deleteContents(content.id)
            }} className='delete_button' icon={faTrashAlt} style={content.username === '김민범' ? '' : {display:'none'}}/> */}
          </UserInfo>
          <StyledFile src={post.files[filePage]}>
            <FileButtonBox>
              <FaChevronLeft className="left_btn" onClick={(e) => {
                e.stopPropagation()
                if (!post.files[filePage - 1]) {
                  return ;
                }
                setFilePage(filePage - 1)
              }} style={
                filePage === 0 ? {opacity: '0'} : {}
              }/>
              <FaChevronRight className="right_btn"  onClick={(e) => {
                e.stopPropagation()
                if (!post.files[filePage + 1]) {
                  return ;
                }
                setFilePage(filePage + 1)
              }} style={
                filePage === post.files.length - 1 ? {opacity: '0'} : {}
              }/>
            </FileButtonBox>
          </StyledFile>
          <Text>
            <div className='text'>{post.content}</div>
          </Text>
          <LikeComment>
            {post.likes.filter((like) => like.userId === 0).length === 0 ? <FaRegHeart className="like_button"/> : <FaHeart className="like_button" style={{color: 'red'}}/>}
            
          </LikeComment>
          <CommentBox>
            <div className='likes_num'>{post.likes.length} 명이 좋아합니다.</div>
            {post.comments.map((comment) => {
              return(
                <div className='comments_info' key={comment.id}>
                  <img className="photo" src={comment.user.profile} alt=''/>
                  <div className='username'>{comment.user.nickname}</div>
                  <div className='text'>{comment.content}</div>
                </div>
              )
            })}
            <InputBox>
              <CommentInput placeholder="댓글 달기..."/>
              <CommentBtn>게시</CommentBtn>
            </InputBox>
          </CommentBox>
        </PostContainer>
      </Container>
    </PostOuter>
  )
}