import React from 'react';
import styled from 'styled-components';
import config from './config.json';
import getLocation from './services/location';
import patternBgUrl from './stories/assets/pattern-bg.png';
import Header from './stories/Header';
import Map from './stories/Map';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const HeaderBg = styled.div`
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

export const StyledHeader = styled(Header)`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 33px;
`;

export const StyledMap = styled(Map)`
  flex-grow: 1;
`;

function App() {
  const [ location, setLocation ] = React.useState({});
  const [ locationError, setLocationError ] = React.useState(false);

  React.useEffect(() => {
    (async function() {
      try {
        const newLocation = await getLocation();
        setLocation(newLocation);
      } catch (error) {
        setLocationError(true);
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container>
      <HeaderBg />
      <StyledMap
        lat={location.lat}
        lng={location.lng}
        locationError={locationError}
      />
      <StyledHeader
        ip={location.ip}
        isp={location.isp}
        city={location.city}
        country={location.country}
        postalCode={location.postalCode}
        region={location.region}
        timezone={location.timezone}
        setLocation={setLocation}
        setLocationError={setLocationError}
      />
    </Container>
  );
}

export default App;
