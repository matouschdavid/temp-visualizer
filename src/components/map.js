import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import WeatherInfo from "./weather-info";
import { environment } from "../environments/environment";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 48.30609,
  lng: 14.28644,
};

const zoom = 7;

//create options for map that cant be changed
const options = {
  controlSize: false,
  disableDefaultUI: true,
  disableDoubleClickZoom: true,
  draggable: false,
  keyboardShortcuts: false,
  mapTypeControl: false,
};

function Map() {
  const [bounds, setBounds] = React.useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: environment.googleMapsApiKey,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onBoundsChanged = React.useCallback(
    function callback() {
      if (map == null) return;

      // function getBounds() {
      //   var bounds = map.getBounds();
      //   var ne = bounds.getNorthEast();
      //   var sw = bounds.getSouthWest();

      //   return {
      //     topLeft: { lat: ne.lat(), lng: sw.lng() },
      //     bottomRight: { lat: sw.lat(), lng: ne.lng() },
      //   };
      // }
      setBounds(map.getBounds());
    },
    [map]
  );

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
      onBoundsChanged={onBoundsChanged}
    >
      <WeatherInfo mapMode="google" bounds={bounds}></WeatherInfo>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
