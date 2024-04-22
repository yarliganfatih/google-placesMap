export type Coordinate = {
  lat: number;
  lng: number;
};

export type MapKitProp = {
  location: Coordinate;
  markers: Coordinate[];
};
