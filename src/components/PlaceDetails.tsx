import { useEffect, useState } from "react";
import { PlaceDetailsProp } from "../types";
import { getPlacePhoto } from "../api";

function PlaceDetails({ place }: PlaceDetailsProp) {
  if (place == null) return <>No details about place.</>;

  const [placePhotoHref, setPlacePhotoHref] = useState<string>("");

  useEffect(() => {
    getPlacePhoto(place.photos[0].photo_reference)
      .then((photoUrl) => {
        if (photoUrl) {
          setPlacePhotoHref(photoUrl);
        } else {
          console.warn("Failed to fetch photo");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [place]);

  const renderStars = (rating: number) =>
    "★".repeat(Math.floor(rating)) +
    (rating % 1 >= 0.5 ? "✭" : "☆") +
    "☆".repeat(4 - Math.floor(rating));

  const renderPriceLevel = (priceLevel: number) => "$".repeat(priceLevel);

  return (
    <>
      <img src={placePhotoHref} alt="Place" width={300} height={170} />
      <h2>{place.name}</h2>
      <span>{place.rating}</span>
      <span>{renderStars(place.rating)}</span>
      <span>({place.user_ratings_total})</span>
      <span>{place.price_level ? " - " : null}</span>
      <span>{renderPriceLevel(place.price_level)}</span>
      <ul>
        {place.types.map((type) => (
          <li>{type}</li>
        ))}
      </ul>
      <span>{place.vicinity}</span>
    </>
  );
}

export default PlaceDetails;
