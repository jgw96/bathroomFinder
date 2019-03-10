const rootURL = "https://www.refugerestrooms.org:443/api/v1/restrooms";

export async function getNearbyStops(position) {
  const response = await fetch(`${rootURL}/by_location.json?lat=${position.latitude}&lng=${position.longitude}`);

  const data = await response.json();
  console.log(data);

  return data;
}

export async function getSingleBath(lat, long) {
  const response = await fetch(`${rootURL}/by_location.json?per_page=1&lat=${lat}&lng=${long}`);

  const data = await response.json();
  console.log(data);
  
  return data[0];
}