import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import ImageView from "../Components/ImageView";
import { serverUrl } from "../Dummys/dummy";

const Container = styled.div`
  font-family: "SUIT-Light";
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 48px;
  /* background-color: #fcfcfc; */
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


export const CreateResultPost = () => {

  const location = useLocation().pathname.split("/")[2];
  const [contents, setcontents] = useState("");
  const uuid = location;
  const [files, setFiles] = useState<string[]>([
    `https://bboshap.s3.ap-northeast-2.amazonaws.com/${uuid}/source/source.png`,
    `https://bboshap.s3.ap-northeast-2.amazonaws.com/${uuid}/target/target.png`,
    `https://bboshap.s3.ap-northeast-2.amazonaws.com/${uuid}/result/result.png`
  ])
  const [filePage, setFilePage] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    setFiles([
      `https://bboshap.s3.ap-northeast-2.amazonaws.com/${uuid}/source/source.png`,
      `https://bboshap.s3.ap-northeast-2.amazonaws.com/${uuid}/target/target.png`,
      `https://bboshap.s3.ap-northeast-2.amazonaws.com/${uuid}/result/result.png`
    ])
  }, [uuid])

  const DelBtn = () => {
    setFiles(files.filter((el, idx) => idx !== filePage))
    if (filePage === files.length - 1) {
      setFilePage(filePage - 1)
    }
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcontents(e.target.value);
  };

  const createPostFunc = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    axios
      .post(
        `${serverUrl}post`,
        {
          content: contents,
          files: files.map((str) => {
            return str.split('.com/')[1]
          })
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(() => {
        navigate('/')
      })
      .catch((err) => console.log(err))
  }

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
      <ImageView
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