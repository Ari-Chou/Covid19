import React from "react";
import "./infoBox.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export const InfoBox = ({ title, cases, total, active, isRed, ...props }) => {
  return (
    <Card
      className={`infoBox ${active && "is--selected"} ${
        isRed && "infoBox--red"
      } `}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography className="info__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="info__cases">{cases}</h2>
        <Typography className="info__total" color="textSecondary">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
};
