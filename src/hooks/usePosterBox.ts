"use client";
import { useCallback, useMemo } from "react";

import { DEFAULT_BACKGROUND_IMAGE } from "@/constants";
import { usePosterContext } from "@/context/PosterProvider.hooks";
import { ImageElement, TextElement } from "@/types";

type Return = {
  backgroundImageUrl: { backgroundImage: string };
  imageElements: ImageElement[];
  textElements: TextElement[];
  removeTextElement: (key: string) => void;
  removeImageElement: (key: string) => void;
};

export default function usePosterBox(): Return {
  const [
    { backgroundImage, imageElements, textElements },
    { setImageElements, setTextElements },
  ] = usePosterContext();

  const removeTextElement = useCallback(
    (key: string) => {
      setTextElements((prevTextElements) =>
        prevTextElements.filter((element) => element.id !== key),
      );
    },
    [setTextElements],
  );

  const removeImageElement = useCallback(
    (key: string) => {
      setImageElements(imageElements.filter((image) => image.id !== key));
    },
    [imageElements, setImageElements],
  );

  const backgroundImageUrl = useMemo(() => {
    const shouldDisplayDefaultBackground =
      !backgroundImage &&
      textElements.length === 0 &&
      imageElements.length === 0;

    return {
      backgroundImage: shouldDisplayDefaultBackground
        ? `url(${DEFAULT_BACKGROUND_IMAGE})`
        : backgroundImage
          ? `url(${backgroundImage})`
          : "",
    };
  }, [backgroundImage, imageElements.length, textElements.length]);

  return {
    backgroundImageUrl,
    imageElements,
    textElements,
    removeTextElement,
    removeImageElement,
  };
}
