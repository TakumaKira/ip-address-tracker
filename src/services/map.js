import { Loader } from '@googlemaps/js-api-loader';

export const GEO_IS_NOT_NUMBERS_ERROR = 'Passed geo are not numbers';
export default class Map {
  #elem;
  #lat;
  #lng;
  #zoom;
  #icon;
  #map;
  #google;
  #marker;
  constructor(elem, lat, lng, zoom, icon) {
    this.elem = elem;
    this.lat = lat;
    this.lng = lng;
    this.zoom = zoom;
    this.icon = icon;
  }
  load() {
    const promise = new Promise((resolve, reject) => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      });

      loader.load()
        .then(google => {
          this.google = google;
          this.map = new this.google.maps.Map(this.elem, {
            center: { lat: this.lat, lng: this.lng },
            zoom: this.zoom,
            disableDefaultUI: true,
          });
          this.marker = new this.google.maps.Marker({
            position: { lat: this.lat, lng: this.lng },
            map: this.map,
            icon: this.icon
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
  };
  setGeo(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      console.error(GEO_IS_NOT_NUMBERS_ERROR);
      return;
    }
    if (lat === this.lat && lng === this.lng) {
      return;
    }
    this.lat = lat;
    this.lng = lng;
    this.marker.setMap(null);
    const center = new this.google.maps.LatLng(this.lat, this.lng);
    this.map.panTo(center);
    this.marker = new this.google.maps.Marker({
      position: { lat: this.lat, lng: this.lng },
      map: this.map,
      icon: this.icon
    });
  }
}
