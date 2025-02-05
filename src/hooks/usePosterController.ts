"use client";
import { useCallback, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { usePosterContext } from "@/context";

type Return = {
  isDialogOpen: boolean;
  addImageElement: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTextElement: () => void;
  clearPoster: () => void;
  handleBackgroundChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseDialog: () => void;
  handleConfirmDialog: () => void;
};

export default function usePosterController(): Return {
  const stackingOrderRef = useRef<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [
    { imageElements },
    { setBackgroundImage, setImageElements, setTextElements },
  ] = usePosterContext();

  const clearPoster = useCallback(() => setIsDialogOpen(true), []);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleConfirmDialog = useCallback(() => {
    setBackgroundImage("");
    setImageElements([]);
    setTextElements([]);

    setIsDialogOpen(false);
  }, [setBackgroundImage, setImageElements, setTextElements]);

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

  const addTextElement = useCallback(() => {
    setTextElements((prevTextElements) => [
      ...prevTextElements,
      { id: uuidv4(), zIndex: stackingOrderRef.current++ },
    ]);
  }, [setTextElements]);

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

  return {
    isDialogOpen,
    addImageElement,
    addTextElement,
    clearPoster,
    handleBackgroundChange,
    handleCloseDialog,
    handleConfirmDialog,
  };
}
