import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { dummyUser } from "../Dummys/dummy";

const Outer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 300px;
  height: 100px;
  border-radius: 1em;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

interface IProps {
  setShareModal: Dispatch<SetStateAction<boolean>>;
}

function ShareModal({setShareModal}: IProps) {
  const location = window.location.href

  const { Kakao } = window;

  const handleKakao = () => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "[뽀 #me]",
        description: "내가 좋아하는 연예인의 화장을 내 얼굴에 적용하고 친구들에게 자랑하세요!",
        imageUrl: dummyUser[0].profile,
        link: {
          webUrl: location,
          mobileWebUrl: location,
        },
      },
    });
  }

  return (
    <Outer onClick={() => {
      setShareModal(false)
    }}>
      <Modal onClick={(e) => {
        e.stopPropagation();
      }}>
        공유하기
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => {
            handleKakao()
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/kakao.png`}
            alt="kakao"
            style={{ width: "50px" }}
          />
          카카오톡
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/share.png`}
            alt="share"
            style={{ width: "50px" }}
          />
          링크
        </div>
      </Modal>
    </Outer>
  );
}

export default ShareModal;
