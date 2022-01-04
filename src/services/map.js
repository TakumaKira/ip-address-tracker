import { Loader } from '@googlemaps/js-api-loader';
import PropTypes from 'prop-types';

export default function loadMap(elem, lat, lng, zoom, icon) {
  const promise = new Promise((resolve, reject) => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
  
    loader.load()
      .then(google => {
        const map = new google.maps.Map(elem, {
          center: { lat, lng },
          zoom,
          disableDefaultUI: true,
        });
        new google.maps.Marker({
          position: { lat, lng },
          map,
          icon
        });
        resolve();
      })
      .catch(err => {
        // Google Maps API takes care of handled errors inside API, so we need to take care of network errors
        console.error(err);
        reject(err);
      });
  });

  return promise;
}

loadMap.propTypes = {
  elem: PropTypes.instanceOf(HTMLDivElement).isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  icon: PropTypes.string,
};
