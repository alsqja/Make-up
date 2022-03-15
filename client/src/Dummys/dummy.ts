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
  likes: IPostLike[]
}

export const dummyUser: IUserInfo[] = [
  {
    id: 0,
    nickname: '민범',
    email: 'alsqja2626',
    profile: 'https://w.namu.la/s/f9fb14f3584bbbcb425763f3c3de7d2a8e511824bfc210144d63397a2e763a36571bc4f08a7da98895d794f1c97d6eed552ef8fc637bdca06631b00e7a45d48f597abc608c412ca8bbc3ce485421ef60d4a30ebd8a9c44015c8781d21223a4da7a871f39a25c6a3fff448ed887b75c78',
    following: 333,
    follower: 400
  },
  {
    id: 1,
    nickname: '민석',
    email: 'kms9887',
    profile: 'https://cdn.discordapp.com/attachments/952465140329087036/952465605175418941/20220205_150417.jpg',
    following: 5124,
    follower: 13
  },
  {
    id: 2,
    nickname: '윤정',
    email: 'yjlim9898',
    profile: 'https://cdn.discordapp.com/attachments/932434608119771198/952872711208706068/IMG_4022.png',
    following: 425,
    follower: 378
  },
  {
    id: 3,
    nickname: '준영',
    email: 'qawesdxc',
    profile: 'https://cdn.discordapp.com/attachments/951444089759477803/952466312876154901/IMG_0143.jpg',
    following: 452,
    follower: 512
  },
]

export const dummyLikes: IPostLike[] = [
  {
    id: 0,
    postId: null,
    commentId: 0,
    userId: 0
  },
  {
    id: 1,
    postId: 0,
    commentId: 1,
    userId: 0
  }
]

export const dummyComments: IComment[] = [
  {
    id: 0,
    content: '댓글1',
    user: dummyUser[0],
    likes: [dummyLikes[0]]
  },
  {
    id: 1,
    content: '댓글2',
    user: dummyUser[1],
    likes: []
  },
  {
    id: 2,
    content: '댓글3',
    user: dummyUser[2],
    likes: []
  },
]

export const dummyPosts: IPost[] = [
  {
    id: 0,
    content: 'dummy1',
    files: ['https://dimg.donga.com/wps/SPORTS/IMAGE/2021/04/21/106524926.1.jpg', 'https://mblogthumb-phinf.pstatic.net/MjAxNzA4MDVfNTMg/MDAxNTAxOTQwMTAyNDQw.eDNVtT3Xgcwa_x5_iJi1Of9KWamrnOKJpv_WjY_MsLcg.lguIejrJmapI8LCvMV0KdhPWBo3OHyD9rbrG0lAiQRcg.PNG.juju7913/image.png?type=w800'],
    user: dummyUser[1],
    comments: [dummyComments[1]],
    likes: [dummyLikes[0]]
  },
  {
    id: 1,
    content: 'dummy2',
    files: ['https://pds.joins.com/news/component/htmlphoto_mmdata/202108/14/htm_20210814121233668878.JPG', 'https://image.fmkorea.com/files/attach/new/20200705/486616/1952607757/2975811322/20a74378d2616a1e5c0d15b9e6ff04e7.jpg'],
    user: dummyUser[2],
    comments: [dummyComments[0], dummyComments[2]],
    likes: []
  },
  {
    id: 2,
    content: 'dummy3',
    files: ['https://cdn.topstarnews.net/news/photo/202104/869240_604006_560.jpg', 'https://blog.kakaocdn.net/dn/dWiOE6/btq9fk342GU/hjMrPIFxsYqPZtJmNBaXd1/img.jpg'],
    user: dummyUser[3],
    comments: [],
    likes: []
  },
  {
    id: 3,
    content: 'dummy4',
    files: ['https://w.namu.la/s/f9fb14f3584bbbcb425763f3c3de7d2a8e511824bfc210144d63397a2e763a36571bc4f08a7da98895d794f1c97d6eed552ef8fc637bdca06631b00e7a45d48f597abc608c412ca8bbc3ce485421ef60d4a30ebd8a9c44015c8781d21223a4da7a871f39a25c6a3fff448ed887b75c78', 'https://cdn.topstarnews.net/news/photo/202104/869240_604006_560.jpg'],
    user: dummyUser[0],
    comments: [],
    likes: []
  },
]