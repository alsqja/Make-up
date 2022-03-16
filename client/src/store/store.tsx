import { atom } from "recoil";

export const isLogin = atom<boolean>({
  key: 'isLogin',
  default: false
})

export const userId = atom<number>({
  key: 'userId',
  default: -1
})