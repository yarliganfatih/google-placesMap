import { useState, useEffect } from "react";
import MapKit from "../components/MapKit";
import { Coordinate, ResultsPageProp, placeType } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import { getPlaces } from "../api";
import "../assets/pages/results.css";
import PlaceList from "../components/PlaceList";
import PlaceDetails from "../components/PlaceDetails";

function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = (location.state as ResultsPageProp)?.params;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultCoordinates = {
    lat: 40.992929529238445,
    lng: 29.104826159053204,
  };
  const [places, setPlaces] = useState<placeType[]>([]);
  const [mapLocation, setMapLocation] = useState<Coordinate>(defaultCoordinates);

  const [zoom, setZoom] = useState<number>(0);
  const calcZoom = (radius: number) => {
    const scale = radius / 500;
    const zoomLevel = 16 - Math.log(scale) / Math.log(2);
    return zoomLevel;
  };

  useEffect(() => {
    if (!params) return;
    fetchData();
    setMapLocation(params.location);
    setZoom(calcZoom(params.rad));
  }, [params]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const _places = await getPlaces(
        params.location.lat,
        params.location.lng,
        params.rad
      );
      setPlaces(_places);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedPlace, setSelectedPlace] = useState<placeType | any>();

  const selectPlace = (_place: placeType): void => {
    zoom==15.99 ? setZoom(16) : setZoom(15.99); // for smooth transition
    setMapLocation(_place.geometry.location);
    setSelectedPlace(_place);
  };
  const unSelectPlace = (): void => {
    setZoom(calcZoom(params.rad));
    setSelectedPlace(null);
  };

  return (
    <>
      <div className="leftBar">
        <button onClick={() => navigate(-1)}>Back</button>
        <br></br>
        {isLoading ? (
          "Loading.."
        ) : (
          <PlaceList
            places={places}
            selectPlace={selectPlace}
            selectedPlace={selectedPlace}
          />
        )}
      </div>
      <MapKit
        location={mapLocation}
        zoom={zoom}
        places={places}
        selectedPlace={selectedPlace}
        selectPlace={selectPlace}
      />
      {selectedPlace ? (
        <div className="rightBar">
          <button onClick={unSelectPlace}>Close</button>
          <br></br>
          <PlaceDetails place={selectedPlace}></PlaceDetails>
        </div>
      ) : null}
    </>
  );
}

export default Results;
