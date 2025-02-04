import { Dispatch, ReactNode, SetStateAction } from "react";

import { ImageElement, TextElement } from "@/types";

export type State = {
  backgroundImage: string;
  imageElements: ImageElement[];
  textElements: TextElement[];
};

export type Actions = {
  setBackgroundImage: Dispatch<SetStateAction<string>>;
  setImageElements: Dispatch<SetStateAction<ImageElement[]>>;
  setTextElements: Dispatch<SetStateAction<TextElement[]>>;
};

export type ContextType = [State, Actions];

export type ProviderProps = {
  children: ReactNode;
};
