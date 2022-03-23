import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { followModal } from "../store/store";
import { IPostUser } from "../Dummys/dummy";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalBackdrop = styled.div`
  font-family: "SUIT-Light";
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  background-color: #fff;
  width: 500px;
  height: 600px;
  border-radius: 20px;
  /* > div.close_btn {
    background: red;
    cursor: pointer;
  }
  > div.desc {
    margin-top: 25px;
    color: var(--font-red);
    font-weight: bold;
    text-align: center;
  }
  > div.button {
    color: white;
    background: #b80000;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    width: 100px;
    height: 50px;
    margin-left: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  } */

  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  padding: 3px 0;
  border-bottom: 1px solid #dbdbdb;
  .name {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: middle;
    font-weight: bold;
    margin-left: -20px;
  }
`;

const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: 520px;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;

const ChildWrapper = styled.div`
  display: flex;
  padding: 5px 0;
  /* border-bottom: 1px solid #dbdbdb; */
  /* width: 80%; */
  .profile_box {
    display: flex;
    width: 75%;
  }
  .profile {
    margin: 0 8px;
    line-height: 36px;
    width: 35px;
    height: 35px;
    margin-right: 30px;
    cursor: pointer;
    margin-left: 30px;
    border-radius: 100px;
  }
  .username {
    /* margin-right: 8px; */
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
    a {
      color: var(--font);
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  }
  .cancel_btn {
    background-color: pink;
    cursor: pointer;
    width: 80px;
    height: 30px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    &:hover {
      background-color: #fcced6;
    }
  }
`;

export const FollowModal = () => {
  const setIsFollowModalOn = useSetRecoilState(followModal);
  const [userList, setUserList] = useState<IPostUser[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  const cursor = useRef(-1)
  const navigate = useNavigate()

  useEffect(() => {
    const id = window.localStorage.getItem('userId')
    const accessToken = window.localStorage.getItem('accessToken')
    axios
      .get(
        `http://52.79.250.177:8080/following?id=${id}&cursor=-1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then((res) => {
        setUserList(res.data.user)
        cursor.current = res.data.user[res.data.user.length - 1].id;
      })
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((): void => {
    const id = window.localStorage.getItem('userId')

    const innerHeight = scrollRef.current?.clientHeight; // 브라우저 창 내용 크기 (스크롤 포함 x)
    const scrollHeight = scrollRef.current?.scrollHeight; // 브라우저 총 내용 크기 (스크롤 포함)
    const scrollTop = scrollRef.current?.scrollTop; // 현 스크롤바 위치

    if (
      scrollTop !== undefined &&
      innerHeight !== undefined &&
      scrollHeight !== undefined
    ) {
      if (Math.round(scrollTop + innerHeight) >= scrollHeight && !isEnd) {
        const accessToken = localStorage.getItem('accessToken');
        axios
          .get(`http://52.79.250.177:8080/following?id=${id}&cursor=${cursor.current}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            if (res.data.user.length === 0) {
              setIsEnd(true);
              return;
            }
            setUserList([...userList, ...res.data.user])
            cursor.current = res.data.user[res.data.user.length - 1].id;
          });
      }
    }
  }, [isEnd, userList]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  const followCanceler = (id: number) => {
    const accessToken = window.localStorage.getItem('accessToken')
    axios
      .post(
        'http://52.79.250.177:8080/follow',
        {
          userId: id,
          isPlus: false
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(() => {
        setIsFollowModalOn(true)
        setUserList(userList.filter((el) => el.id !== id))
      })
  }

  return (
    <ModalBackdrop
      onClick={() => {
        setIsFollowModalOn(false);
      }}
    >
      <ModalView onClick={(e) => e.preventDefault()}>
        <TitleBox>
          <div
            className="close-btn"
            style={{
              marginLeft: "20px",
              marginTop: "10px",
              width: "20px",
              cursor: "pointer",
              fontSize: "15x",
            }}
            onClick={() => {
              setIsFollowModalOn(false);
            }}
          >
            <AiOutlineClose />
          </div>
          <div className="name"> 팔로잉 </div>
        </TitleBox>
        <ScrollWrapper ref={scrollRef}>
          {userList.map((user) => {
            return (
              <ChildWrapper key={user.id}>
                <div className="profile_box">
                  <img className="profile" src={user.profile} alt="" />
                  <div className="username" onClick={() => {
                    navigate(`/mypage/${user.id}`)
                  }}>
                    {user.nickname}
                  </div>
                </div>
                <div className="cancel_btn" onClick={() => {
                  followCanceler(user.id)
                }}>팔로우 취소</div>
              </ChildWrapper>
            );
          })}
        </ScrollWrapper>
      </ModalView>
    </ModalBackdrop>
  );
};
