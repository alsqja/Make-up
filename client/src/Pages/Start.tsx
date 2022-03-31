import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Outer = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;

  ::-webkit-scrollbar {
    display: none;
  }

  > div {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
  }
`;

const First = styled.div`
  background-color: red;
`;

const Second = styled.div`
  background-color: blue;
`;

const Third = styled.div`
  background-color: yellow;
`;

const DIVIDER_HEIGHT = 5;

export const Start = () => {
  const outerDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = document.documentElement; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, down");
          window.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, down");
          window.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(3);
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, down");
          window.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(3);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, up");
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, up");
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(1);
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, up");
          window.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(2);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;

    if (!outerDivRefCurrent) {
      return;
    }

    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      console.log("herererere");
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <Outer ref={outerDivRef}>
      <First>1</First>
      <Second>2</Second>
      <Third>3</Third>
    </Outer>
  );
};
