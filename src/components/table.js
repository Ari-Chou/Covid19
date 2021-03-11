import React from "react";
import "./table.css";
import numeral from "numeral";

export const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => {
        return (
          <tr>
            <td>{country}</td>
            <td>
              <strong>{numeral(cases).format("000,000")}</strong>
            </td>
          </tr>
        );
      })}
      <h3>World</h3>
    </div>
  );
};
