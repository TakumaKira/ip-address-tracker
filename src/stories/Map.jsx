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
  const { lat, lng, className, locationError } = props;
  const mapContainer = React.useRef(null);
  const mapObj = React.useRef(null);
  const [mapError, setMapError] = React.useState(false);

  React.useEffect(() => {
    if (mapObj.current) {
      return;
    }
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return;
    }
    mapObj.current = new MapClass(mapContainer.current, lat, lng, 8, locationIcon);
    mapObj.current.load()
      .then(() => setMapError(false))
      .catch(err => {
        setMapError(true);
        mapObj.current = null;
      });
  }, [lat, lng, locationError]);

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
};

export default Map;