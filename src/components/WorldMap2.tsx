import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoData from "./countries-coastline-10km.geo.json";
import { GeoJsonObject } from "geojson";
import mikuData from "../worldwide-miku.json";
import L, { PathOptions } from "leaflet";

// Define types for GeoJSON features and properties
interface CountryProperties {
  A3?: string;
  ADMIN?: string;
}

interface CountryFeature extends GeoJSON.Feature {
  properties: CountryProperties;
}

// Define the styles for countries
const countryStyle: PathOptions = {
  fillColor: "gray",
  weight: 2,
  opacity: 1,
  color: "gray",
  fillOpacity: 0.7,
};

const activeCountryStyle: PathOptions = {
  fillColor: "#12767b",
  weight: 2,
  opacity: 1,
  color: "#12767b",
  fillOpacity: 0.7,
};

// Define the highlight style for hovered countries
const highlightStyle: PathOptions = {
  fillColor: "#82c8c5",
  weight: 4,
  opacity: 1,
  color: "#82c8c5",
  fillOpacity: 0.7,
};

const WorldMap2: React.FC = () => {
  const isActiveCountry = (feat: CountryFeature | undefined) =>
    mikuData.find((miku) =>
      miku.tags.find((tag) => tag === `country:${feat?.properties.A3}`)
    );

  // Function to handle hover (mouseover and mouseout) events
  const onEachCountry = (country: CountryFeature, layer: any) => {
    const originalStyle = isActiveCountry(country)
      ? activeCountryStyle
      : countryStyle;

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
          style={(feat) =>
            isActiveCountry(feat) ? activeCountryStyle : countryStyle
          }
          onEachFeature={onEachCountry}
        />
      )}
    </MapContainer>
  );
};

export default WorldMap2;
