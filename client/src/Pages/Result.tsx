import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { defaultProfile } from "../Dummys/dummy";
import { Loading } from "./Loading";

const Outer = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  top: 0;
`;

const Container = styled.div`
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
    /* grid-template-columns: repeat(6, 1fr); */
  }

  padding: 50px 0;
`;

interface IImgProps {
  src: string;
}

const ResultImg = styled.div<IImgProps>`
  grid-column: 2 / span 10;
  height: 550px;
  background-image: url(${(props) => `'${props.src}'`});
  background-color: #eeeeee;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  transition: 0.25s;
  @media only screen and (max-width: 768px) {
    height: 500px;
  }
  @media only screen and (max-width: 500px) {
    height: 400px;
  }
`;

const BtnBox = styled.div`
  margin-top: 20px;
  grid-column: 2 / span 10;
  display: flex;
  justify-content: space-around;
`;

const Btn = styled.div`
  all: unset;
  font-family: "InfinitySans-RegularA1";
  font-size: 16px;
  margin-top: 10px;
  background-repeat: no-repeat;
  background-size: 0% 100%;
  transition: background-size 0.3s;
  background-image: linear-gradient(transparent 60%, var(--main-color) 40%);
  :hover {
    background-size: 100% 100%;
  }
`;

export const Result = () => {

  const [img, setImg] = useState(defaultProfile)
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation().pathname.split("/")[2];
  const uuid = location;

  useEffect(() => {

    setIsLoading(true)
    axios
      .get(
        `http://52.79.250.177:8080/result/${uuid}`
      )
      .then((res) => {
        setImg(res.data.file)
        setIsLoading(false)
      })
  }, [uuid])

  if (isLoading) {
    return <Loading/>
  }

  return (
    <Outer>
      <Container>
        <ResultImg src={img}></ResultImg>
        <BtnBox>
          <Btn>공유하기</Btn>
          <Btn>저장하기</Btn>
          <Btn>게시글 작성</Btn>
        </BtnBox>
      </Container>
    </Outer>
  );
};
