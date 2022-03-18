import React from "react";
import styled from "styled-components";

const FloatingBtn = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 40px;
  right: 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: black;
  font-size: 2rem;
  cursor: pointer;
`;

function FloatBtn() {
  return (
    <div>
      <FloatingBtn>
        <img
          style={{ width: "100%", height: "auto" }}
          src={`${process.env.PUBLIC_URL}/TopBtn.png`}
          alt="top"
        />
      </FloatingBtn>
    </div>
  );
}

export default FloatBtn;
