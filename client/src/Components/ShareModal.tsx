import { useEffect } from "react";
import styled from "styled-components";

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
declare global {
  interface Window {
    Kakao: any;
  }
}
const { Kakao } = window;

function ShareModal() {
  //  Kakao.Link.sendDefault({objectType:"text",
  // text:"test~~~~~~~~~",
  // link:{
  //     mobileWebUrl:"",
  //     webUrl:""
  // }})
  //   useEffect(() => {
  //     const script = document.createElement('script')
  //     script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
  //     script.async = true

  //     document.body.appendChild(script)

  //     return () => {
  //       document.body.removeChild(script)
  //     }
  //   }, [])

  useEffect(() => {
    window.Kakao.init("16fad417e918bf309d5f5c23ca6c6e18");
    console.log(window.Kakao.isInitialized());
  }, []);

  //   useEffect(() => {
  //     sendKakaoMessage()
  //   }, [])
  const sendKakaoMessage = () => {
    // if (window.Kakao) {
    //   const kakao = window.Kakao;

    //   // 중복 initialization 방지
    //   if (!kakao.isInitialized()) {
    //     // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
    //     kakao.init("087e960d163b882e07023e0a3689d86f");
    //   }

    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "title입니다",
        description: "descriptioin",
        imageUrl: "메인 이미지 주소",
        link: {
          webUrl: "공유할 웹 링크 주소",
          mobileWebUrl: "공유할 웹 링크 주소",
        },
      },
    });
  };

  return (
    <Outer>
      <Modal>
        공유하기
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={sendKakaoMessage}
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
