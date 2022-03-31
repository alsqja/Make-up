import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { IPostUser } from "../Dummys/dummy";
import { SideBar } from "../Components/SideBar";
import FloatBtn from "../Components/FloatBtn";
import axios from "axios";
import Loading from "../Components/Loading";
import { isLogin, notify } from "../store/store";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { v4 } from "uuid";

const MainOuter = styled.div`
  padding-top: 48px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;
  margin-bottom: auto;
  /* transition: all 0.5s; */
  @media only screen and (max-width: 1200px) {
    transition-duration: 0.3s;
    width: 768px;
    column-gap: 16px;
    grid-template-columns: repeat(10, 1fr);
  }
  @media only screen and (max-width: 768px) {
    width: 500px;
    column-gap: 16px;
    grid-template-columns: repeat(6, 1fr);
  }
  @media only screen and (max-width: 500px) {
    width: 360px;
    column-gap: 16px;
    grid-template-columns: repeat(6, 1fr);
  }
  padding-bottom: 20px;
`;

const PostCardContainer = styled.div`
  font-family: "SUIT-Light";
  grid-column: 4 / span 9;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 0.3px solid #c4c4c4;
  padding: 10px;
  padding-bottom: 15px;
  @media only screen and (max-width: 768px) {
    grid-column: 4 / span 9;
  }
  @media only screen and (max-width: 501px) {
    grid-column: span 6;
  }
  .photo {
    margin-left: 20px;
    width: 40px;
    cursor: pointer;
    height: 40px;
    margin-right: 15px;
    border-radius: 100px;
  }
  > div {
    margin-left: 20px;
    margin-right: auto;
  }
`;

function User() {
  const location = useLocation().state as string;
  const query = location;
  const [userList, setUserList] = useState<IPostUser[]>([]);
  const [scrollTopBtnIsVisible, setScrollTopBtnIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState(-1)
  const [isEnd, setIsEnd] = useState(false);
  // const isFollowing = useRecoilValue(following);
  const login = useRecoilValue(isLogin);
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
    setCursor(-1)
    setIsEnd(false)
    setUserList([])
    setIsLoading(true);
    axios
      .get(`https://www.bbo-sharp.com/api/user/search?query=${query}&cursor=-1`)
      .then((res) => {
        console.log(res.data)
        if (res.data.length === 0) {
          setIsLoading(false);
          setIsEnd(true);
          return;
        }
        setUserList(res.data);
        setIsLoading(false);
        setCursor(res.data[res.data.length - 1].id)
      })
      .catch((err) => console.log("err:", err));
  }, [query]);

  const handleScroll = useCallback((): void => {

    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    if (
      scrollTop !== undefined &&
      innerHeight !== undefined &&
      scrollHeight !== undefined
    ) {
      if (Math.round(scrollTop + innerHeight) >= scrollHeight && !isEnd) {
        setIsLoading(true);
        axios
          .get(
            `https://www.bbo-sharp.com/api/user/search?query=${query}&cursor=${cursor}`
          )
          .then((res) => {
            if (res.data.length === 0) {
              setIsLoading(false);
              setIsEnd(true);
              return;
            }
            setUserList([...userList, ...res.data]);
            setIsLoading(false);
            setCursor(res.data[res.data.length - 1].id)
          })
          .catch((err) => console.log("err::", err));
      }
    }
  }, [cursor, isEnd, query, userList]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  useEffect(() => {
    const showTopBtnOnBottom = () => {
      if (window.pageYOffset > 500) {
        setScrollTopBtnIsVisible(true);
      } else {
        setScrollTopBtnIsVisible(false);
      }
    };
    window.addEventListener("scroll", showTopBtnOnBottom);
    return () => {
      window.removeEventListener("scroll", showTopBtnOnBottom);
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const Users = ({ nickname, profile, id }: IPostUser) => {
    const navigate = useNavigate()
    return (
      <PostCardContainer>
        <img className="photo" src={profile} alt="profile" onClick={() => {
        if (!login) {
          notifyHandler('로그인 후 이용가능합니다.')
          return;
        }
        navigate(`/mypage/${id}`)
      }}/>
        <div onClick={() => {
        if (!login) {
          notifyHandler('로그인 후 이용가능합니다.')
          return;
        }
        navigate(`/mypage/${id}`)
      }}>{nickname}</div>
      </PostCardContainer>
    );
  };

  return (
    <MainOuter>
      <MainContainer>
        <SideBar />
        {userList.map((user) => {
          return (
            <Users
              key={user.id}
              nickname={user.nickname}
              profile={user.profile}
              id={user.id}
            />
          );
        })}
        {isLoading && <Loading />}
      </MainContainer>
      {scrollTopBtnIsVisible && (
        <div onClick={scrollToTop}>
          <FloatBtn />
        </div>
      )}
    </MainOuter>
  );
}

export default User;
