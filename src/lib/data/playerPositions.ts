import { PlayerPosition } from "../enums/player.enum";

export interface PositionInfo {
  abbr: string;
  label: string;
  description: string;
  x: number;
  y: number;
}

export const POSITION_INFO: Record<PlayerPosition, PositionInfo> = {
  [PlayerPosition.PITCHER]: {
    abbr: "P",
    label: "Pitcher",
    description:
      "The pitcher starts every play from the mound, throwing to the catcher and working to retire opposing batters.",
    x: 200,
    y: 300,
  },
  [PlayerPosition.CATCHER]: {
    abbr: "C",
    label: "Catcher",
    description:
      "The catcher crouches behind home plate, calling pitches, blocking balls in the dirt, and defending against stolen base attempts.",
    x: 200,
    y: 410,
  },
  [PlayerPosition.BASEMAN1]: {
    abbr: "1B",
    label: "First Baseman",
    description:
      "The first baseman covers the area around first base, fielding ground balls and receiving throws from teammates to record outs.",
    x: 258,
    y: 272,
  },
  [PlayerPosition.BASEMAN2]: {
    abbr: "2B",
    label: "Second Baseman",
    description:
      "The second baseman is responsible for defending the area around second base and plays an important role in turning double plays.",
    x: 228,
    y: 195,
  },
  [PlayerPosition.BASEMAN3]: {
    abbr: "3B",
    label: "Third Baseman",
    description:
      "The third baseman guards the 'hot corner', reacting to hard-hit balls and making long, accurate throws across the infield.",
    x: 142,
    y: 272,
  },
  [PlayerPosition.SHORTSTOP]: {
    abbr: "SS",
    label: "Shortstop",
    description:
      "The shortstop covers the gap between second and third base and is often considered the most demanding position on the infield.",
    x: 172,
    y: 195,
  },
  [PlayerPosition.LEFTFIELDER]: {
    abbr: "LF",
    label: "Left Fielder",
    description:
      "The left fielder patrols the outfield grass down the left-field line, backing up throws and cutting off extra-base hits.",
    x: 85,
    y: 115,
  },
  [PlayerPosition.CENTERFIELDER]: {
    abbr: "CF",
    label: "Center Fielder",
    description:
      "The center fielder covers the largest area of the outfield and directs positioning for the other outfielders.",
    x: 200,
    y: 60,
  },
  [PlayerPosition.RIGHTFIELDER]: {
    abbr: "RF",
    label: "Right Fielder",
    description:
      "The right fielder covers the outfield down the right-field line and typically needs the strongest throwing arm of the three outfielders.",
    x: 315,
    y: 115,
  },
};

export const POSITION_ORDER: PlayerPosition[] = [
  PlayerPosition.PITCHER,
  PlayerPosition.CATCHER,
  PlayerPosition.BASEMAN1,
  PlayerPosition.BASEMAN2,
  PlayerPosition.BASEMAN3,
  PlayerPosition.SHORTSTOP,
  PlayerPosition.LEFTFIELDER,
  PlayerPosition.CENTERFIELDER,
  PlayerPosition.RIGHTFIELDER,
];
