import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { v4 } from "uuid";
import { IUserInfo } from "../Dummys/dummy";
import { notify, userSettingModal } from "../store/store";
import { Button1 } from "./SignupModal";
const Outer = styled.div`
  font-family: "S-CoreDream-3Light";
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;
interface IImgProps {
  src: string;
}
export const StyledFile = styled.div<IImgProps>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-image: url(${(props) => `'${props.src}'`});
  background-color: gray;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
`;

const Modal = styled.div`
  width: 50vw;
  padding: 3em;
  border-radius: 1em;
  background: white;
  max-width: 400px;
`;

export const Filebox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  width: 150px;
  height: 60px;
  font-size: 14px;
  justify-content: space-between;
  > label {
    &:hover {
      background-color: var(--main-color);
      color: white;
      transition-duration: 0.5s;
    }
    text-align: center;
    line-height: 22px;
    padding: 4px;
    color: #999;
    background-color: #fdfdfd;
    border: 1px solid #ebebeb;
    border-radius: 0.25em;
    height: 20px;
    width: 50px;
  }
  > input[type="file"] {
    //숨김
    position: absolute;
    width: 1px;

    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  @media only screen and (max-width: 600px) {
    margin-left: 0;
  }
`;

const Set = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
  &.bottomBtn {
    @media only screen and (max-width: 600px) {
      flex-direction: row;
    }
  }

  > div {
    font-size: 14px;
  }
  > .btn {
    color: #474747;
    font-size: 16px;
    font-weight: bold;
  }
`;

const Input = styled.input`
  all: unset;
  margin-left: auto;
  font-family: "S-CoreDream-3Light";
  text-align: center;
  font-size: 16px;
  width: 180px;
  height: 24px;
  margin-top: 5px;
  border-bottom: 3px solid #e9e9e9;
  :focus {
    outline: none;
    border-bottom-color: var(--main-color);
    transition: all 0.5s;
  }
  @media only screen and (max-width: 600px) {
    margin-left: 0;
  }
`;
const Password = styled.div`
  margin-left: auto;
  margin-right: 30px;
  @media only screen and (max-width: 600px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const WithdrawalDiv = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const WithdrawalInput = styled.input`
  &:focus {
    outline: none;
    border-bottom: 3px solid #979797;
  }
  all: unset;
  color: #da0000;
  font-weight: bold;
  text-align: center;
  border-bottom: 3px solid #d3d3d3;
`;
const Btn = styled.button`
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

interface IProps {
  userInfo: IUserInfo | undefined;
}

function SettingModal({ userInfo }: IProps) {
  const setIsUserSettingModalOn = useSetRecoilState(userSettingModal);
  const [file, setFile] = useState(""); //프로필사진
  const [nickname, setNickname] = useState(userInfo?.nickname); //닉넴
  const [password, setPassword] = useState(""); //기존 비번
  const [newPassword, setNewPassword] = useState(""); //새비번
  const [newCheckpw, setNewCheckpw] = useState(""); //새비번확인
  const [isCheck, setIsCheck] = useState(true);
  const [Withdrawal, setWithdrawal] = useState(false);
  const [profile, setProfile] = useState<File>();
  const [ghldnjsxkfxhl, setGhldnjsxkfxhl] = useState("");

  const onClickProfile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const objectURL = URL.createObjectURL(e.target.files[0]);
    setFile(objectURL);
    setProfile(e.target.files[0]);
  };

  const [notification, setNotification] = useRecoilState(notify)
  const navigate = useNavigate()

  const notifyHandler = (message: string) => {
    const uuid = v4()
    setTimeout(() => {
      setNotification([...notification, {uuid, message, dismissTime: 2000}])
    }, 0)
    setTimeout(() => {
      setNotification([])
    }, 2000)
  }

  const onChangeValue = (
    str: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (str) {
      case "nickname":
        setNickname(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "Newpw":
        setNewPassword(e.target.value);
        break;
      case "NewCheckpw":
        if (newPassword === e.target.value) {
          setIsCheck(true);
        } else {
          setIsCheck(false);
        }

        setNewCheckpw(e.target.value);
    }
  };

  const changeUserInfoHandler = () => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (!profile) {
      const profileMaker = (url: string | undefined) => {
        if (!url) {
          return "defaultProfile.jpeg";
        }
        if (url.split("/").length > 4) {
          return url.split("/")[3] + "/" + url.split("/")[4];
        } else {
          return url.split("/")[3];
        }
      };
      axios
        .put(
          `https://www.bbo-sharp.com/api/user/me`,
          {
            nickname,
            profile: profileMaker(userInfo?.profile),
            oldPassword: password,
            newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          notifyHandler("수정이 완료되었습니다.");
          window.location.href = `/mypage/${userInfo?.id}`;
        })
        .catch((err) => {
          notifyHandler(err.response.message)
        })
      return;
    }
    const uuid = v4();
    axios
      .post("https://www.bbo-sharp.com/api/geturl", {
        files: [`${uuid}/${profile.name}`],
      })
      .then((res) => {
        axios
          .put(`${res.data[0].path}`, profile, {
            headers: {
              "Content-Type": profile.type,
            },
          })
          .then(() => {
            // console.log(`${uuid}/${profile.name}`)
            axios
              .put(
                `https://www.bbo-sharp.com/api/user/me`,
                {
                  nickname,
                  profile: `${uuid}/${profile.name}`,
                  oldPassword: password,
                  newPassword,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then(() => {
                window.location.href = `/mypage/${userInfo?.id}`;
                notifyHandler("수정이 완료되었습니다.");
              });
          });
      });
  };

  const withdrawalHandler = () => {
    if (ghldnjsxkfxhl !== "회원탈퇴") {
      notifyHandler("정확히 입력해주세요");
      return;
    }
    const accessToken = window.localStorage.getItem("accessToken");
    axios
      .delete("https://www.bbo-sharp.com/api/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        notifyHandler("회원탈퇴");
        window.localStorage.setItem("accessToken", "");
        window.localStorage.setItem("userId", "-1");
        window.localStorage.setItem("isLogin", "false");
        navigate('/')
      });
  };

  return (
    <Outer onClick={() => setIsUserSettingModalOn(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <div
          className="exit-wrapper"
          style={{
            marginLeft: "auto",
            width: "10px",
            margin: "-20px -20px -10px auto", //위 오 아래 왼
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => setIsUserSettingModalOn(false)}
        >
          &times;
        </div>
        {Withdrawal ? (
          <WithdrawalDiv>
            <div>회원님의 모든 정보가 삭제됩니다.</div>
            <div>정말 탈퇴 하시겠습니까?</div>
            <div>탈퇴하시려면 회원탈퇴를 입력해주세요.</div>
            <WithdrawalInput
              placeholder="회원탈퇴"
              value={ghldnjsxkfxhl}
              onChange={(e) => {
                setGhldnjsxkfxhl(e.target.value);
              }}
            ></WithdrawalInput>
            <Set
              style={{
                width: "50%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Btn onClick={withdrawalHandler}>회원탈퇴</Btn>
              <Btn
                onClick={() => {
                  setWithdrawal(false);
                  setIsUserSettingModalOn(false);
                }}
              >
                취소
              </Btn>
            </Set>
          </WithdrawalDiv>
        ) : (
          <>
            <Set>
              <div style={{ marginBottom: "10px" }}>프로필 사진</div>
              <Filebox>
                <label htmlFor="fileUpload">업로드</label>
                <input
                  type="file"
                  id="fileUpload"
                  multiple={false} //파일 다중선택 가능
                  onChange={onClickProfile}
                />
                {!!userInfo?.profile && file === "" ? (
                  <StyledFile src={userInfo.profile} />
                ) : (
                  <StyledFile src={file} />
                )}
              </Filebox>
            </Set>
            <Set>
              <div>닉네임</div>
              <Input
                value={nickname}
                onChange={(e) => onChangeValue("nickname", e)}
              />
            </Set>
            <Set>
              <div>기존 비밀번호</div>
              <Input
                value={password}
                onChange={(e) => onChangeValue("password", e)}
              />
            </Set>
            <Set>
              <div>새 비밀번호</div>
              <Input
                value={newPassword}
                onChange={(e) => onChangeValue("Newpw", e)}
              />
            </Set>
            <Set>
              <div>새 비밀번호 확인</div>
              <Input
                value={newCheckpw}
                onChange={(e) => onChangeValue("NewCheckpw", e)}
              />
            </Set>
            <Set>
              <Password
                style={
                  isCheck
                    ? { visibility: "hidden", marginTop: "-11px" }
                    : {
                        color: "red",
                        fontSize: "13px",
                        marginTop: "-10px",
                      }
                }
              >
                비밀번호가 다릅니다
              </Password>
            </Set>
            <Set
              className="bottomBtn"
              style={{
                justifyContent: "space-around",
              }}
            >
              {/* TODO*/}
              <Button1 className="btn" onClick={changeUserInfoHandler}>
                수정하기
              </Button1>
              <Button1 className="btn" onClick={() => setWithdrawal(true)}>
                회원탈퇴
              </Button1>
            </Set>
          </>
        )}
      </Modal>
    </Outer>
  );
}

export default SettingModal;
