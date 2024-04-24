export async function getPlaces(lat: number, lng: number, rad: number) {
  const callURL = `${import.meta.env.VITE_PLACES_API_URL}?lat=${lat}&lng=${lng}&radius=${rad}`;
  const response = await fetch(callURL);
  if(!response.ok) return null;
  const data = await response.json();
  return data.results;
}

export async function getPlacePhoto(referance: string) {
  const callURL = `${import.meta.env.VITE_PLACE_PHOTO_API_URL}?photoreference=${referance}&maxheight=240&maxwidth=426`;
  const response = await fetch(callURL);
  if(!response.ok) return null;
  return response.url;
}
