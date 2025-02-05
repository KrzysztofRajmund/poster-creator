import { forwardRef, useRef } from "react";

import { cn } from "@/utils/twClassesMerge";
import clsx from "clsx";

import { BADGE_COLORS, COLOR_MAP } from "@/constants";
import useChangeTextAndColor from "@/hooks/useChangeTextAndColor";
import useDynamicFontSize from "@/hooks/useDynamicFontSize";

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
