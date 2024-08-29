import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoData from "./countries-coastline-10km.geo.json";
import { GeoJsonObject } from "geojson";
import mikuData from "../worldwide-miku.json";
import { PathOptions } from "leaflet";

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

interface WorldMap2Props {
  onClick: (arg0: string) => unknown;
}

const WorldMap2: React.FC<WorldMap2Props> = ({ onClick }) => {
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
    onClick(countryName);
  };

  return (
    <div className="w-screen flex flex-col items-center">
      <p className="text-center text-white">
        Click on any country to see the associated regional Mikus!
      </p>
      <div className="w-full md:w-[80vw] lg:w-[60vw]">
        <MapContainer
          className="rounded-none md:rounded-lg"
          style={{
            height: "50vh",
            width: "100%",
            backgroundColor: "white",
          }}
          attributionControl={false}
          zoom={2}
          minZoom={2}
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
      </div>
    </div>
  );
};

export default WorldMap2;
