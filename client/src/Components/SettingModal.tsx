import React, { SetStateAction, useState, Dispatch, useEffect } from "react";
import styled from "styled-components";

const Outer = styled.div`
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
const StyledFile = styled.div<IImgProps>`
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
  padding: 2em;
  border-radius: 1em;
  background: white;
  max-width: 400px;
`;

const Filebox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  width: 150px;
  height: 70px;
  justify-content: space-between;
  > label {
    &:hover {
      background-color: #dadada;
    }
    text-align: center;
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
  margin: 1em;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: column;

    align-items: center;
  }
`;

const Input = styled.input`
  margin-left: auto;
  @media only screen and (max-width: 600px) {
    margin-left: 0;
  }
`;
const Password = styled.div`
  margin-left: auto;
  @media only screen and (max-width: 600px) {
    margin-left: 0;
  }
`;

const WithdrawalDiv = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

interface Props {
  setSettingModal: Dispatch<SetStateAction<boolean>>;
}
function SettingModal({ setSettingModal }: Props) {
  const [file, setFile] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkpw, setCheckpw] = useState("");
  const [isCheck, setIsCheck] = useState(true);
  const [Withdrawal, setWithdrawal] = useState(false);

  const onClickProfile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const objectURL = URL.createObjectURL(e.target.files[0]);
    setFile(objectURL);
  };

  useEffect(() => {}, [checkpw]);

  const onChangeValue = (
    str: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (str) {
      case "nickname":
        setNickname(e.target.value);
        break;
      case "pw":
        setPassword(e.target.value);
        break;
      case "checkpw":
        if (password === e.target.value) {
          setIsCheck(true);
        } else {
          setIsCheck(false);
        }

        setCheckpw(e.target.value);
    }
  };

  return (
    <Outer>
      <Modal>
        {Withdrawal ? (
          <WithdrawalDiv>
            <div>회원님의 모든 정보가 삭제됩니다.</div>
            <div>정말 탈퇴 하시겠습니까?</div>
            <div>탈퇴하시려면 회원탈퇴를 입력해주세요.</div>
            <input placeholder="회원탈퇴"></input>
            <Set>
              <button>회원탈퇴</button>
              <button
                onClick={() => {
                  setWithdrawal(false);
                  setSettingModal(false);
                }}
              >
                취소
              </button>
            </Set>
          </WithdrawalDiv>
        ) : (
          <>
            <Set>
              <div>프로필 사진</div>
              <Filebox>
                <label htmlFor="fileUpload">업로드</label>
                <input
                  type="file"
                  id="fileUpload"
                  multiple={false} //파일 다중선택 가능
                  onChange={onClickProfile}
                />
                {file === "" ? (
                  <StyledFile src={""} />
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
              <Password>기존 비번sljelfkjwl</Password>
            </Set>
            <Set>
              <div>새 비밀번호</div>
              <Input
                value={password}
                onChange={(e) => onChangeValue("pw", e)}
              />
            </Set>
            <Set>
              <div>새 비밀번호 확인</div>
              <Input
                value={checkpw}
                onChange={(e) => onChangeValue("checkpw", e)}
              />
            </Set>
            <Set>
              <Password
                style={isCheck ? { display: "none" } : { color: "red" }}
              >
                비밀번호가 다릅니다.
              </Password>
            </Set>
            <Set style={{ justifyContent: "space-around" }}>
              {/* TODO */}
              <div onClick={() => setSettingModal(false)}>돌아가기</div>
              <div>수정하기</div>
              <div onClick={() => setWithdrawal(true)}>회원탈퇴</div>
            </Set>
          </>
        )}
      </Modal>
    </Outer>
  );
}

export default SettingModal;
