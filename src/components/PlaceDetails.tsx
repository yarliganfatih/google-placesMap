import { useEffect, useState } from "react";
import { PlaceDetailsProp } from "../types";
import { getPlacePhoto } from "../api";
import "../assets/components/placeDetails.css";

function PlaceDetails({ place }: PlaceDetailsProp) {
  if (place == null) return <>No details about place.</>;

  const [placePhotoHref, setPlacePhotoHref] = useState<string>("");

  useEffect(() => {
    if(place?.photos==null) return setPlacePhotoHref("./image_not_found.jpg");
    getPlacePhoto(place.photos[0].photo_reference)
      .then((photoUrl) => {
        if (photoUrl) {
          setPlacePhotoHref(photoUrl);
        } else {
          console.warn("Failed to fetch photo");
          setPlacePhotoHref("./image_not_found.jpg");
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
      <img src={placePhotoHref ? placePhotoHref : "./image_not_found.jpg"} alt="Place" width={390} height={220} />
      <div className="placeDetails">
        <h2>{place.name}</h2>
        <div className="rating">
          <span>{place.rating}</span>
          <span className="star">{renderStars(place.rating)}</span>
          <span>({place.user_ratings_total})</span>
          <span className="price">{place.price_level ? " - " : null}</span>
        </div>
        <span>{renderPriceLevel(place.price_level)}</span>
        <ul className="types">
          {place.types.map((type, key) => (
            <li key={key}>{type}</li>
          ))}
        </ul>
        <span className="vicinity">{place.vicinity}</span>
      </div>
    </>
  );
}

export default PlaceDetails;
