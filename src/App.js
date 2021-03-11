import React, { useEffect, useState, Fragment } from "react";
import "./App.css";

import axios from "axios";
import { sortData, formatStat } from "./util";
import { InfoBox } from "./components/infoBox";
import { Map } from "./components/map";
import { Table } from "./components/table";
import { LineGraph } from "./components/lineGraph";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Card, CardContent } from "@material-ui/core";
import "leaflet/dist/leaflet.css";

export const App = () => {
  const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountriesData, setMapCountriesData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getCountriesData = () => {
      axios.get("https://disease.sh/v3/covid-19/countries").then((res) => {
        const countries = res.data.map((country) => {
          console.log("......", res.data);
          return {
            name: country.country,
            value: country.countryInfo.iso3,
          };
        });
        setTableData(sortData(res.data));
        setCountries(countries);
        setMapCountriesData(res.data);
        console.log(countries);
      });
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    axios.get("https://disease.sh/v3/covid-19/all").then((res) => {
      setCountryInfo(res.data);
    });
  }, []);

  const onCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const url =
      selectedCountry === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectedCountry}`;

    axios.get(url).then((res) => {
      console.log("apple", res.data, res.data);
      setCountryInfo(res.data);
      setCountry(selectedCountry);
      setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long]);
      setMapZoom(4);
    });
  };

  return (
    <Fragment>
      <div className="app__container">
        <div className="left">
          <div className="app__header">
            <h1>COVID TRACKER</h1>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem value="WorldWide">WorldWide</MenuItem>
                {countries.map((country) => {
                  return (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="app__Stats">
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={() => setCasesType("cases")}
              title="Cases"
              cases={formatStat(countryInfo.todayCases)}
              total={countryInfo.cases}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={() => setCasesType("recovered")}
              title="Recover"
              cases={formatStat(countryInfo.todayRecovered)}
              total={countryInfo.recovered}
            />
            <InfoBox
              isRed
              active={casesType === "deaths"}
              onClick={() => setCasesType("deaths")}
              title="Deaths"
              cases={formatStat(countryInfo.todayDeaths)}
              total={countryInfo.deaths}
            />
          </div>
          <Map
            center={mapCenter}
            zoom={mapZoom}
            countriesData={mapCountriesData}
            casesType={casesType}
          />
        </div>

        <Card className="right">
          <CardContent>
            <h1>Live Cases by Country</h1>
            <Table countries={tableData} />
            <h3>World Cases of {casesType}</h3>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};
