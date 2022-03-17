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
    nickname: '민범',
    email: 'alsqja2626',
    profile: 'https://mblogthumb-phinf.pstatic.net/MjAxNzA4MDVfNTMg/MDAxNTAxOTQwMTAyNDQw.eDNVtT3Xgcwa_x5_iJi1Of9KWamrnOKJpv_WjY_MsLcg.lguIejrJmapI8LCvMV0KdhPWBo3OHyD9rbrG0lAiQRcg.PNG.juju7913/image.png?type=w800',
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

    nickname: '윤정',
    email: 'yjlim9898',
    profile: 'https://cdn.discordapp.com/attachments/932434608119771198/952872711208706068/IMG_4022.png',

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

    content: 'dummy1',
    files: ['https://dimg.donga.com/wps/SPORTS/IMAGE/2021/04/21/106524926.1.jpg', 'https://mblogthumb-phinf.pstatic.net/MjAxNzA4MDVfNTMg/MDAxNTAxOTQwMTAyNDQw.eDNVtT3Xgcwa_x5_iJi1Of9KWamrnOKJpv_WjY_MsLcg.lguIejrJmapI8LCvMV0KdhPWBo3OHyD9rbrG0lAiQRcg.PNG.juju7913/image.png?type=w800'],

    user: dummyUser[1],
    comments: [dummyComments[1]],
    likes: [dummyLikes[0]],
  },
  {
    id: 1,

    content: 'dummy2',
    files: ['https://pds.joins.com/news/component/htmlphoto_mmdata/202108/14/htm_20210814121233668878.JPG', 'https://image.fmkorea.com/files/attach/new/20200705/486616/1952607757/2975811322/20a74378d2616a1e5c0d15b9e6ff04e7.jpg'],

    user: dummyUser[2],
    comments: [dummyComments[0], dummyComments[2]],
    likes: [],
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
    files: ['https://mblogthumb-phinf.pstatic.net/MjAxNzA4MDVfNTMg/MDAxNTAxOTQwMTAyNDQw.eDNVtT3Xgcwa_x5_iJi1Of9KWamrnOKJpv_WjY_MsLcg.lguIejrJmapI8LCvMV0KdhPWBo3OHyD9rbrG0lAiQRcg.PNG.juju7913/image.png?type=w800', 'https://cdn.topstarnews.net/news/photo/202104/869240_604006_560.jpg'],
    user: dummyUser[0],
    comments: [],
    likes: []
  },
]

export const defaultProfile = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEHBhAIBw8OFRUODw8QEBMSEBAPEA4SFhMWFhYSFx8YHTQgGRoxHRMTITEhJSkuLi4uFx8zODMsNyktLisBCgoKDg0OGhAQGjYlHyU1Ky0tKy0wKy0tLi0tLS0rLS0tLS0tLS0tKy03NystLSsrNS0tLS03Kzc3LS0rLS0tN//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QAMxABAAECAwUFBwQDAQAAAAAAAAECAwQRcQUhMTJBEhNRYXI0gZGhsdHhIkKSwSMzghT/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAwIBBAX/xAAcEQEBAQEBAQEBAQAAAAAAAAAAAQIRAzESQSH/2gAMAwEAAhEDEQA/AOsAe980AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHvHgscLs/d27/8fu5bx2S1At2qrk5W4mdISKdn3J6RGs/ZbUxFMZUxlo9Y/ak84qJ2fcjhETpLRcs1Wv8AZTMfRfExnGUn7L5xzotMVs+Ko7VjdPh0nTwVkx2Zyno3L1O5seAOuAAAAAAAAAAAAAAAAAAANlm33t2KI6yCds3DZR39f/Pl5rAiMoyjoJW9Xk5ABx0AAQto4bt0d7Rxjj5wmhLws7HOjdirXc36qI8d2ktKzzgAAAAAAAAAAAAAAAAACZsunPE5+FMz/X9oabsqcsRMeNM/WHNfHc/VqAkuAAAAAAq9rU5XqavGnL4T+UFYbWn/ACUx5T9fwr1c/ENfQB1wAAAAAAAAAAAAAAAAbsJc7rEU1T45TpO5pAjohFwGI7612auNO6fOPFKRv+PRL0AAAABoxl/uLOccZ3U/cLeK3H3O8xU5dP0/D85oz14tHnt6AAAAAAAAAAAAAAAAAAAAztXJtVxXRxhcYXFU4iMuE9Y+ykexOW+HLOu51x0IqLW0K7cZVZVa8fik07Tp/dTV7piWPzVZuJwgztOn9tNXvyhHu7Qrr3UZU6b5c/NLuLDEYmmxT+rj0jrKnvXZvXO3X+IjwYTPanOp4pM8T1roA6yAAAAAAAAAAAAAAAAAAAAAADKmmauWJnSM2cWK54UV/wAZBqG2cPXHGiv+MsJomnmiY1jIOMQAAAAAAAAAAAAAAAAAAABnatTdq7NuM/6WVjZ0U772+fDp+XLZHZm1W0W5uTlREzpCVb2dVVvrmI+crSmmKYypiI03PWLtSec/qJb2dRTzZz78o+TfRYoo5aafhvbBztakkAHHQAGFVmmvmppn3Q0V7Poq4RMaT90oOlkqsubNmN9uqJ13SiXbNVqcrkTH0XxMZxlLU1WLiOdFtf2fTXvt/pn5K69Yqs1ZXI0npLcsqdzY1AOuAAAAAAAAAADdhcPOIudmOEcZ8GleYSz3NiKevGdXNXjWc9rOzaizR2bcfedWYJLAAAAAAAAAAAADyuiK6ezXGcS9AU2Mwv8A56s6eWeHl5Iy/vW4u2poq6/LzUMx2ZynpuUzeo7zyvAGmQAAAAAAAHtPNGroXPU80aw6FjanmAMKAAAAAAAAAAAAAACixW7E1+qfqvVHi/aq/VLeGPT40gNpAAAAAAAAMqeaNYdA5+nmjWHQMbU8wBhQAAAAAAAAAAAAAAUeL9qr9UrxR4v2qv1S3hj0+NIDaQAAAAAAADKnmjWHQOfo541h0DG1PMAYUAAAAAAAAAAAAAAFHi/aq/VK8UeL9qr9Ut4Y9PjSA2kAAAAAAAAyo541h0AMbU8wBhQAAAAAAAAAAAAAAUeL9qr9Ug3hj0+NIDaQAAAD/9k='

export const dummyFollow: IPostUser[] = [
  {
    id: 0,
    nickname: 'dummy1',
    profile: defaultProfile
  },
  {
    id: 1,
    nickname: 'dummy112',
    profile: 'https://blog.kakaocdn.net/dn/dWiOE6/btq9fk342GU/hjMrPIFxsYqPZtJmNBaXd1/img.jpg'
  },
  {
    id: 2,
    nickname: 'dummy1231',
    profile: defaultProfile
  },
  {
    id: 3,
    nickname: 'dummy1141',
    profile: 'https://blog.kakaocdn.net/dn/dWiOE6/btq9fk342GU/hjMrPIFxsYqPZtJmNBaXd1/img.jpg'
  },
  {
    id: 4,
    nickname: 'dummy1514',
    profile: defaultProfile
  },
  {
    id: 5,
    nickname: 'dummy1134',
    profile: defaultProfile
  },
  {
    id: 6,
    nickname: 'du1455435mmy1',
    profile: defaultProfile
  },
  {
    id: 7,
    nickname: 'dummy341541',
    profile: defaultProfile
  },
  {
    id: 8,
    nickname: 'dummy112451t',
    profile: 'https://blog.kakaocdn.net/dn/dWiOE6/btq9fk342GU/hjMrPIFxsYqPZtJmNBaXd1/img.jpg'
  },
  {
    id: 9,
    nickname: 'dummy1155314',
    profile: defaultProfile
  },
  {
    id: 10,
    nickname: 'dummy1231251',
    profile: defaultProfile
  },
  {
    id: 11,
    nickname: 'dummy182456',
    profile: defaultProfile
  },
  {
    id: 12,
    nickname: 'dummy114545',
    profile: 'https://blog.kakaocdn.net/dn/dWiOE6/btq9fk342GU/hjMrPIFxsYqPZtJmNBaXd1/img.jpg'
  },
  {
    id: 13,
    nickname: 'dummy1167634',
    profile: defaultProfile
  },
  {
    id: 14,
    nickname: 'dummy13475361',
    profile: defaultProfile
  },
  {
    id: 15,
    nickname: 'dummy114514',
    profile: defaultProfile
  },
  {
    id: 16,
    nickname: 'dummy13461',
    profile: defaultProfile
  },
  {
    id: 17,
    nickname: 'dummy1615431',
    profile: defaultProfile
  },
  {
    id: 18,
    nickname: 'dummy13261',
    profile: defaultProfile
  },
  {
    id: 19,
    nickname: 'dummy11436135',
    profile: defaultProfile
  },
  {
    id: 20,
    nickname: 'dummy11357',
    profile: defaultProfile
  },
  {
    id: 21,
    nickname: 'dummy1641',
    profile: defaultProfile
  },
  {
    id: 22,
    nickname: 'dummy14531',
    profile: defaultProfile
  },
  {
    id: 23,
    nickname: 'dummy4611',
    profile: 'https://blog.kakaocdn.net/dn/dWiOE6/btq9fk342GU/hjMrPIFxsYqPZtJmNBaXd1/img.jpg'
  },
  {
    id: 24,
    nickname: 'dummy116431',
    profile: defaultProfile
  },
  {
    id: 25,
    nickname: 'dummy1324',
    profile: defaultProfile
  },
  {
    id: 26,
    nickname: 'dummy1145',
    profile: defaultProfile
  },
  {
    id: 27,
    nickname: 'dummy116',
    profile: defaultProfile
  },
  {
    id: 28,
    nickname: 'dummy45131',
    profile: defaultProfile
  },
  {
    id: 29,
    nickname: 'dummy2134511',
    profile: defaultProfile
  },
  {
    id: 30,
    nickname: 'dumm1425451y1',
    profile: defaultProfile
  },
]