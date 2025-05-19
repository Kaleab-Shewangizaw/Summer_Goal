import React from "react";
import "./ContributionGrid.css";

const getIntensityColor = (count) => {
  const colors = [
    "#5f5f5f",
    "#003E00 ",
    "#008000",
    "#00A600",
    "#42f542",
    "#81fb81",
  ];

  if (count >= 5) return colors[5];
  if (count >= 4) return colors[4];
  if (count >= 3) return colors[3];
  if (count >= 2) return colors[2];
  if (count >= 1) return colors[1];
  return colors[0];
};

const ContributionGrid = (props) => {
  let data = {};
  props.data?.forEach((item) => {
    data[item.date.slice(0, 10)] = item.count;
  });

  const today = new Date();
  const days = 7 * 15; // 15 weeks (364 days)

  const squares = Array.from({ length: days }).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (days - i - 1));
    const dateStr = date.toISOString().split("T")[0];
    const count = data[dateStr] || 0;
    const color = getIntensityColor(count);
    return (
      <div
        key={dateStr}
        title={`${dateStr}: ${count} done`}
        className="square"
        style={{ backgroundColor: color }}
      ></div>
    );
  });

  return (
    <div className="contribution-grid-container">
      <div className="contribution-grid">{squares}</div>
      <p style={{ textAlign: "center" }}>plan overview [past 100 days]</p>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Total Contributions:{" "}
        {props.data?.reduce((acc, item) => acc + item.count, 0) || 0}
      </p>
      {/* total active days */}
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Total Active Days:{" "}
        {props.data?.filter((item) => item.count > 0).length || 0}
      </p>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Average Contributions per Day:{" "}
        {(
          props.data?.reduce((acc, item) => acc + item.count, 0) /
          (props.data?.length || 1)
        ).toFixed(2) || 0}
      </p>
    </div>
  );
};

export default ContributionGrid;
