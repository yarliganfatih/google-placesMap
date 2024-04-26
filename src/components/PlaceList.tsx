import { useState } from "react";
import { PlaceListProp } from "../types";
import "../assets/components/placeList.css";

function PlaceList({ places, selectPlace, selectedPlace }: PlaceListProp) {
  if (places.length == 0) return <>No places found in this area.</>;
  return (
    <>
      <ul className="places">
        {places.map((place) => (
          <li
            className={selectedPlace == place ? "selectedPlace" : ""}
            key={place.place_id}
            onClick={() => {
              selectPlace(place);
            }}
          >
            {place.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default PlaceList;
