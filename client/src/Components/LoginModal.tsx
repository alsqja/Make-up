import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLogin } from "../store/store";
import { Button } from "./SignupModal";
import "../fonts/fonts.css";
const Canvas = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.5s;
  &.show {
    opacity: 1;
  }
`;

const View = styled.div`
  /* display: flex; */
  /* font-family: "S-CoreDream-3Light"; */
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: absolute;

  left: calc(50vw - 320px / 2);
  top: calc(50vh - 384px / 2);
  height: 364px;
  width: 320px;
  background-color: white;
  border-radius: 16px;
  z-index: 999;
  opacity: 0;
  transition: all 0.5s;
  &.show {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex: 100 0 auto;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 1 0 auto; */
  padding: 16px 0;
  margin-bottom: 8px;
  div {
    flex: 1 0 auto;
    text-align: left;
  }
  input {
    font-family: "S-CoreDream-3Light";
    text-align: center;
    font-size: 16px;
    width: 192px;
    height: 24px;
    margin: 16px;
    border: none;
    border-bottom: 3px solid #e9e9e9;
    :focus {
      outline: none;
      border-bottom-color: var(--main-color);
      transition: all 0.5s;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 1 0 auto; */
`;

const SubWrapper = styled.div`
  display: flex;
  margin: 8px;
  div {
    margin: 8px;
    cursor: pointer;
    :hover {
      opacity: 0.6;
    }
  }
`;

interface IProps {
  isLoginModalOn: boolean;
  loginModalHandler: (modalState: number) => void;
  signupModalHandler: (modalState: number) => void;
}

type InputValue = {
  email: string;
  password: string;
};

const LoginModal: React.FunctionComponent<IProps> = ({
  isLoginModalOn,
  loginModalHandler,
  signupModalHandler,
}) => {
  const [inputValue, setInputValue] = useState<InputValue>({
    email: "",
    password: "",
  });

  const setIsLogin = useSetRecoilState(isLogin);

  const loginHandler = () => {
    setIsLogin(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //엔터 누를시 로그인
    if (e.key === "Enter") loginHandler();
  };

  return (
    <>
      <Canvas
        className={isLoginModalOn ? "canvas show" : "canvas"}
        onClick={() => {
          loginModalHandler(1);
        }}
      />
      <View
        className={isLoginModalOn ? "modal-view show" : "modal-view"}
        onClick={(e) => e.preventDefault()}
      >
        <Wrapper>
          <div
            className="exit-wrapper"
            style={{
              marginLeft: "auto",
              padding: "20px 30px 0px 0px",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              loginModalHandler(1);
            }}
          >
            &times;
          </div>
          <InputWrapper>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => {
                setInputValue({ ...inputValue, email: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onKeyUp={handleKeyPress}
              onChange={(e) => {
                setInputValue({ ...inputValue, password: e.target.value });
              }}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button onClick={loginHandler}>LOGIN</Button>
          </ButtonWrapper>
          <SubWrapper>
            <Button
              onClick={() => {
                signupModalHandler(0);
              }}
            >
              SIGNUP
            </Button>
          </SubWrapper>
        </Wrapper>
      </View>
    </>
  );
};

export default LoginModal;
