import { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { v4 } from "uuid";
import { dummyUser } from "../Dummys/dummy";
import { notify } from "../store/store";

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

  const [notification, setNotification] = useRecoilState(notify)

  const notifyHandler = (message: string) => {
    const uuid = v4()
    setTimeout(() => {
      setNotification([...notification, {uuid, message, dismissTime: 2000}])
    }, 0)
    setTimeout(() => {
      setNotification([])
    }, 2000)
  }

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

  const copyClipboard = async (
    text: string,
    successAction?: () => void,
    failAction?: () => void,
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      successAction && successAction();
    } catch (err) {
      failAction && failAction();
    }
  };

  const copyUrl = () => {
    copyClipboard(
      location,
      () => {
        // 성공했을 경우 Toast 메시지 팝업
        notifyHandler('클립보드에 복사되었습니다')
      },
      () => {
        // 실패했을 경우 Toast 메시지 팝업
        notifyHandler('다시 시도해주세요')
      },
    );
  };

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
          onClick={copyUrl}
        >
          <img
            src={`${process.env.PUBLIC_URL}/share.png`}
            alt="share"
            style={{ width: "50px" }}
          />
          링크복사
        </div>
      </Modal>
    </Outer>
  );
}

export default ShareModal;
