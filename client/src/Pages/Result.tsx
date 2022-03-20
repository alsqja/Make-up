import styled from "styled-components";
import { defaultProfile } from "../Dummys/dummy";

const Outer = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
`

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
    grid-template-columns: repeat(6, 1fr);
  }

  padding: 50px 0;
`

interface IImgProps {
  src: string;
}

const ResultImg = styled.div<IImgProps>`
  grid-column: 2 / span 10;
  height: 600px;
  background-image: url(${(props) => `'${props.src}'`});
  background-color: black;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`

const BtnBox = styled.div`
  margin-top: 20px;
  grid-column: 2 / span 10;
  display: flex;
  justify-content: space-around;
`

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-weight: bold;
  width: 150px;
  height: 50px;
  background-color: pink;
  border-radius: 20px;
`

export const Result = () => {

  return (
    <Outer>
      <Container>
        <ResultImg src={defaultProfile}></ResultImg>
        <BtnBox>
          <Btn>공유하기</Btn>
          <Btn>저장하기</Btn>
          <Btn>게시글 작성</Btn>
        </BtnBox>
      </Container>
    </Outer>
  )
}