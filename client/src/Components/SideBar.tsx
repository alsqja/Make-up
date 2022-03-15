import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dummyUser } from "../Dummys/dummy";

const Container = styled.div`
  grid-column: span 3;
  position: fixed;
  top: 100px;
  width: 200px;
  /* height: 30vh; */
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  max-width: 256px;
  border: 1px solid black;
  border-radius: 20px;

  @media only screen and (max-width: 768px) {
    grid-column: span 1;
    width: 50px;
  }

  @media only screen and (max-width: 500px) {
    position: fixed;
    /* width: 400px; */
    top: 100px;
    left: 20px;
    margin: 0;
    /* grid-column: span 6; */
    width: 200px;
    display: none;
    /* display: flex; */
    /* flex-direction: row; */
  }
`

const Menu = styled.div`
  width: calc(100%-10px);
  padding: 10px 0 10px 10px;
  font-size: large;
  cursor: pointer;
  border-bottom: 1px solid #dbdbdb;
  &:hover {
    background-color: #dbdbdb;
  }
`

const UserInfo = styled.div`
  display: flex;
  padding: 10px 0;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  &:hover {
    background-color: #dbdbdb;
  }
  border-radius: 20px 20px 0 0;
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
    color: black;
  }
  `

export const SideBar = () => {

  const [follower, setFollower] = useState(0)
  const [follow, setFollow] = useState(0)
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState('')

  useEffect(() => {
    setFollower(dummyUser[0].follower)
    setFollow(dummyUser[0].following)
    setUsername(dummyUser[0].nickname)
    setProfile(dummyUser[0].profile)
  }, [])

  return (
    <Container>
      <Link to={`/mypage/${dummyUser[0].id}`}>
        <UserInfo>
          <img className="photo" src={profile} alt=''/>
          <div className="name">{username}</div>
        </UserInfo>
      </Link>
      <Menu>{`팔로워 ${follower}`}</Menu>
      <Menu>{`팔로우 ${follow}`}</Menu>
      <Menu>화장하러 가기</Menu>
      <Menu>게시글 작성</Menu>
    </Container>
  )
}