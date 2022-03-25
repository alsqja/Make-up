import React, {
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

interface IProps {
  files: string[];
  setFiles: Dispatch<SetStateAction<string[]>>;
  filePage: number;
  setFilePage: Dispatch<SetStateAction<number>>;
}

const ImageView = ({
  files,
  setFiles,
  filePage,
  setFilePage,
}: IProps) => {

  return (
    <Container>
      <BtnContain>
        <FaChevronLeft
          className="left_btn"
          onClick={(e) => {
            e.stopPropagation();
            if (!files[filePage - 1]) {
              return;
            }
            setFilePage(filePage - 1);
          }}
          style={filePage === 0 ? { display: "none" } : {}}
        />
      </BtnContain>
      <StyledFile src={files[filePage]} />
      <BtnContain>
        {files.length <= 1 ? null : (
          <FaChevronRight
            className="right_btn"
            onClick={(e) => {
              e.stopPropagation();
              if (!files[filePage + 1]) {
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

export default ImageView;
