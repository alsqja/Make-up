import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: "SUIT-Light";
  grid-column: 4 / span 9;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* min-height: 400px; */
  margin-top: 20px;
  /* cursor: pointer; */
  @media only screen and (max-width: 768px) {
    grid-column: 4 / span 9;
  }
  @media only screen and (max-width: 501px) {
    grid-column: span 6;
  }
`;
function Loading() {
  return (
    <Container>
      <img
        style={{ width: "70px", height: "auto" }}
        src={`${process.env.PUBLIC_URL}/loading.gif`}
        alt="loading"
      />
    </Container>
  );
}

export default Loading;
