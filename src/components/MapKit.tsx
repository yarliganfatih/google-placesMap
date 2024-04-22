import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { MapKitProp } from "../types";

function MapKit({ location, markers }: MapKitProp) {
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
      {
        markers.map((marker, key) => (
          <Marker
            key={`marker_${key}`}
            position={marker}
          />
        ))
      }
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MapKit;
