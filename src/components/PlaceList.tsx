import { useState } from "react";
import { PlaceListProp } from "../types";

function PlaceList({ places }: PlaceListProp) {
  if (places.length == 0) return <>No places found in this area.</>;
  return (
    <>
      <ul>
        {places.map((place) => (
          <li key={place.place_id}>{place.name}</li>
        ))}
      </ul>
    </>
  );
}

export default PlaceList;
