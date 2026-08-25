import React from "react";
import { Box } from "@mui/material";

const BASICS = [
  {
    value: "9",
    label: "Innings",
    desc: "A standard game is played over nine innings, each split into a top and bottom half.",
  },
  {
    value: "3",
    label: "Outs",
    desc: "Each half-inning ends once the fielding team records three outs.",
  },
  {
    value: "Extra",
    label: "Innings",
    desc: "If the score is tied after nine innings, the game continues into extra innings.",
  },
];

export default function BaseballGuide() {
  return (
    <section className="basics-section">
      <Box className="section-eyebrow">HOW BASEBALL WORKS</Box>
      <Box className="section-title">The Basics</Box>

      <Box className="basics-grid">
        {BASICS.map((item) => (
          <Box key={item.label + item.value} className="basics-card">
            <span className="basics-value">{item.value}</span>
            <span className="basics-label">{item.label}</span>
            <p className="basics-desc">{item.desc}</p>
          </Box>
        ))}
      </Box>
    </section>
  );
}
