import styled from 'styled-components';
import config from './config.json';
import patternBgUrl from './stories/assets/pattern-bg.png';
import Header from './stories/Header';
import Map from './stories/Map';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderBg = styled.div`
  background: url(${patternBgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: ${config.responsiveSplitWidth - 1}px) {
    height: 300px;
  }
  @media screen and (min-width: ${config.responsiveSplitWidth}px) {
    height: 280px;
  }
  width: 100vw;
`;

const StyledHeader = styled(Header)`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 33px;
`;

const StyledMap = styled(Map)`
  flex-grow: 1;
`;

function App() {
  return (
    <Container>
      <HeaderBg />
      <StyledMap />
      <StyledHeader />
    </Container>
  );
}

export default App;
