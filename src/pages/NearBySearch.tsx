import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NearBySearch() {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [radius, setRadius] = useState<number>(1000);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (latitude == null || longitude == null || radius == null) {
      return;
    }
    const data = {
      location: {
        lat: latitude,
        lng: longitude,
      },
      rad: radius,
    };
    navigate("/results", { state: { params: data } });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Latitude</span>
          <br></br>
          <input
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
            placeholder="Please type Latitude"
            type="number"
            step="any"
            name="latitude"
            required
          />
        </label>
        <br></br>
        <label>
          <span>Longitude</span>
          <br></br>
          <input
            value={longitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
            placeholder="Please type Longitude"
            type="number"
            step="any"
            name="longitude"
            required
          />
        </label>
        <br></br>
        <label>
          <span>Radius</span>
          <br></br>
          <input
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            placeholder="Please type Radius"
            type="number"
            step="any"
            name="radius"
            required
          />
        </label>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default NearBySearch;
