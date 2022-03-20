import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 } from "uuid";
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

  const [uuid, setuuid] = useState('')
  const [before, setBefore] = useState<File>()
  const [after, setAfter] = useState<File>()

  const navigate = useNavigate();

  useEffect(() => {
    setuuid(v4())
  }, [])

  const makeupHandler = () => {
    axios
      .post(
        'http://52.79.250.177:8080/geturl/makeup',
        {
          files: [
            `${uuid}/source/source.png`,
            `${uuid}/target/target.png`
          ]
        }
      )
      .then((res) => {
        if (!before || !after) {
          alert('사진을 넣어주세요')
          return;
        }
        axios
          .put(
            `${res.data[0].path}`,
            before,
            {
              headers: {
                'Content-Type': before.type
              }
            }
          )
          .then(() => {
            axios
              .put(
                `${res.data[1].path}`,
                after,
                {
                  headers: {
                    'Content-Type': after.type
                  }
                }
              )
              .then((res) => {
                navigate(`/result/${uuid}`)
              })
          })
      })
  }

  return (
    <Outer>
      <Container>
        <ImgBox>
          <ImageUpload setFile={setBefore}/>
        </ImgBox>
        <MiniLabel>화장할 사진을 넣어주세요</MiniLabel>
        <Plus>+</Plus>
        <ImgBox>
          <ImageUpload setFile={setAfter}/>
        </ImgBox>
        <MiniLabel>화장된 사진을 넣어주세요</MiniLabel>
        <BeforeMessage>화장할 사진을 넣어주세요</BeforeMessage>
        <BeforeMessage style={{gridColumn: '8 / span 5'}}>화장된 사진을 넣어주세요</BeforeMessage>
        <Btn onClick={makeupHandler}>화장하기</Btn>
      </Container>
    </Outer>
  )
}