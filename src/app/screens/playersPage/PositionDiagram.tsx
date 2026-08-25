import React from "react";
import { PlayerPosition } from "../../../lib/enums/player.enum";
import { POSITION_INFO, POSITION_ORDER } from "../../../lib/data/playerPositions";

interface PositionDiagramProps {
  activePosition: PlayerPosition;
}

export default function PositionDiagram({ activePosition }: PositionDiagramProps) {
  return (
    <svg className="position-diagram" viewBox="0 0 400 440" xmlns="http://www.w3.org/2000/svg">
      <path className="field-outfield" d="M200,400 L2,202 A280,280 0 0 1 398,202 Z" />
      <line className="field-foul-line" x1="200" y1="400" x2="2" y2="202" />
      <line className="field-foul-line" x1="200" y1="400" x2="398" y2="202" />
      <polygon className="field-infield" points="200,400 290,310 200,220 110,310" />

      <rect className="field-base" x="284" y="304" width="14" height="14" transform="rotate(45 291 311)" />
      <rect className="field-base" x="193" y="213" width="14" height="14" transform="rotate(45 200 220)" />
      <rect className="field-base" x="104" y="304" width="14" height="14" transform="rotate(45 111 311)" />
      <rect className="field-home" x="193" y="393" width="14" height="14" transform="rotate(45 200 400)" />
      <circle className="field-mound" cx="200" cy="310" r="10" />

      {POSITION_ORDER.map((pos) => {
        const info = POSITION_INFO[pos];
        const isActive = pos === activePosition;
        return (
          <g key={pos} className={isActive ? "position-marker active" : "position-marker"}>
            <title>{info.label}</title>
            {isActive && <circle className="position-marker-ring" cx={info.x} cy={info.y} r="22" />}
            <circle className="position-marker-dot" cx={info.x} cy={info.y} r={isActive ? 20 : 15} />
            <text className="position-marker-label" x={info.x} y={info.y + 4} textAnchor="middle">
              {info.abbr}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
