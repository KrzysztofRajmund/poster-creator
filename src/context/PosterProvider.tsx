"use client";
import { useMemo, useState } from "react";

import { ImageElement, TextElement } from "@/types";

import { PosterContext } from "./PosterProvider.context";
import {
  Actions,
  ContextType,
  ProviderProps,
  State,
} from "./PosterProvider.types";

export const PosterProvider = ({ children }: ProviderProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [imageElements, setImageElements] = useState<ImageElement[]>([]);
  const [textElements, setTextElements] = useState<TextElement[]>([]);

  const state = useMemo<State>(
    () => ({
      backgroundImage,
      imageElements,
      textElements,
    }),
    [backgroundImage, imageElements, textElements],
  );

  const actions = useMemo<Actions>(
    () => ({
      setBackgroundImage,
      setImageElements,
      setTextElements,
    }),
    [],
  );

  const contextValue = useMemo<ContextType>(
    () => [state, actions],
    [state, actions],
  );

  return (
    <PosterContext.Provider value={contextValue}>
      {children}
    </PosterContext.Provider>
  );
};
