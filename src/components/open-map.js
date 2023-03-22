import { MapContainer, TileLayer } from "react-leaflet";
import WeatherInfo from "./weather-info";
const position = [48.30609, 14.28644];
const zoom = 7;
function OpenMap(props) {
  return (
    <MapContainer center={position} zoom={zoom} dragging={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <WeatherInfo mapMode="openMaps"></WeatherInfo>
    </MapContainer>
  );
}

export default OpenMap;
