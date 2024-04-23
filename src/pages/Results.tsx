import { useState, useEffect } from "react";
import MapKit from "../components/MapKit";
import { Coordinate, ResultsPageProp, placeType } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import { getPlaces } from "../api";
import "../assets/pages/results.css";
import PlaceList from "../components/PlaceList";

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
  const [markers, setMarkers] = useState<Coordinate[]>([]);
  const [mapLocation, setMapLocation] = useState<Coordinate>(defaultCoordinates);

  useEffect(() => {
    if (!params) return;
    fetchData();
    setMapLocation(params.location);
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

  useEffect(() => {
    setMarkers([]);
    if (places.length === 0) return;
    setMarkers(places.map((place) => place.geometry.location));
  }, [places]);

  return (
    <>
      <div className="leftBar">
        <button onClick={() => navigate(-1)}>Back</button>
        <br></br>
        {isLoading ? "Loading.." : <PlaceList places={places}></PlaceList>}
      </div>
      <MapKit markers={markers} location={mapLocation} />
    </>
  );
}

export default Results;
