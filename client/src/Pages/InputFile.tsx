import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 } from "uuid";
import { ImageUpload } from "../Components/ImageUpload";
import MakeupError from "./MakeupError";
const Outer = styled.div`
  font-family: "SUIT-Light";
  padding-top: 48px;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;

  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 501px) {
    top: 200px;
    position: absolute;
  }
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
    grid-template-columns: repeat(6, 1fr);
  }

  padding: 50px 0;
`;

const ImgBox = styled.div`
  grid-column: span 5;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 2px dotted white;
  background-color: #f1f1f1;
  @media only screen and (max-width: 1200px) {
    height: 300px;
  }
  @media only screen and (max-width: 768px) {
    height: 200px;
  }
  @media only screen and (max-width: 500px) {
    height: 300px;
    grid-column: span 6;
  }
  &:hover {
    border: 2px solid var(--main-color);
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
`;

const BeforeMessage = styled.div`
  font-family: "InfinitySans-RegularA1";
  color: #3d3d3d;
  grid-column: span 5;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

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
  @media only screen and (max-width: 768px) {
    grid-column: 5 / span 4;
  }
  @media only screen and (max-width: 500px) {
    grid-column: 3 / span 2;
  }
  &:hover {
    background-color: #fdcbd3;
  }
`;

const MiniLabel = styled.div`
  display: none;
  @media only screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: span 6;
  }
`;

export const InputFile = () => {
  const [uuid, setuuid] = useState("");
  const [before, setBefore] = useState<File>();
  const [after, setAfter] = useState<File>();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setuuid(v4());
  }, []);

  const makeupHandler = () => {
    axios
      .post("https://www.bbo-sharp.com/api/geturl/makeup", {
        files: [`${uuid}/source/source.png`, `${uuid}/target/target.png`],
      })
      .then((res) => {
        if (!before || !after) {
          alert("사진을 넣어주세요");
          return;
        }
        axios
          .put(`${res.data[0].path}`, before, {
            headers: {
              "Content-Type": before.type,
            },
          })
          .then(() => {
            axios
              .put(`${res.data[1].path}`, after, {
                headers: {
                  "Content-Type": after.type,
                },
              })
              .then((res) => {
                navigate(`/result/${uuid}`);
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
      });
  };

  if (serverError !== "") {
    return <MakeupError err={serverError} />;
  }
  return <MakeupError err={serverError} />;

  // return (
  //   <Outer>
  //     <Container>
  //       <ImgBox>
  //         <ImageUpload setFile={setBefore} />
  //       </ImgBox>
  //       <MiniLabel>화장할 사진을 넣어주세요</MiniLabel>
  //       <Plus>+</Plus>
  //       <ImgBox>
  //         <ImageUpload setFile={setAfter} />
  //       </ImgBox>
  //       <MiniLabel>화장된 사진을 넣어주세요</MiniLabel>
  //       <BeforeMessage>화장할 사진을 넣어주세요</BeforeMessage>
  //       <BeforeMessage style={{ gridColumn: "8 / span 5" }}>
  //         화장된 사진을 넣어주세요
  //       </BeforeMessage>
  //       <Btn onClick={makeupHandler}>화장하기</Btn>
  //     </Container>
  //   </Outer>
  // );
};
