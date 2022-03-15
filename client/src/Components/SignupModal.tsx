import React, { useState } from 'react';
import styled from 'styled-components';

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
  font-family: 'SUIT-Light';
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: absolute;

  left: calc(50vw - 320px / 2);
  top: calc(50vh - 384px / 2);
  height: 434px;
  width: 320px;
  background-color: white;
  border-radius: 16px;
  box-shadow: -1px -1px 1px #ececec,
    2px 2px 6px #b8b8b8;
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
  align-items: center;
  padding: 16px 0;
  margin-bottom: 8px;
  div {
    flex: 1 0 auto;
    text-align: left;
  }
  input {
    font-family: 'SUIT-Light';
    text-align: center;
    font-size: 16px;
    width: 192px;
    height: 24px;
    margin: 16px;
    border: none;
    border-bottom: 2.5px solid #e9e9e9;

    :focus {
      outline: none;
      border-bottom-color: pink;
      transition: all 0.5s;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 1 0 auto; */
`;

const Button = styled.button`
  font-family: 'OTWelcomeRA';
  font-size: 15px;
  /* font-weight: bold; */
  width: 192px;
  height: 33px;
  margin-bottom: 8px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  font-weight: bold;
  cursor: pointer;
  box-shadow: -1px -1px 1px #ececec,
    1px 1px 3px #b8b8b8;
  :hover {
    opacity: 0.9;
  }
`;

const SubWrapper = styled.div`
  font-family: 'OTWelcomeRA';
  display: flex;
  margin: 8px;
  div {
    margin: 8px;
    cursor: pointer;
    :hover {
      opacity: 0.6;
    }
  }
  /* flex: 1 0 auto; */
`;
export const Warning = styled.div`
  font-family: 'SUIT-Light';
  font-size: 12px;
  margin-top: -10px;
  color: red;
`;

interface IProps {
  isSignupModalOn: boolean;
  isLoginModalOn: boolean;
  signupModalHandler: (modalState: number) => void;
  loginModalHandler: (modalState: number) => void;
}

const SignupModal: React.FunctionComponent<IProps> = ({
  isSignupModalOn,
  signupModalHandler,
  loginModalHandler,
  isLoginModalOn
}) => {

  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [checkPass, setCheckPass] = useState('')
  const [isCheck, setIsCheck] = useState(true)

  const checkPassHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkValue = e.target.value
    setCheckPass(checkValue)
    if (checkValue === password || password === '') {
      setIsCheck(true)
    }
    else {
      setIsCheck(false)
    }
  }

  return (
    <>
      <Canvas
        className={isLoginModalOn ? 'canvas show' : 'canvas'}
        onClick={() => {
          loginModalHandler(1)
          signupModalHandler(1)
        }}
      />
      <View
        className={isLoginModalOn ? 'modal-view show' : 'modal-view'}
        onClick={(e) => e.preventDefault()}
      >
        <Wrapper>
          <div
            className="exit-wrapper"
            style={{ fontSize: '15px' }}
            onClick={() => {
              loginModalHandler(1)
              signupModalHandler(1)
            }}
          >
            &times;
          </div>
          <InputWrapper>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <input
              type="text"
              placeholder="nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value)
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={checkPass}
              onChange={checkPassHandler}
              // onChange={handleInputValue('password')}
            />
            <Warning style={isCheck ? { display: 'none' } : {}}>
              비밀번호가 일치하지 않습니다.
            </Warning>
          </InputWrapper>
          <ButtonWrapper>
            <Button>
              계정 만들기
            </Button>
          </ButtonWrapper>
          <SubWrapper>
            <div onClick={() => {
              loginModalHandler(0)
              signupModalHandler(1)
            }}>
              이미 계정이 있나요? 로그인
            </div>
          </SubWrapper>
        </Wrapper>
      </View>
    </>
  );
};

export default SignupModal;
