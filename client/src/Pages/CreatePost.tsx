import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DragDrop from "../Components/DragDrop";
import { dummyUser, createPost } from "../Dummys/dummy";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Container = styled.div`
  font-family: "SUIT-Light";
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 48px;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
  justify-content: space-around;
`;

const Textarea = styled.textarea`
  font-family: "SUIT-Light";
  &:focus {
    outline: 1px solid #999;
    animation-name: border-focus;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    border: 0px;
  }
  @keyframes border-focus {
    from {
      border-radius: 0;
    }
    to {
      border-radius: 15px;
    }
  }
  resize: none;
  grid-column: 4 / span 7;
  width: 50%;
  height: 50px;
  padding: 10px;
  padding-left: 10px;
  border-radius: 5px;
  border: 0.5px solid #999;
  font-size: 16px;
`;

const Btn = styled.button`
  all: unset;
  font-size: 18px;
  margin-bottom: 8px;
  color: #ffffff;
  background-color: #979797;
  border: 1px solid #ebebeb;
  border-radius: 1em;
  width: 110px;
  height: 40px;
  text-align: center;
  font-weight: bold;
  :hover {
    background-color: var(--main-color);
    color: white;
    transition-duration: 0.3s;
  }
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

  const DelBtn = () => {
    const fileList = files.filter((el) => el.id !== filePage);
    fileList.forEach((el, index) => (el.id = index));
    if (filePage === files.length - 1) setFilePage(filePage - 1);
    setFiles(fileList);
  };

  useEffect(() => {}, [files]);

  return (
    <Container>
      <div
        style={{
          fontFamily: "HaenamFont",
          fontSize: "17px",
          marginTop: "2%",
          color: "#414141",
        }}
      >
        게시물 만들기
      </div>
      <DragDrop
        files={files}
        setFiles={setFiles}
        filePage={filePage}
        setFilePage={setFilePage}
      />
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          {files.length === 0 ? 0 : filePage + 1} / {files.length}
        </span>
        <span
          onClick={DelBtn}
          style={files.length === 0 ? { visibility: "hidden" } : {}}
        >
          <FaTrashAlt style={{ color: "#666", fontSize: "14px" }} />
        </span>
      </div>
      <Textarea
        placeholder="내용 입력"
        value={contents}
        onChange={onChangeText}
      />
      <Btn onClick={createPostFunc}>게시글 작성</Btn>
    </Container>
  );
}

export default CreatePost;
