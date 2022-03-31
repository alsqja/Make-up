import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

function Loading() {
  return (
    <Container>
      <img
        style={{ width: "50px", height: "auto" }}
        src={`${process.env.PUBLIC_URL}/loading.gif`}
        alt="loading"
      />
    </Container>
  );
}

export default Loading;
