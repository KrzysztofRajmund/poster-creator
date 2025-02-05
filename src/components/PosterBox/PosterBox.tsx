"use client";

import usePosterBox from "@/hooks/usePosterBox";

import { DraggableResizableItem } from "../DraggableResizeableItem";

export const PosterBox = () => {
  const {
    backgroundImageUrl,
    imageElements,
    textElements,
    removeTextElement,
    removeImageElement,
  } = usePosterBox();

  return (
    <section
      id="poster-box"
      className="relative flex h-[948px] w-[759px] flex-shrink-0 flex-col overflow-hidden bg-black-50 bg-cover bg-center bg-no-repeat"
      style={{
        ...backgroundImageUrl,
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
