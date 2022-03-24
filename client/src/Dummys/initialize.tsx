declare global {
  interface Window {
    Kakao: any;
  }
}

const { Kakao } = window;

export function kakaoInit() {
  Kakao.init('59c91faa80cd1a5f683e42a8e11a4654');
}