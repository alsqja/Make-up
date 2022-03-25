import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isLogin, hamberger } from "../store/store";
import { LogedHeader } from "./LogedHeader";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import "../fonts/fonts.css";
import { useEffect, useState } from "react";
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
  box-shadow: -2px -2px 4px #ececec, 3px 3px 8px #c5c5c5;
  background-color: rgba(255, 255, 255, 0.9);
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

export const HeaderLogo = styled.img`
  width: 100px;
  height: auto;
  margin-top: 10px;
`;

export const Search = styled.input`
  &:focus {
    outline: 2px solid #f2949c;
    animation-name: border-focus;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    border: 0px;
  }
  @keyframes border-focus {
    from {
      border-radius: 0;
    }
    to {
      border-radius: 15px;
    }
  }
  grid-column: 4 / span 7;
  max-width: 400px;
  height: 17px;
  padding: 5px;
  padding-left: 10px;
  border-radius: 5px;
  border: 0.5px solid #999;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const ButtonBox = styled.div`
  grid-column: 11 / span 7;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
  margin-top: 5px;
  @media only screen and (max-width: 768px) {
    grid-column: 6 / span 7;
    justify-content: flex-end;
  }
`;

export const Btn = styled.div`
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
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const HambergerContainer = styled.div<{
  hamberger: boolean;
}>`
  display: none;
  > input[id="trigger"] {
    display: none;
  }
  > label[for="trigger"] {
    width: 20px;
    height: 15px;
    display: block;
    position: relative;
    > span {
      position: absolute;
      height: 2px;
      width: 100%;
      cursor: pointer;
      background-color: #333333;
      transition: 0.3s;
    }
    > span:nth-child(1) {
      top: 0;
      ${({ hamberger }) => hamberger && "transform: rotate(45deg); top:50%"};
    }
    > span:nth-child(2) {
      top: 50%;
      ${({ hamberger }) => hamberger && "opacity: 0"};
    }
    > span:nth-child(3) {
      top: 100%;
      ${({ hamberger }) => hamberger && "transform: rotate(-45deg); top:50%"};
    }
  }
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

interface IProps {
  isLoginModalOn: boolean;
  loginModalHandler: (modalState: number) => void;
  isSignupModalOn: boolean;
  signupModalHandler: (modalState: number) => void;
  query: string;
  setQuery: (str: string) => void; //Dispatch<SetStateAction<string>>;
}

export const Header = ({
  isLoginModalOn,
  loginModalHandler,
  isSignupModalOn,
  signupModalHandler,
  query,
  setQuery,
}: IProps) => {
  const [login, setLogin] = useRecoilState(isLogin);
  const navigate = useNavigate();
  const [Hamberger, setHamberger] = useRecoilState(hamberger);
  useEffect(() => {
    if (window.localStorage.getItem("isLogin") === "true") {
      setLogin(true);
    }
  }, [setLogin]);

  if (login) {
    return (
      <LogedHeader
        signupModalHandler={signupModalHandler}
        loginModalHandler={loginModalHandler}
        query={query}
        setQuery={setQuery}
      />
    );
  }

  return (
    <>
      <HeaderOuter>
        {isLoginModalOn ? (
          !isSignupModalOn ? (
            <LoginModal
              isLoginModalOn={isLoginModalOn}
              loginModalHandler={loginModalHandler}
              signupModalHandler={signupModalHandler}
            />
          ) : (
            <SignupModal
              isSignupModalOn={isLoginModalOn}
              loginModalHandler={loginModalHandler}
              signupModalHandler={signupModalHandler}
              isLoginModalOn={isLoginModalOn}
            />
          )
        ) : (
          ""
        )}
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
              onClick={() => {
                loginModalHandler(0);
              }}
            >
              LOGIN
            </Btn>
            <Btn
              onClick={() => {
                loginModalHandler(0);
                signupModalHandler(0);
              }}
            >
              SIGNUP
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
