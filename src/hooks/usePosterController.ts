"use client";
import { useCallback, useRef } from "react";

import { v4 as uuidv4 } from "uuid";

import { usePosterContext } from "@/context";

export default function usePosterController() {
  const stackingOrderRef = useRef<number>(0);

  const [
    { imageElements },
    { setBackgroundImage, setImageElements, setTextElements },
  ] = usePosterContext();

  const addImageElement = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const fileName = file.name;
        const reader = new FileReader();

        reader.onload = (e) => {
          const result = e.target?.result as string;

          const img = new Image();
          img.onload = () => {
            setImageElements([
              ...imageElements,
              {
                id: `${uuidv4()}_${fileName}`,
                name: fileName,
                base64: result,
                width: img.width,
                height: img.height,
                zIndex: stackingOrderRef.current++,
              },
            ]);
          };
          img.src = result;
        };

        reader.readAsDataURL(file);
      }
    },
    [imageElements, setImageElements],
  );

  const handleBackgroundChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setBackgroundImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setBackgroundImage],
  );

  const addTextElement = useCallback(() => {
    setTextElements((prevTextElements) => [
      ...prevTextElements,
      { id: uuidv4(), zIndex: stackingOrderRef.current++ },
    ]);
  }, [setTextElements]);

  return { addImageElement, addTextElement, handleBackgroundChange };
}
