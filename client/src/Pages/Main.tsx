import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { dummyPosts, IPost } from "../Dummys/dummy";
import { PostCard } from "../Components/PostCard";
import { SideBar } from "../Components/SideBar";
import FloatBtn from "../Components/FloatBtn";
const MainOuter = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  /* background-color:  */
`;

const MainContainer = styled.div`
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

  padding-bottom: 20px;
`;

export const Main = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [scrollTopBtnIsVisible, setScrollTopBtnIsVisible] = useState(false);

  useEffect(() => {
    setPosts(dummyPosts);
  }, []);

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
  }, []);

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
      </MainContainer>
      {scrollTopBtnIsVisible && (
        <div onClick={scrollToTop}>
          <FloatBtn />
        </div>
      )}
    </MainOuter>
  );
};