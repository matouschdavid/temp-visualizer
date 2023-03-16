import "./weather-info.css";
import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import tempToColor from "./weather-util";
import { environment } from "../environments/environment";

const sectionCount = 30;

function WeatherInfo(props) {
  //hook to get ref to map
  const map = useMap();
  const bounds = map.getBounds();

  const [sections, setSections] = useState([]);
  const [dimensions, setDimensions] = useState({
    rows: 0,
    cols: 0,
  });

  async function getTempAtLocation(lat, lon) {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=metric" +
      "&appid=" +
      environment.openWeatherMapApiKey;
    const weather = await fetch(url).then((response) => response.json());
    if (weather.cod !== 200) {
      window.alert("No more api calls. Please wait a few minutes.");
      return null;
    }
    return weather.main.temp;
  }

  useEffect(() => {
    //if the map is not loaded yet, dont do anything
    if (bounds.getCenter().lat === 0) return;

    //this is done to await the results of the api calls
    async function processSections() {
      //get the difference between the north west and south east corners of the map
      const latDif = bounds.getNorthWest().lat - bounds.getSouthEast().lat;
      const lonDif = bounds.getSouthEast().lng - bounds.getNorthWest().lng;
      //calculate the ratio of the map
      const ratio = latDif / lonDif;
      //calculate the number of rows and columns of sections. the ratio of the grid should be the same as the ratio of the map.
      const rows = Math.floor(Math.sqrt(sectionCount / ratio));
      const cols = Math.round(Math.sqrt(sectionCount * ratio));

      const tempSections = [];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          //calculate the lat and lon of the section
          const lat = bounds.getNorthWest().lat - latDif * (i / rows);
          const lon = bounds.getNorthWest().lng - lonDif * (j / cols);
          const temp = await getTempAtLocation(lat, lon);
          if (temp == null) return;
          tempSections.push({ lat, lon, temp });
        }
      }

      setSections(tempSections);
      setDimensions({ rows, cols });
    }

    processSections();
  }, [bounds]);

  function sectionToDiv(section, index) {
    //calculate the max and min temp of all sections to make color more interesting
    const maxTemp = sections
      .map((s) => s.temp)
      .reduce((a, b) => Math.max(a, b));
    const minTemp = sections
      .map((s) => s.temp)
      .reduce((a, b) => Math.min(a, b));

    return (
      <div
        key={index}
        className="temp-field"
        style={{
          gridRow: Math.floor(index / dimensions.cols) + 1,
          gridColumn: (index % dimensions.cols) + 1,
          backgroundColor: tempToColor(section.temp, minTemp, maxTemp),
        }}
      >
        {section.temp}
      </div>
    );
  }

  if (sections.length === 0) return <h1>Loading...</h1>;
  return (
    <div className="field">
      {sections.map((sec, index) => sectionToDiv(sec, index))}
    </div>
  );
}

export default WeatherInfo;
