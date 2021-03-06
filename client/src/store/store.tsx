import { atom } from "recoil";

export const isLogin = atom<boolean>({
  key: "isLogin",
  default: false,
});

export const followModal = atom<boolean>({
  key: "followModal",
  default: false,
});

export const followerModal = atom<boolean>({
  key: "followerModal",
  default: false,
});

export const userSettingModal = atom<boolean>({
  key: "userSettingModal",
  default: false,
});

export const following = atom<boolean>({
  key: "following",
  default: false,
});

export const hamberger = atom<boolean>({
  key: "hamberger",
  default: false,
});

interface INotify {
  uuid: string;
  message: string;
  dismissTime: number;
}

export const notify = atom<INotify[]>({
  key: "notify",
  default: []
})