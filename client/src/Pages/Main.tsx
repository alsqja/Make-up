import styled from "styled-components";
import { useEffect, useState, useCallback, useRef } from "react";
import { checkTime, IPost, serverUrl } from "../Dummys/dummy";
import { PostCard } from "../Components/PostCard";
import { SideBar } from "../Components/SideBar";
import FloatBtn from "../Components/FloatBtn";
import axios from "axios";
import Loading from "../Components/Loading";
import { isLogin } from "../store/store";
import { useRecoilValue } from "recoil";
import ServerError from "./ServerError";

const MainOuter = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  /* background-color: #fcfcfc; */
`;

const MainContainer = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;
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

export const Main = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [scrollTopBtnIsVisible, setScrollTopBtnIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cursor = useRef(-1);
  const [isEnd, setIsEnd] = useState(false);
  const login = useRecoilValue(isLogin);
  const [isDefaultId, setIsDefaultId] = useState(false);
  const [serverError, setServerError] = useState("");
  useEffect(() => {

    checkTime()
    let id = window.localStorage.getItem("userId") || '-1';

    setIsLoading(true);
    axios
      .get(`https://www.bbo-sharp.com/api/getpost?id=${id}&cursor=-1`)
      .then((res) => {
        if (res.data.posts.length === 0) {
          setIsDefaultId(true);
          axios.get(`${serverUrl}getpost?id=-1&cursor=-1`).then((res) => {
            setPosts(res.data.posts);
            setIsLoading(false);
            cursor.current = res.data.posts[res.data.posts.length - 1].id;
          });
          return;
        }
        setPosts(res.data.posts);
        setIsDefaultId(false);
        setIsLoading(false);
        cursor.current = res.data.posts[res.data.posts.length - 1].id;
      })
      .catch((err) => {
        const status = err.response.status;
        if (axios.isAxiosError(err)) {
          if (err.response !== undefined) {
            if (status >= 500) {
              setServerError(err.response.data.message);
            } else {
              console.log(err.response.data.message);
            }
            return;
          }
          if (err.request !== undefined) {
            console.log(err.message);
          }
        }
      });
  }, [login]);

  const handleScroll = useCallback((): void => {
    let id = window.localStorage.getItem("userId") || -1;
    if (isDefaultId) {
      id = "-1";
    }

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
            `https://www.bbo-sharp.com/api/getpost?id=${id}&cursor=${cursor.current}`
          )
          .then((res) => {
            if (res.data.posts.length === 0) {
              setIsLoading(false);
              setIsEnd(true);
              return;
            }
            setPosts([...posts, ...res.data.posts]);

            setIsLoading(false);
            cursor.current = res.data.posts[res.data.posts.length - 1].id;
          })
          .catch((err) => {
            const status = err.response.status;
            if (axios.isAxiosError(err)) {
              if (err.response !== undefined) {
                if (status >= 500) {
                  setServerError(err.response.data.message);
                } else {
                  console.log(err.response.data.message);
                }
                return;
              }
              if (err.request !== undefined) {
                console.log(err.message);
              }
            }
          });
      }
    }
  }, [isDefaultId, isEnd, posts]);
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

  if (serverError !== "") {
    return <ServerError err={serverError} />;
  }

  return (
    <MainOuter>
      <MainContainer>
        <SideBar />
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
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
};
