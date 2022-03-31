import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { defaultProfile } from "../Dummys/dummy";
import { Filebox, StyledFile } from "./SettingModal";
import { v4 } from "uuid";

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
  font-family: "S-CoreDream-3Light";
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: calc(50vw - 320px / 2);
  top: calc(50vh - 384px / 2);
  height: 470px;
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
  align-items: center;
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

export const Button = styled.button`
  all: unset;
  font-size: 15px;
  margin-bottom: 8px;
  color: #666666;
  background-color: #fdfdfd;
  border: 1px solid #ebebeb;
  border-radius: 0.25em;
  width: 180px;
  height: 30px;
  text-align: center;
  :hover {
    background-color: var(--main-color);
    color: white;
    transition-duration: 0.3s;
  }
`;

export const Button1 = styled.button`
  all: unset;
  font-size: 14px;
  margin-top: 10px;
  background-repeat: no-repeat;
  background-size: 0% 100%;
  transition: background-size 0.3s;
  background-image: linear-gradient(transparent 60%, var(--main-color) 40%);
  :hover {
    background-size: 100% 100%;
  }
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
  /* flex: 1 0 auto; */
`;
export const Warning = styled.div`
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
  isLoginModalOn,
}) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [isCheck, setIsCheck] = useState(true);
  const [file, setFile] = useState(""); //프로필사진
  const [profile, setProfile] = useState<File>()

  const checkPassHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkValue = e.target.value;
    setCheckPass(checkValue);
    if (checkValue === password || checkValue === "") {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  };

  const onClickProfile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const objectURL = URL.createObjectURL(e.target.files[0]);
    setFile(objectURL);
    setProfile(e.target.files[0])
  };

  const signupHandler = () => {
    if (!profile) {
      axios
        .post(
          'http://52.79.250.177:8080/signup',
          {
            email,
            nickname,
            password,
            profile: 'defaultProfile.jpeg'
          }
        )
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err.reponse))
      loginModalHandler(1)
      signupModalHandler(1)
      return;
    }
    const uuid = v4()
    axios
      .post(
        'http://52.79.250.177:8080/geturl',
        {
          files: [
            `${uuid}/${profile.name}`
          ]
        }
      )
      .then((res) => {
        axios
          .put(
            `${res.data[0].path}`,
            profile,
            {
              headers: {
                'Content-Type': profile.type
              }
            }
          )
          .then(() => {
            axios
              .post(
                'http://52.79.250.177:8080/signup',
                {
                  email,
                  nickname,
                  password,
                  profile: `${uuid}/${profile.name}`
                }
              )
              .then((res) => {
                loginModalHandler(1)
                signupModalHandler(1)
                console.log(profile)
              })
              .catch((err) => console.log(err))
          })
      })
  };

  return (
    <>
      <Canvas
        className={isLoginModalOn ? "canvas show" : "canvas"}
        onClick={() => {
          loginModalHandler(1);
          signupModalHandler(1);
        }}
      />
      <View
        className={isLoginModalOn ? "modal-view show" : "modal-view"}
        onClick={(e) => {
          // e.preventDefault(); <-- 이걸로 하면 사진 업로드 안돼요
          e.stopPropagation(); //<-- 그래서 이걸로 바꿨는데 문제 있으면 말씀해주세요
        }}
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
              signupModalHandler(1);
            }}
          >
            &times;
          </div>
          <InputWrapper>
            <Filebox style={{ marginLeft: "0", marginBottom: "10px" }}>
              <label htmlFor="fileupload">업로드</label>
              <input
                type="file"
                id="fileupload"
                multiple={false} //파일 다중선택 불가능
                onChange={onClickProfile}
              />
              {file === "" ? (
                <StyledFile src={defaultProfile} style={{ flexGrow: "0" }} />
              ) : (
                <StyledFile src={file} style={{ flexGrow: "0" }} />
              )}
            </Filebox>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={checkPass}
              onChange={checkPassHandler}
              // onChange={handleInputValue('password')}
            />
            <Warning style={isCheck ? { visibility: "hidden" } : {}}>
              비밀번호가 일치하지 않습니다.
            </Warning>
          </InputWrapper>
          <ButtonWrapper>
            <Button onClick={signupHandler}>계정 만들기</Button>
          </ButtonWrapper>
          <SubWrapper>
            <Button1
              onClick={() => {
                loginModalHandler(0);
                signupModalHandler(1);
              }}
            >
              이미 계정이 있나요? 로그인
            </Button1>
          </SubWrapper>
        </Wrapper>
      </View>
    </>
  );
};

export default SignupModal;
