import { useContext } from "react";

import { PosterContext } from "./PosterProvider.context";

export const usePosterContext = () => {
  const context = useContext(PosterContext);

  if (!context) {
    throw new Error("No context found");
  }

  return context;
};
