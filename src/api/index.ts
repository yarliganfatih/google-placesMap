export async function getPlaces(lat: number, lng: number, rad: number) {
  const callURL = `${import.meta.env.VITE_PLACES_API_URL}?location=${lat},${lng}&radius=${rad}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  const response = await fetch(callURL);
  if(!response.ok) return null;
  const data = await response.json();
  return data.results;
}

export async function getPlacePhoto(referance: string) {
  const callURL = `${import.meta.env.VITE_PLACE_PHOTO_API_URL}?photoreference=${referance}&maxheight=240&maxwidth=426&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
  const response = await fetch(callURL);
  if(!response.ok) return null;
  return response.url;
}
