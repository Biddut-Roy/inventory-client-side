
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useState } from "react";


const Mapbox = () => {
  const [lng] = useState(88.915642);
  const [lat] = useState(25.663240);
  return (
    <div className="App">
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAP_GL_API_KEY}
        style={{
          weight: "90%",
          height: "350px",
          borderRadius: "15px",
          border: "2px solid blue",
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 10
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} />
        <NavigationControl position="bottom-right" />
        <FullscreenControl />
        <GeolocateControl />
      </Map>
    </div>
  );
};

export default Mapbox;