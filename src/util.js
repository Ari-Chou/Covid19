import React from "react";
import "./util.css";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const formatStat = (stat) => {
  return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
};

export const showDataOnMap = (data, casesType) =>
  data.map((countryData) => {
    return (
      <Circle
        center={[countryData.countryInfo.lat, countryData.countryInfo.long]}
        fillOpacity={0.4}
        pathOptions={{
          color: casesTypeColors[casesType].hex,
          fillColor: casesTypeColors[casesType].hex,
        }}
        radius={
          Math.sqrt(countryData[casesType] / 10) *
          casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{
                backgroundImage: `url(${countryData.countryInfo.flag})`,
              }}
            />
            <div className="info-name">{countryData.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(countryData.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(countryData.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(countryData.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    );
  });
