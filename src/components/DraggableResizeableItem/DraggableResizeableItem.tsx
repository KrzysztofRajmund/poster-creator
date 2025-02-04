"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import clsx from "clsx";
import Image from "next/image";

import DragIcon from "@/assets/icons/drag.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import { INIT_POSITION, INIT_SIZE } from "@/constants";
import useChangeTextAndColor from "@/hooks/useChangeTextAndColor";
import useDraggableResizable from "@/hooks/useDraggableResizable";
import useDynamicFontSize from "@/hooks/useDynamicFontSize";
import { ImageElement } from "@/types";

const MAX_DIMENSION = 300;
const BADGE_COLORS = ["black-100", "white-base", "red-90", "blue", "green"];
const COLOR_MAP: Record<string, Record<string, string>> = {
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

interface DraggableResizableProps {
  layerIndex: number;
  image?: ImageElement;
  onRemove: () => void;
}

export const DraggableResizableItem = ({
  layerIndex,
  image,
  onRemove,
}: DraggableResizableProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // TODO: Move it to the hook
  const initialSize = useMemo(() => {
    if (image) {
      const aspectRatio = image.width / image.height;
      if (image.width > image.height) {
        return { width: MAX_DIMENSION, height: MAX_DIMENSION / aspectRatio };
      } else {
        return { width: MAX_DIMENSION * aspectRatio, height: MAX_DIMENSION };
      }
    }
    return INIT_SIZE;
  }, [image]);

  const { position, size, elementRef, handleDrag, handleResize } =
    useDraggableResizable({
      initPosition: INIT_POSITION,
      initSize: initialSize,
      isImage: !!image,
    });

  const { textColor, handleTextChange, handleColorChange } =
    useChangeTextAndColor();

  useDynamicFontSize(
    elementRef as React.RefObject<HTMLDivElement>,
    inputRef as React.RefObject<HTMLTextAreaElement>,
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    },
    [elementRef],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handlePropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isVisible) {
      setIsVisible(false);
    }
    handlePropagation(e);
    handleDrag(e);
  };

  const renderEditableContent = useMemo(() => {
    if (image) {
      return (
        <div
          className="relative bg-transparent"
          style={{
            width: size.width,
            height: size.height,
          }}
        >
          <Image
            key={image.id}
            alt={image.name}
            src={image.base64}
            layout="intrinsic"
            width={size.width}
            height={size.height}
            objectFit="contain"
          />
        </div>
      );
    }

    return (
      <>
        <textarea
          ref={inputRef}
          className={clsx(
            "flex h-full w-full resize-none items-center justify-center overflow-hidden bg-transparent p-2 text-center text-inherit placeholder-black-100 placeholder-opacity-25 placeholder:font-bold hover:outline-none focus:outline-none",
            COLOR_MAP.text[textColor],
          )}
          onChange={handleTextChange}
          placeholder="Type your text here"
        />
        {/* Color badges */}
        {isVisible ? (
          <div className="absolute bottom-[-16px] left-0 flex translate-x-[2px] translate-y-[100%] space-x-4">
            {BADGE_COLORS.map((color) => (
              <div
                key={color}
                className={clsx(
                  "h-4 w-4 cursor-pointer rounded-full",
                  COLOR_MAP.bg[color],
                  {
                    "outline outline-2 outline-offset-2 outline-white-base":
                      textColor === color,
                  },
                )}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        ) : null}
      </>
    );
  }, [
    handleColorChange,
    handleTextChange,
    image,
    isVisible,
    size.height,
    size.width,
    textColor,
  ]);

  return (
    <div
      ref={elementRef}
      className={clsx("absolute bg-transparent outline outline-2", {
        "outline-primary": isVisible,
        "outline-transparent": !isVisible,
      })}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: layerIndex,
      }}
      onMouseDown={() => setIsVisible(true)}
    >
      {/* Drag handle*/}
      <div
        className="absolute left-0 top-0 flex h-10 w-10 translate-x-[-50%] translate-y-[-50%] cursor-move items-center justify-center rounded-full bg-white-base"
        onMouseDown={handleDragStart}
        style={{
          zIndex: layerIndex + 1,
        }}
      >
        <DragIcon width={24} height={24} />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        {renderEditableContent}
        {isVisible ? (
          <>
            {/* Trash handle*/}
            <div
              className="absolute right-0 top-0 flex h-6 w-6 translate-x-[50%] translate-y-[-50%] cursor-pointer items-center justify-center rounded-full bg-white-base"
              onClick={onRemove}
              onMouseDown={handlePropagation}
            >
              <TrashIcon width={12} height={14} />
            </div>
            {/* Resize handle*/}
            <div
              className="absolute bottom-0 right-0 h-6 w-6 translate-x-[50%] translate-y-[50%] cursor-se-resize rounded-full border-4 border-white-base bg-primary"
              onMouseDown={handleResize}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
