import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

interface IImgProps {
  src: string;
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
`;

export const StyledFile = styled.div<IImgProps>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => `'${props.src}'`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 60%;
  height: 100%;
  background-color: #f3f3f3;
  &:hover {
    border: 2px solid var(--main-color);
  }
`;

const BtnContain = styled.div`
  width: 20%;
  font-size: 50px;
  color: #666;
  > .left_btn {
    width: 100%;
  }
  > .right_btn {
    width: 100%;
  }
  &:hover {
    > .left_btn {
      opacity: 0.5;
    }
    > .right_btn {
      opacity: 0.5;
    }
  }
`;
interface IFileTypes {
  //file 타입 지정
  url: string;
  id: number;
}
interface IProps {
  files: IFileTypes[];
  setFiles: Dispatch<SetStateAction<IFileTypes[]>>;
  filePage: number;
  setFilePage: Dispatch<SetStateAction<number>>;
  setInputFile: Dispatch<SetStateAction<File[]>>;
  inputFile: File[]
}

const DragDrop = ({ files, setFiles, filePage, setFilePage, setInputFile, inputFile }: IProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false); //드래그
  const dragRef = useRef<HTMLLabelElement | null>(null); //드래그 이벤트 감지하는 ref 참조 변수(label 태그에 들어감)
  const fileId = useRef<number>(0); //선택한 파일들의 id

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: IFileTypes[] = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        const objectURL = URL.createObjectURL(file);
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            url: objectURL,
          },
        ];
      }
      setInputFile([...inputFile, ...e.target.files])
      setFiles(tempFiles);
      if (files.length >= 1) setFilePage(files.length);
    },
    [files, inputFile, setFilePage, setFiles, setInputFile]
  );

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <Container>
      <BtnContain>
        <FaChevronLeft
          className="left_btn"
          onClick={(e) => {
            e.stopPropagation();
            if (!files[filePage - 1].url) {
              return;
            }
            setFilePage(filePage - 1);
          }}
          style={filePage === 0 ? { display: "none" } : {}}
        />
      </BtnContain>
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        multiple={true} //파일 다중선택 가능
        onChange={onChangeFiles}
      />

      <Label
        className={isDragging ? "DragDrop-File-Dragging" : "DragDrop-File"} //드래그 중인지 아닌지 구별
        htmlFor="fileUpload"
        ref={dragRef}
      >
        {files.length !== 0 ? (
          <StyledFile src={files[filePage].url} />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            클릭하여 사진 추가
          </div>
        )}
      </Label>
      <BtnContain>
        {files.length <= 1 ? null : (
          <FaChevronRight
            className="right_btn"
            onClick={(e) => {
              e.stopPropagation();
              if (!files[filePage + 1].url) {
                return;
              }
              setFilePage(filePage + 1);
            }}
            style={filePage === files.length - 1 ? { display: "none" } : {}}
          />
        )}
      </BtnContain>
    </Container>
  );
};

export default DragDrop;
