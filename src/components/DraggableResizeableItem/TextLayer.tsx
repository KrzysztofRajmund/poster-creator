import { forwardRef, useRef } from "react";

import { cn } from "@/utils/twClassesMerge";
import clsx from "clsx";

import useChangeTextAndColor from "@/hooks/useChangeTextAndColor";
import useDynamicFontSize from "@/hooks/useDynamicFontSize";

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

interface TextLayerProps {
  isVisible: boolean;
}

export const TextLayer = forwardRef<HTMLDivElement, TextLayerProps>(
  ({ isVisible }, parentRef) => {
    const textRef = useRef<HTMLTextAreaElement>(null);

    useDynamicFontSize(
      parentRef as React.RefObject<HTMLDivElement>,
      textRef as React.RefObject<HTMLTextAreaElement>,
    );

    const { textColor, handleTextChange, handleColorChange } =
      useChangeTextAndColor();

    return (
      <>
        <textarea
          ref={textRef}
          className={cn(
            "flex h-full w-full resize-none items-center justify-center overflow-hidden bg-transparent px-6 py-3 text-center font-bold text-inherit placeholder-black-100/25 hover:outline-none focus:outline-none",
            COLOR_MAP.text[textColor],
          )}
          onChange={handleTextChange}
          placeholder="Type your text here"
        />
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
  },
);

TextLayer.displayName = "TextLayer";
