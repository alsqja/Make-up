import { useState } from "react";

import { SideBar } from "../Components/SideBar";

import styled from "styled-components";
import Contents from "./Search-Contents";
import User from "./Search-User";
const MainOuter = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fcfcfc;
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

const Container = styled.div`
  display: flex;
  width: 1200px;
  flex-direction: column;
  transition-duration: 0.3s;
  @media only screen and (max-width: 1200px) {
    width: 768px;
  }
  @media only screen and (max-width: 768px) {
    width: 500px;
  }
  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;

function Search() {
  const [contents, setContents] = useState(0);
  const handleClick =
    (key: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      setContents(key);
    };
  const menu = [<Contents />, <User />];
  return (
    <MainOuter>
      <MainContainer>
        <SideBar />
        <Container>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className={contents === 0 ? "contents" : ""}
              onClick={handleClick(0)}
              style={
                contents === 0
                  ? {
                      padding: "10px",
                      marginTop: "10px",
                      marginLeft: "auto",
                      borderRadius: "20px",
                      border: "1px solid var(--main-color)",
                    }
                  : { marginTop: "10px", padding: "10px", marginLeft: "auto" }
              }
            >
              내용 검색
            </div>
            <div
              className={contents === 1 ? "contents" : ""}
              onClick={handleClick(1)}
              style={
                contents === 1
                  ? {
                      marginTop: "10px",
                      padding: "10px",
                      marginLeft: "20px",
                      borderRadius: "20px",
                      border: "1px solid var(--main-color)",
                    }
                  : { marginTop: "10px", padding: "10px", marginLeft: "20px" }
              }
            >
              유저 검색
            </div>
          </div>
          <div>{menu[contents]}</div>
        </Container>
      </MainContainer>
    </MainOuter>
  );
}

export default Search;
