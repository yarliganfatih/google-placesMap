export type Coordinate = {
  lat: number;
  lng: number;
};

export type MapKitProp = {
  location: Coordinate;
  places: placeType[];
  selectedPlace: placeType;
  selectPlace: void | any;
};

export type ResultsPageProp = {
  params: {
    location: Coordinate;
    rad: number;
  }
};

type placePhoto = {
  photo_reference: string
}

export type placeType = {
  place_id: string,
  name: string,
  rating: number,
  user_ratings_total: number,
  price_level: number,
  types: string[],
  vicinity: string,
  photos: placePhoto[],
  geometry: {
    location: Coordinate
  }
}

export type PlaceListProp = {
  places: placeType[],
  selectPlace: void | any,
  selectedPlace: placeType
}

export type PlaceDetailsProp = {
  place: placeType
}