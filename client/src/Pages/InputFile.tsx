import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ImageUpload } from "../Components/ImageUpload";

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

const ImgBox = styled.div`
  grid-column: span 5;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px dotted black;
  @media only screen and (max-width: 500px) {
    grid-column: span 6;
  }
`;

const Plus = styled.div`
  grid-column: span 2;
  margin: auto;
  font-size: 50px;
  @media only screen and (max-width: 500px) {
    grid-column: span 6;
    padding: 30px 0;
  }
`

const BeforeMessage = styled.div`
  grid-column: span 5;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`

const Btn = styled.div`
  margin-top: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
  font-weight: bold;
  border-radius: 20px;
  background-color: pink;
  grid-column: 6 / span 2;
  padding: 15px 0;
  @media only screen and (max-width: 500px) {
    grid-column: 3 / span 2;
  }
`

const MiniLabel = styled.div`
  display: none;
  @media only screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: span 6;
  }
`

export const InputFile = () => {

  const navigate = useNavigate();

  const makeupHandler = () => {
    navigate('/result')
  }

  return (
    <Outer>
      <Container>
        <ImgBox>
          <ImageUpload/>
        </ImgBox>
        <MiniLabel>화장할 사진을 넣어주세요</MiniLabel>
        <Plus>+</Plus>
        <ImgBox>
          <ImageUpload/>
        </ImgBox>
        <MiniLabel>화장된 사진을 넣어주세요</MiniLabel>
        <BeforeMessage>화장할 사진을 넣어주세요</BeforeMessage>
        <BeforeMessage style={{gridColumn: '8 / span 5'}}>화장된 사진을 넣어주세요</BeforeMessage>
        <Btn onClick={makeupHandler}>화장하기</Btn>
      </Container>
    </Outer>
  )
}