import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dummyUser } from "../Dummys/dummy";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { followerModal, followModal } from "../store/store";
import { FollowModal } from "./FollowModal";
import { FollowerModal } from "./FollowerModal";

const Container = styled.div`
  transition-duration: 0.3s;
  font-family: "SUIT-Light";
  position: fixed;
  top: 100px;
  width: 200px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  @media only screen and (max-width: 1200px) {
    margin-left: 10px;
    width: 180px;
  }
  @media only screen and (max-width: 768px) {
    grid-column: span 1;
    width: 150px;
  }

  @media only screen and (max-width: 500px) {
    position: fixed;
    top: 100px;
    left: 20px;
    margin: 0;
    width: 200px;
    display: none;
  }
`;

const Menu = styled.div`
  /* transition-duration: 0.3s; */
  width: auto;
  text-align: center;
  margin: 10px;
  font-size: large;
  cursor: pointer;
  :hover {
    color: var(--main-color);
    font-family: "SUIT-SemiBold";
  }
`;

const UserInfo = styled.div`
  display: flex;
  padding: 10px 0;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  justify-content: center;
  :hover {
    border-bottom: 2px solid var(--main-color);
  }
  .photo {
    width: 40px;
    height: 40px;
    margin-right: 10%;
    border-radius: 50%;
  }
  .name {
    font-weight: bolder;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333;
  }
`;

export const SideBar = () => {
  const [follower, setFollower] = useState(0);
  const [follow, setFollow] = useState(0);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();
  const [isFollowModalOn, setIsFollowModalOn] = useRecoilState(followModal);
  const [isFollowerModalOn, setIsFollowerModalOn] =
    useRecoilState(followerModal);

  useEffect(() => {
    setFollower(dummyUser[0].follower);
    setFollow(dummyUser[0].following);
    setUsername(dummyUser[0].nickname);
    setProfile(dummyUser[0].profile);
  }, []);

  const handlePost = () => {
    navigate("/createpost");
  };

  return (
    <Container>
      {isFollowModalOn ? <FollowModal /> : ""}
      {isFollowerModalOn ? <FollowerModal /> : ""}
      <Link to={`/mypage/${dummyUser[0].id}`}>
        <UserInfo>
          <img className="photo" src={profile} alt="" />
          <div className="name">{username}</div>
        </UserInfo>
      </Link>

      <Menu onClick={() => {
        setIsFollowerModalOn(true)
      }}>{`팔로워 ${follower}`}</Menu>
      <Menu onClick={() => {
        setIsFollowModalOn(true)
      }}>{`팔로우 ${follow}`}</Menu>
      <Link to={'/makeup'}>
        <Menu>화장하러 가기</Menu>
      </Link>
      <Menu onClick={handlePost}>게시글 작성</Menu>
    </Container>
  );
};
