import styled from "styled-components";

const Outer = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
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

  padding: 50px 0;
`

const Title = styled.div`
  grid-column: span 12;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
`

const ImgBox = styled.div`
  grid-column: 2 / span 10;
  display: flex;
  justify-content: center;
  align-items: center;
  .gif {
    width: 500px;
  }
`

const StyledDiv = styled.div`
  grid-column: span 12;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Loading = () => {

  return (
    <Outer>
      <Container>
        <Title>화장 중 입니다</Title>
        <ImgBox>
          <img className="gif" src="https://c.tenor.com/-QTgc3X6G1gAAAAC/make-up-powder.gif" alt=""/>
        </ImgBox>
        <StyledDiv>3 ~ 5 분 정도 소요될 수 있습니다</StyledDiv>
      </Container>
    </Outer>
  )
}