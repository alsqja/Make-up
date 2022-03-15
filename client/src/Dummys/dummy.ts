export interface IUserInfo {
  id: number;
  nickname: string;
  email: string;
  profile: string;
  following: number;
  follower: number;
}

export interface IPostUser {
  id: number;
  nickname: string;
  profile: string;
}

export interface IPostLike {
  id: number;
  postId?: number | null;
  commentId?: number | null;
  userId: number;
}

export interface IComment {
  id: number;
  content: string;
  user: IPostUser;
  likes: IPostLike[];
}

export interface IPost {
  id: number;
  content: String;
  files: string[];
  user: IPostUser;
  comments: IComment[];
  likes: IPostLike[];
}

export const dummyUser: IUserInfo[] = [
  {
    id: 0,
    nickname: "민범",
    email: "alsqja2626",
    profile:
      "https://w.namu.la/s/f9fb14f3584bbbcb425763f3c3de7d2a8e511824bfc210144d63397a2e763a36571bc4f08a7da98895d794f1c97d6eed552ef8fc637bdca06631b00e7a45d48f597abc608c412ca8bbc3ce485421ef60d4a30ebd8a9c44015c8781d21223a4da7a871f39a25c6a3fff448ed887b75c78",
    following: 333,
    follower: 400,
  },
  {
    id: 1,
    nickname: "민석",
    email: "kms9887",
    profile:
      "https://cdn.discordapp.com/attachments/952465140329087036/952465605175418941/20220205_150417.jpg",
    following: 5124,
    follower: 13,
  },
  {
    id: 2,
    nickname: "윤정",
    email: "yjlim9898",
    profile:
      "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7bcf35ce-aaa9-4f83-8ef4-3bcaaed8a896/%E1%84%82%E1%85%A1.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220313T071443Z&X-Amz-Expires=86400&X-Amz-Signature=472c9abbfef7e4e4d7609df26c8cabc6149dd4399353fd0c9f8e4c5a3609f335&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E1%2584%2582%25E1%2585%25A1.jpeg%22&x-id=GetObject",
    following: 425,
    follower: 378,
  },
  {
    id: 3,
    nickname: "준영",
    email: "qawesdxc",
    profile:
      "https://cdn.discordapp.com/attachments/951444089759477803/952466312876154901/IMG_0143.jpg",
    following: 452,
    follower: 512,
  },
];

export const dummyLikes: IPostLike[] = [
  {
    id: 0,
    postId: null,
    commentId: 0,
    userId: 0,
  },
  {
    id: 1,
    postId: 0,
    commentId: 1,
    userId: 0,
  },
];

export const dummyComments: IComment[] = [
  {
    id: 0,
    content: "댓글1",
    user: dummyUser[0],
    likes: [dummyLikes[0]],
  },
  {
    id: 1,
    content: "댓글2",
    user: dummyUser[1],
    likes: [],
  },
  {
    id: 2,
    content: "댓글3",
    user: dummyUser[2],
    likes: [],
  },
];

export const createPost = (obj: IPost) => {
  dummyPosts.push(obj);
};

export const dummyPosts: IPost[] = [
  {
    id: 0,
    content: "dummy1",
    files: [
      "https://w.namu.la/s/f9fb14f3584bbbcb425763f3c3de7d2a8e511824bfc210144d63397a2e763a36571bc4f08a7da98895d794f1c97d6eed552ef8fc637bdca06631b00e7a45d48f597abc608c412ca8bbc3ce485421ef60d4a30ebd8a9c44015c8781d21223a4da7a871f39a25c6a3fff448ed887b75c78",
      "https://w.namu.la/s/5364250d393da1e171a89d596aa2c24e910276cab918bd235fdc05030265804c5667446c73cdbca74b650c86a7843e343e643fcc46ad19a80c64de54b5bcd510813a4a3c2670364ff110456b77265d49f974f5b9c13f7a8cdcd0342e5f34fecc564c6082a8c612168438b30e0d23a09d",
    ],
    user: dummyUser[1],
    comments: [dummyComments[1]],
    likes: [dummyLikes[0]],
  },
  {
    id: 1,
    content: "dummy2",
    files: [
      "https://w.namu.la/s/f9fb14f3584bbbcb425763f3c3de7d2a8e511824bfc210144d63397a2e763a36571bc4f08a7da98895d794f1c97d6eed552ef8fc637bdca06631b00e7a45d48f597abc608c412ca8bbc3ce485421ef60d4a30ebd8a9c44015c8781d21223a4da7a871f39a25c6a3fff448ed887b75c78",
      "https://w.namu.la/s/5364250d393da1e171a89d596aa2c24e910276cab918bd235fdc05030265804c5667446c73cdbca74b650c86a7843e343e643fcc46ad19a80c64de54b5bcd510813a4a3c2670364ff110456b77265d49f974f5b9c13f7a8cdcd0342e5f34fecc564c6082a8c612168438b30e0d23a09d",
    ],
    user: dummyUser[2],
    comments: [dummyComments[0], dummyComments[2]],
    likes: [],
  },
  {
    id: 2,
    content: "dummy2",
    files: [
      "https://w.namu.la/s/f9fb14f3584bbbcb425763f3c3de7d2a8e511824bfc210144d63397a2e763a36571bc4f08a7da98895d794f1c97d6eed552ef8fc637bdca06631b00e7a45d48f597abc608c412ca8bbc3ce485421ef60d4a30ebd8a9c44015c8781d21223a4da7a871f39a25c6a3fff448ed887b75c78",
      "https://w.namu.la/s/5364250d393da1e171a89d596aa2c24e910276cab918bd235fdc05030265804c5667446c73cdbca74b650c86a7843e343e643fcc46ad19a80c64de54b5bcd510813a4a3c2670364ff110456b77265d49f974f5b9c13f7a8cdcd0342e5f34fecc564c6082a8c612168438b30e0d23a09d",
    ],
    user: dummyUser[3],
    comments: [],
    likes: [],
  },
];
