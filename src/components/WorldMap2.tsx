import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoData from "./countries-coastline-10km.geo.json";
import { GeoJsonObject } from "geojson";

// Define types for GeoJSON features and properties
interface CountryProperties {
  A3?: string;
  ADMIN?: string;
}

interface CountryFeature extends GeoJSON.Feature {
  properties: CountryProperties;
}

// Define the styles for countries
const countryStyle = {
  fillColor: "gray",
  weight: 2,
  opacity: 1,
  color: "white",
  fillOpacity: 0.7,
};

// Define the highlight style for hovered countries
const highlightStyle = {
  fillColor: "blue",
  weight: 2,
  opacity: 1,
  color: "white",
  fillOpacity: 0.7,
};

const WorldMap2: React.FC = () => {
  // Function to handle hover (mouseover and mouseout) events
  const onEachCountry = (country: CountryFeature, layer: any) => {
    const originalStyle = layer.options.style || countryStyle;

    layer.on({
      mouseover: () => {
        layer.setStyle(highlightStyle);
      },
      mouseout: () => {
        layer.setStyle(originalStyle);
      },
      click: () => {
        handleClick(country);
      },
    });
  };

  // Function to handle the click event
  const handleClick = (country: CountryFeature) => {
    const countryName =
      country.properties.A3 || country.properties.ADMIN || "Unknown Country";
    console.log("Clicked country:", countryName);
  };

  return (
    <MapContainer
      style={{ height: "50vh", width: "100%" }}
      zoom={2}
      center={[20, 0]}
    >
      {geoData && (
        <GeoJSON
          data={geoData as GeoJsonObject} // Type assertion for geoData
          style={countryStyle}
          onEachFeature={onEachCountry}
        />
      )}
    </MapContainer>
  );
};

export default WorldMap2;
