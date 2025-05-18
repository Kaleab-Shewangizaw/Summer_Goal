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

const ContributionGrid = () => {
  // data: { "2025-05-15": 1, "2025-05-16": 2, ... }
  // Example data for testing
  const data = {
    "2025-05-01": 10,
    "2025-05-13": 3,
    "2025-05-14": 2,
    "2025-05-15": 1,
    "2025-05-16": 2,
    "2025-05-17": 3,
    "2025-05-18": 4,
    "2025-05-19": 5,
  };
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
      <p>plan achivement Overview [past 100 days]</p>
    </div>
  );
};

export default ContributionGrid;
