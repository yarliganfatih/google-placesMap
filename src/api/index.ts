export async function getPlaces(lat: number, lng: number, rad: number) {
  const callURL = `${import.meta.env.VITE_PLACES_API_URL}?location=${lat}%2C${lng}&radius=${rad}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  const response = await fetch(callURL);
  if(!response.ok) return null;
  const data = await response.json();
  return data.results;
}
