import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { MapKitProp } from "../types";

function MapKit({ location, places, selectedPlace, selectPlace }: MapKitProp) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_API_KEY}`,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100vw", height: "100vh"}}
      center={location}
      zoom={15}
    >
      {places.map((place, key) => {
        const isSelected = place === selectedPlace;
        const dotColor = isSelected ? "red" : "blue";
        const _zIndex = isSelected ? 2 : 1;
        return (
          <Marker
            key={`marker_${key}`}
            position={place.geometry.location}
            options={{
              zIndex: _zIndex,
              icon: {
                url: `http://maps.google.com/mapfiles/ms/icons/${dotColor}-dot.png`,
              },
            }}
            onClick={()=>{selectPlace(place)}}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapKit;
