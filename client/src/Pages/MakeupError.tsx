import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: grid;
  grid-template-rows: 1fr 1fr;
  font-family: "HS-Regular";
`;
const Item = styled.p`
  margin: 0px;
  font-size: 150px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;

  color: var(--main-color);
`;
const Item1 = styled.div`
  margin: 0px;
  background-color: var(--main-color);
  color: white;
  text-align: center;
  font-size: 40px;
  transition: 1s;
  @media only screen and (max-width: 700px) {
    font-size: 20px;
  }
`;

function MakeupError() {
  return (
    <Container>
      <Item>Error!</Item>
      <Item1>
        얼굴 인식에 실패했습니다. <br />
        최대한 음영이 없는 정면 사진으로 다시 시도해주세요.
      </Item1>
    </Container>
  );
}

export default MakeupError;
