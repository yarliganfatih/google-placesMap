import { useState } from "react";
import "./App.css";
import MapKit from "./components/MapKit";
import { Coordinate } from "./types";

function App() {
  const [markers, setMarkers] = useState<Coordinate[]>([
    {
      lat: 40.992929529238445,
      lng: 29.104826159053204,
    },
  ]);

  const [location, setLocation] = useState<Coordinate>({
    lat: 40.992929529238445,
    lng: 29.104826159053204,
  });

  return (
    <div className="App">
      <MapKit markers={markers} location={location} />
    </div>
  );
}

export default App;
