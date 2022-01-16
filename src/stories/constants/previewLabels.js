import formatLocation from '../../services/formatLocation';

const PREVIEW_LABELS = {
  ip: '192.212.174.101',
  city: 'Brooklyn',
  country: 'US',
  postalCode: '10001',
  region: 'NY',
  get location() {return formatLocation(this.city, '', this.postalCode, this.region)},
  timezone: 'UTC -05:00',
  isp: 'SpaceX Starlink',
};

export default PREVIEW_LABELS;