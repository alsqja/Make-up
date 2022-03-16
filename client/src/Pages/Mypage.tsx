import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaCog } from "react-icons/fa"
import { dummyUser, IUserInfo, dummyPosts, IPost } from "../Dummys/dummy";
import { PostCard } from "../Components/PostCard";

const Outer = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
`

const MyContainer = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;
  /* transition: all 0.5s; */
  @media only screen and (max-width: 1200px) {
    width: 768px;
  }

  @media only screen and (max-width: 768px) {
    width: 500px;
  }

  @media only screen and (max-width: 501px) {
    width: 360px;
    column-gap: 16px;
    grid-template-columns: repeat(6, 1fr);
  }
`

const UserBox = styled.div`
  grid-column: 2 / span 10;
  display: flex;
  /* margin-top: 50px; */
  border-bottom: 1px solid #dbdbdb;
  padding: 50px 0;
  .profile {
    border-radius: 100px;
    width: 150px;
    height: 150px;
    margin: 0 100px 0 70px;
  }
  @media only screen and (max-width: 501px) {
    .profile {
      width: 100px;
      height: 100px;
      margin: 0 20px 0;
    }
    grid-column: span 6;
    padding: 20px 0 0 0;
  }
`

const UserInfoBox = styled.div`
  flex: 1;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .noshow {
    display: none;
  }
`

const NameBtnBox = styled.div`
  display: flex;
  align-items: center;
  /* height: 30px; */
`

const Name = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 20px;
  font-weight: bold;
`

const FollowBtn = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
  background-color: pink;
  &:hover {
    background-color: #dbdbdb;
  }
`

const FollowInfoBox = styled.div`
  display: flex;
  align-items: center;
`

const FollowInfo = styled.div`
  height: 30px;
  padding: 30px 15px;
  @media only screen and (max-width: 501px) {
    padding: 30px 5px;
  }
`

const PostCardBox = styled.div`
  grid-column: 3 / span 8;
  @media only screen and (max-width: 501px) {
    grid-column: span 6;
  }
`

export const Mypage = () => {

  const location = useLocation().pathname.split('/')[2]
  const id = +location
  const [userInfo, setUserInfo] = useState<IUserInfo>()
  const [isFollowed, setIsFollowed] = useState(false)
  const [postList, setPostList] = useState<IPost[]>()

  useEffect(() => {
    setUserInfo(dummyUser.filter((user) => user.id === id)[0])
    setPostList(dummyPosts.filter((post) => post.user.id === id))
  }, [id])

  const followHandler = () => {
    setIsFollowed(!isFollowed)
  }

  return (
    <Outer>
      <MyContainer>
        <UserBox>
          <img className="profile" src={userInfo?.profile} alt=''/>
          <UserInfoBox>
            <NameBtnBox>
              <Name>{userInfo?.nickname}</Name>
              <FaCog style={{fontSize:'20px', cursor:'pointer'}} className={userInfo?.id !== 0 ? 'noshow' : '' /*TODO: userID*/} />
              <FollowBtn className={userInfo?.id === 0 ? 'noshow' : ''} onClick={followHandler}>{
                isFollowed ? '팔로우 취소' : '팔로우'
              }</FollowBtn>
            </NameBtnBox>
            <FollowInfoBox>
              <FollowInfo>{`게시글 TODO`}</FollowInfo>
              <FollowInfo>{`팔로워 ${userInfo?.follower}`}</FollowInfo>
              <FollowInfo>{`팔로우 ${userInfo?.following}`}</FollowInfo>
            </FollowInfoBox>
          </UserInfoBox>
        </UserBox>
        <PostCardBox>
          {postList?.map((post) => {
            return (
              <PostCard key={post.id} post={post}/>
            )
          })}
        </PostCardBox>
      </MyContainer>
    </Outer>
  )
}