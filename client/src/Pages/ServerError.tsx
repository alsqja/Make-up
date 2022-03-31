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
  font-size: 50px;
  transition: 1s;
  @media only screen and (max-width: 700px) {
    font-size: 30px;
  }
`;

interface Props {
  err: string;
}
function ServerError({ err }: Props) {
  return (
    <Container>
      <Item>500</Item>
      <Item1>
        <p style={{ fontSize: "70px" }}>Server Error</p>
        <br />
        OOPS! Something went wrong.
      </Item1>
    </Container>
  );
}

export default ServerError;
