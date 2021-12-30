import styled from 'styled-components';
import patternBgUrl from './stories/assets/pattern-bg.png';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderBg = styled.div`
  background: url(${patternBgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  height: 280px;
  width: 100vw;
`;

const HeaderContainer = styled.div`
  position: fixed;
  height: 350px;
  width: 80vw;
  left: 50%;
  transform: translateX(-50%);
  top: 33px;
  background-color: grey;
`;

const Map = styled.div`
  flex-grow: 1;
  background-color: yellow;
`;

function App() {
  return (
    <Container>
      <HeaderBg />
      <HeaderContainer>
        
      </HeaderContainer>
      <Map />
    </Container>
  );
}

export default App;
