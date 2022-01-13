import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import config from '../config.json';
import MapClass from '../services/map';
import locationIcon from './assets/icon-location.svg';
import Error from './Error';

export const MapContainer = styled.div`
  background-color: #e8eaed;
`;

const Map = (props) => {
  const {
    lat,
    lng,
    className,
    locationError,
    mapError,
    setMapError,
  } = props;
  const mapContainer = React.useRef(null);
  const mapObj = React.useRef(null);

  React.useEffect(() => {
    if (mapObj.current) {
      return;
    }
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return;
    }
    if (mapError) {
      return;
    }
    mapObj.current = new MapClass(mapContainer.current, lat, lng, 8, locationIcon);
    mapObj.current.load()
      .then(() => setMapError(false))
      .catch(err => {
        setMapError(true);
        mapObj.current = null;
      });
  }, [lat, lng, locationError, mapError, setMapError]);

  React.useEffect(() => {
    if (!mapObj.current || typeof lat !== 'number' || typeof lng !== 'number') {
      return;
    }
    mapObj.current.setGeo(lat, lng);
  }, [lat, lng]);

  return(
    <>
      <MapContainer
        ref={mapContainer}
        className={className}
        style={{display: `${(!mapError && !locationError) ? 'block' : 'none'}`}}
      />
      {(mapError || locationError) &&
        <Error
          className={className}
          message={locationError ? config.labels.IPify_SERVER_IS_NOT_AVAILABLE : config.labels.GOOGLE_MAPS_SERVER_IS_NOT_AVAILABLE}
        />
      }
    </>
  )
};

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  className: PropTypes.string,
  locationError: PropTypes.bool,
  mapError: PropTypes.bool,
  setMapError: PropTypes.func,
};

export default Map;