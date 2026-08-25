import React from "react";
import { Box } from "@mui/material";

const STEPS = [
  {
    number: "01",
    title: "Arrive at the Stadium",
    desc: "Fans arrive early, find their seats, and soak in the pregame atmosphere.",
  },
  {
    number: "02",
    title: "First Pitch",
    desc: "The starting pitcher throws the opening pitch and the game begins.",
  },
  {
    number: "03",
    title: "Nine Innings",
    desc: "Both teams take turns batting and fielding across nine innings.",
  },
  {
    number: "04",
    title: "Winner Determined",
    desc: "The team with the most runs after the final out takes the win.",
  },
];

export default function GameDay() {
  return (
    <section className="gameday-section">
      <Box className="section-eyebrow">GAME DAY</Box>
      <Box className="section-title">What to Expect</Box>

      <Box className="gameday-steps">
        {STEPS.map((step) => (
          <Box key={step.number} className="gameday-step">
            <span className="gameday-step-number">{step.number}</span>
            <span className="gameday-step-title">{step.title}</span>
            <p className="gameday-step-desc">{step.desc}</p>
          </Box>
        ))}
      </Box>
    </section>
  );
}
