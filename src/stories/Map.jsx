import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import MapClass from '../services/map';
import locationIcon from './assets/icon-location.svg';
import MapError from './MapError';

export const REFETCH_TIME = 1000;

export const MapContainer = styled.div`
  background-color: #e8eaed;
`;

const Map = ({ lat, lng, className }) => {
  const mapContainer = React.useRef(null);
  const mapObj = React.useRef(null);
  const [hasError, setHasError] = React.useState(false);
  const [errorFetchedChecker, setErrorFetchedChecker] = React.useState(false);

  React.useEffect(() => {
    if (mapObj.current) {
      return;
    }
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return;
    }
    mapObj.current = new MapClass(mapContainer.current, lat, lng, 8, locationIcon);
    mapObj.current.load()
      .then(() => setHasError(false))
      .catch(err => {
        setHasError(true);
        mapObj.current = null;
        setTimeout(() => setErrorFetchedChecker(c => !c), REFETCH_TIME);
      });
  }, [lat, lng, errorFetchedChecker]);

  React.useEffect(() => {
    if (!mapObj.current || typeof lat !== 'number' || typeof lng !== 'number') {
      return;
    }
    mapObj.current.setGeo(lat, lng);
  }, [lat, lng]);

  return(!hasError
    ? <MapContainer ref={mapContainer} className={className}></MapContainer>
    : <MapError className={className} />
  )
};

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  className: PropTypes.string,
};

export default Map;