export type Coordinate = {
  lat: number;
  lng: number;
};

export type MapKitProp = {
  location: Coordinate;
  markers: Coordinate[];
};

export type ResultsPageProp = {
  params: {
    location: Coordinate;
    rad: number;
  }
};

export type placeType = {
  place_id: string,
  name: string,
  geometry: {
    location: Coordinate
  }
}

export type PlaceListProp = {
  places: placeType[]
}