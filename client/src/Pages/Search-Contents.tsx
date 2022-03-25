import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { IPost } from "../Dummys/dummy";
import { PostCard } from "../Components/PostCard";
import { SideBar } from "../Components/SideBar";
import FloatBtn from "../Components/FloatBtn";
import axios from "axios";
import Loading from "../Components/Loading";
import styled from "styled-components";

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

function Contents() {
  const location = useLocation().state as string;
  const query = location;
  const [posts, setPosts] = useState<IPost[]>([]);
  const [scrollTopBtnIsVisible, setScrollTopBtnIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState(-1)
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    setCursor(-1)
    setPosts([])
    setIsEnd(false)
    setIsLoading(true);
    axios
      .get(`http://52.79.250.177:8080/post/search?query=${query}&cursor=-1`)
      .then((res) => {
        if (res.data.length === 0) {
          setIsLoading(false);
          setPosts(res.data);
          setIsEnd(true);
          return;
        }
        setPosts(res.data);
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
            `http://52.79.250.177:8080/post/search?query=${query}&cursor=${cursor}`
          )
          .then((res) => {
            if (res.data.length === 0) {
              setIsLoading(false);
              setIsEnd(true);
              return;
            }
            setPosts([...posts, ...res.data]);

            setIsLoading(false);
            setCursor(res.data[res.data.length - 1].id)
          })
          .catch((err) => console.log("err::", err));
      }
    }
  }, [cursor, isEnd, posts, query]);
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
}

export default Contents;
