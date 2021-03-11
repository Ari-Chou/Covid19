import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./map.css";
import { showDataOnMap } from "../util";

export const Map = ({ center, zoom, countriesData, casesType }) => {
  console.log("apple", center);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        casesType={casesType}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countriesData, casesType)}
      </MapContainer>
    </div>
  );
};
