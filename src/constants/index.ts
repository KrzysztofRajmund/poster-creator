export const DEFAULT_BACKGROUND_IMAGE = "/poster_bg.png";

export const BADGE_COLORS = [
  "black-100",
  "white-base",
  "red-90",
  "blue",
  "green",
];
export const COLOR_MAP: Record<string, Record<string, string>> = {
  bg: {
    "black-100": "bg-black-100",
    "white-base": "bg-white-base",
    "red-90": "bg-red-90",
    blue: "bg-blue",
    green: "bg-green",
  },
  text: {
    "black-100": "text-black-100",
    "white-base": "text-white-base",
    "red-90": "text-red-90",
    blue: "text-blue",
    green: "text-green",
  },
};

export const MIN_WIDTH = 20;
export const MIN_HEIGHT = 20;
export const INIT_POSITION = { x: 100, y: 100 };
export const INIT_SIZE = { width: 350, height: 120 };
