export default function formatLocation(city, country, postalCode, region) {
  if (city === undefined || country === undefined || postalCode === undefined || region  === undefined) {
    return null;
  }
  return `${city}, ${region} ${postalCode} ${country}`;
};
