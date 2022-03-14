import { useState } from 'react';
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
  height: 384px;
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
  margin-top: 30px;
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
  signupModalHandler
}) => {
  const [inputValue, setInputValue] = useState<InputValue>({
    email: '',
    password: '',
  });

  return (
    <>
      <Canvas
        className={isLoginModalOn ? 'canvas show' : 'canvas'}
        onClick={() => {
          loginModalHandler(1)
        }}
      />
      <View
        className={isLoginModalOn ? 'modal-view show' : 'modal-view'}
        onClick={(e) => e.preventDefault()}
      >
        <Wrapper>
          <div
            className="exit-wrapper"
            style={{ fontSize: '15px', cursor: 'pointer' }}
            onClick={() => {
              loginModalHandler(1)
            }}
          >
            &times;
          </div>
          <InputWrapper>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => {
                setInputValue({...inputValue, email: e.target.value})
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setInputValue({...inputValue, password: e.target.value})
              }}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button>
              로그인
            </Button>
          </ButtonWrapper>
          <SubWrapper>
            <Button onClick={() => {
              signupModalHandler(0)
            }}>
              회원가입
            </Button>
          </SubWrapper>
        </Wrapper>
      </View>
    </>
  );
};

export default LoginModal;
