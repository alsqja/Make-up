import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { hamberger } from "../store/store";
import { HeaderLogo, Search, ButtonBox } from "./Header";
import { HambergerContainer } from "./Header";
import HambergerSideBar from "./HambergerSideBar";
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
const Btn = styled.div`
  height: 30px;
  width: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  flex: 1;
  margin: 0 10px;
  font-family: "Cafe24SsurroundAir";
  &:hover {
    color: #f2949c;
    font-weight: bold;
  }
  /* @media only screen and (max-width: 768px) {
    display: none;
  } */
`;

interface IProps {
  setQuery: (str: string) => void;
  query: string;
  loginModalHandler: (modalState: number) => void;
  signupModalHandler: (modalState: number) => void;
}

export const LogedHeader = ({
  setQuery,
  query,
  loginModalHandler,
  signupModalHandler,
}: IProps) => {
  const navigate = useNavigate();

  const [Hamberger, setHamberger] = useRecoilState(hamberger);
  const userInfoHandler = () => {
    const id = window.localStorage.getItem("userId");
    navigate(`/mypage/${id}`);
  };

  return (
    <>
      <HeaderOuter>
        <Container>
          <Link to="/">
            <HeaderLogo
              src={`${process.env.PUBLIC_URL}/headerLogo3.png`}
              alt="headerLogo"
            />
          </Link>
          <Search
            type={"text"}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                // Search 함수
                if (query === "") {
                  return;
                }

                navigate(`/search/${query}`, {
                  state: query,
                });
                // setIsMiniOpen(false);
              }
            }}
          />
          <ButtonBox>
            <Btn
              style={{ fontSize: "14px", marginRight: "20px" }}
              onClick={userInfoHandler}
            >
              username
            </Btn>
            <HambergerContainer hamberger={Hamberger}>
              <input
                type="chechbox"
                id="trigger"
                onClick={() => setHamberger(!Hamberger)}
              />
              <label htmlFor="trigger">
                <span />
                <span />
                <span />
              </label>
            </HambergerContainer>
          </ButtonBox>
        </Container>
      </HeaderOuter>
      {Hamberger && (
        <HambergerSideBar
          signupModalHandler={signupModalHandler}
          loginModalHandler={loginModalHandler}
          query={query}
          setQuery={setQuery}
        />
      )}
    </>
  );
};
