export default function processLocation(location) {
  return {
    ip: location.ip,
    isp: location.isp,
    city: location.location?.city,
    country: location.location?.country,
    lat: location.location?.lat,
    lng: location.location?.lng,
    postalCode: location.location?.postalCode,
    region: location.location?.region,
    timezone: location.location?.timezone
  };
}
