import styled from "styled-components";

const HeaderOuter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: -2px -2px 4px #ececec,
    3px 3px 8px #b8b8b8;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
`

const Container = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;
  /* transition: all 0.5s; */
  @media only screen and (max-width: 1200px) {
    width: 768px;
  }

  @media only screen and (max-width: 768px) {
    width: 500px;
  }

  @media only screen and (max-width: 501px) {
    width: 360px;
    column-gap: 16px;
    grid-template-columns: repeat(6, 1fr);
  }
`

export const Header = () => {
  return (
    <HeaderOuter>
      <Container>
        Header
      </Container>
    </HeaderOuter>
  )
}