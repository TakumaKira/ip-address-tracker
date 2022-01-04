import React from 'react';
import styled from 'styled-components';
import loadMap from '../services/map';
import MapError from './MapError';
import locationIcon from './assets/icon-location.svg';

export const MapContainer = styled.div`
  background-color: #e8eaed;
`;

const Map = ({ className }) => {
  const mapContainer = React.useRef(null);
  const [ hasError, setHasError ] = React.useState(false);

  React.useEffect(() => {
    loadMap(mapContainer.current, -34.397, 150.644, 8, locationIcon)
      .catch(err => {
        setHasError(true);
      });
  }, []);

  return(!hasError
    ? <MapContainer ref={mapContainer} className={className}></MapContainer>
    : <MapError className={className} />
  )
};

export default Map;