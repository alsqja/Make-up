import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCog } from "react-icons/fa";
import { IUserInfo, IPost, defaultProfile } from "../Dummys/dummy";
import { PostCard } from "../Components/PostCard";
import SettingModal from "../Components/SettingModal";
import {
  userSettingModal,
  followerModal,
  followModal,
  isLogin,
} from "../store/store";
import { FollowModal } from "../Components/FollowModal";
import { FollowerModal } from "../Components/FollowerModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";

const Outer = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "S-CoreDream-3Light";
`;

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
    width: 501px;
  }

  @media only screen and (max-width: 501px) {
    width: 360px;
    column-gap: 16px;
    grid-template-columns: repeat(6, 1fr);
  }
`;

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
  @media only screen and (max-width: 768px) {
    .profile {
      width: 150px;
      height: 150px;
      margin: 0 20px 0;
    }
    grid-column: 1 / span 12;
    padding: 50px 0;
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
`;

const UserInfoBox = styled.div`
  flex: 1;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .noshow {
    display: none;
  }
`;

const NameBtnBox = styled.div`
  display: flex;
  align-items: center;
  /* height: 30px; */
`;

const Name = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 20px;
  font-weight: bold;
`;

const FollowBtn = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 20px;
  font-size: 12px;
  border: 1px solid #fff;
  &:hover {
    border: 1px solid var(--main-color);
  }
`;

const FollowInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const FollowInfo = styled.div`
  height: 30px;
  /* padding: 30px 15px; */
  text-align: center;
  /* @media only screen and (max-width: 501px) {
    padding: 30px 5px;
  } */
  > div {
    margin: 10px;
    font-size: 14px;
    font-weight: bold;
  }
`;

const PostCardBox = styled.div`
  grid-column: 3 / span 8;
  @media only screen and (max-width: 501px) {
    grid-column: span 6;
  }
`;

export const Mypage = () => {
  const location = useLocation().pathname.split("/")[2];
  const id = +location;
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isFollowed, setIsFollowed] = useState(false);
  const [postList, setPostList] = useState<IPost[]>();
  const [count, setCount] = useState(-1)
  const [isFollowModalOn, setIsFollowModalOn] = useRecoilState(followModal);
  const [isFollowerModalOn, setIsFollowerModalOn] =
    useRecoilState(followerModal);
  const [isUserSettingModalOn, setIsUserSettingModalOn] =
    useRecoilState(userSettingModal);
  const setLogin = useSetRecoilState(isLogin);
  const navigate = useNavigate();
  const myId = window.localStorage.getItem('userId')

  const cursor = useRef(-1)

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    axios
      .get(`http://52.79.250.177:8080/user?id=${id}&cursor=${cursor.current}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data.user)
        setPostList(res.data.posts)
        setCount(res.data.count)
        cursor.current = res.data.posts[res.data.posts.length - 1].id
      });
  }, [id]);

  if (!myId) {
    return <></>
  }

  const followHandler = () => {
    setIsFollowed(!isFollowed);
  };

  // const settingClick = () => {
  //   setSettingModal(true);
  // };

  const logoutHandler = () => {
    window.localStorage.setItem("isLogin", "false");
    window.localStorage.setItem("accessToken", "");
    window.localStorage.setItem("userId", '-1')
    setLogin(false);
    navigate("/");
  };

  return (
    <Outer>
      {isUserSettingModalOn ? <SettingModal userInfo={userInfo}/> : ""}
      {isFollowModalOn ? <FollowModal /> : ""}
      {isFollowerModalOn ? <FollowerModal /> : ""}
      <MyContainer>
        <UserBox>
          <img className="profile" src={userInfo?.profile} alt='' />
          <UserInfoBox>
            <NameBtnBox>
              <Name>{userInfo?.nickname}</Name>
              <FaCog
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                className={userInfo?.id !== +myId ? "noshow" : "" /*TODO: userID*/}
                onClick={() => setIsUserSettingModalOn(true)}
              />
              <FollowBtn
                className={userInfo?.id === +myId ? "noshow" : ""}
                onClick={followHandler}
              >
                {isFollowed ? "팔로우 취소" : "팔로우"}
              </FollowBtn>
              <FollowBtn
                className={userInfo?.id !== +myId ? "noshow" : "" /*TODO: userID*/}
                onClick={logoutHandler}
              >
                로그아웃
              </FollowBtn>
            </NameBtnBox>
            <FollowInfoBox>
              <FollowInfo>
                <div>게시글</div>
                {count}
              </FollowInfo>
              <FollowInfo onClick={() => setIsFollowerModalOn(true)}>
                <div>팔로워</div>
                {` ${userInfo?.follower}`}
              </FollowInfo>
              <FollowInfo onClick={() => setIsFollowModalOn(true)}>
                <div>팔로우</div>
                {` ${userInfo?.following}`}
              </FollowInfo>
            </FollowInfoBox>
          </UserInfoBox>
        </UserBox>
        <PostCardBox>
          {postList?.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
        </PostCardBox>
      </MyContainer>
    </Outer>
  );
};
