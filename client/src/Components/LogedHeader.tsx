import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HeaderLogo, Search, Btn, ButtonBox } from "./Header";
const HeaderOuter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -2px -2px 4px #ececec, 3px 3px 8px #b8b8b8;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
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
`;

export const LogedHeader = () => {
  const navigate = useNavigate();

  const userInfoHandler = () => {
    navigate(`/mypage/0`);
  };

  return (
    <HeaderOuter>
      <Container>
        <Link to="/">
          <HeaderLogo
            src={`${process.env.PUBLIC_URL}/headerLogo1.png`}
            alt="headerLogo"
          />
        </Link>
        <Search type={"text"} />
        <ButtonBox>
          <Btn onClick={userInfoHandler}>username</Btn>
        </ButtonBox>
      </Container>
    </HeaderOuter>
  );
};
