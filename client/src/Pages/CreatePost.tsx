import React, { useState } from "react";
import styled from "styled-components";
import DragDrop from "../Components/DragDrop";
import { dummyUser, createPost } from "../Dummys/dummy";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 48px;
  background: #e9e9e9;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
`;

const Textarea = styled.textarea`
  background-color: white;
  border: none;
  resize: none;
  width: 50%;
  height: 50px;
  box-shadow: 1px 1px 2px #dddddd;
`;

interface IFileTypes {
  //file 타입 지정
  url: string;
  id: number;
}

function CreatePost() {
  const [files, setFiles] = useState<IFileTypes[]>([]); //파일 리스트
  const [filePage, setFilePage] = useState(0);
  const [contents, setcontents] = useState("");
  const navigate = useNavigate();
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcontents(e.target.value);
  };

  const createPostFunc = () => {
    const fileList = files.map((obj) => obj.url);
    const obj = {
      id: 10,
      content: contents,
      files: fileList,
      user: dummyUser[0],
      comments: [],
      likes: [],
    };
    createPost(obj);
    navigate("/");
  };

  return (
    <Container>
      <div>게시물 만들기</div>
      <DragDrop
        files={files}
        setFiles={setFiles}
        filePage={filePage}
        setFilePage={setFilePage}
      />
      <div>
        {files.length === 0 ? 0 : filePage + 1} / {files.length}
      </div>
      <Textarea
        placeholder="내용 입력"
        value={contents}
        onChange={onChangeText}
      />
      <button onClick={createPostFunc}>게시글 작성</button>
    </Container>
  );
}

export default CreatePost;
