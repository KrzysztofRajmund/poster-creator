"use client";
import { useCallback, useMemo, useRef } from "react";

import { DEFAULT_BACKGROUND_IMAGE } from "@/constants";
import { usePosterContext } from "@/context/PosterProvider.hooks";

import { DraggableResizableItem } from "../DraggableResizeableItem";

export const PosterBox = () => {
  const posterRef = useRef<HTMLElement>(null);

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

  const bgImageUrl = useMemo(() => {
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

  return (
    <section
      ref={posterRef}
      className="relative flex h-[948px] w-[759px] flex-col overflow-hidden bg-black-50 bg-cover bg-center bg-no-repeat"
      style={{
        ...bgImageUrl,
      }}
    >
      {textElements.map((element) => (
        <DraggableResizableItem
          key={element.id}
          layerIndex={element.zIndex}
          onRemove={() => removeTextElement(element.id)}
        />
      ))}
      {imageElements.map((image) => (
        <DraggableResizableItem
          key={image.id}
          image={image}
          layerIndex={image.zIndex}
          onRemove={() => removeImageElement(image.id)}
        />
      ))}
    </section>
  );
};
