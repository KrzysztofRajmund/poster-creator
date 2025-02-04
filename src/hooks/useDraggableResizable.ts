import { useState, useRef, useCallback } from "react";

import {
  getBoundaryChecksForPosition,
  getBoundaryChecksForSize,
} from "@/utils/getBoundryChecks";

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

interface HookProps {
  initPosition: Position;
  initSize: Size;
  isImage?: boolean;
}

export default function useDraggableResizable({
  initPosition,
  initSize,
  isImage = false,
}: HookProps) {
  const [position, setPosition] = useState<Position>(initPosition);
  const [size, setSize] = useState<Size>(initSize);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX - position.x;
      const startY = e.clientY - position.y;

      const handleMouseMove = (event: MouseEvent) => {
        if (elementRef.current && elementRef.current.parentElement) {
          const parentRect =
            elementRef.current.parentElement.getBoundingClientRect();
          const dragIconRect =
            elementRef.current.firstElementChild?.getBoundingClientRect();

          const newX = event.clientX - startX;
          const newY = event.clientY - startY;

          if (dragIconRect) {
            const { adjustedX, adjustedY } = getBoundaryChecksForPosition({
              newX,
              newY,
              parentRect,
              dragIconRect,
            });

            setPosition({ x: adjustedX, y: adjustedY });
          }
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [position],
  );

  const handleImageResize = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = size.width;
      const startHeight = size.height;

      const handleMouseMove = (event: MouseEvent) => {
        if (elementRef.current && elementRef.current.parentElement) {
          const parentRect =
            elementRef.current.parentElement.getBoundingClientRect();

          const deltaX = event.clientX - startX;
          const deltaY = event.clientY - startY;
          const delta = Math.max(deltaX, deltaY);

          const newWidth = startWidth + delta;
          const newHeight = startHeight + delta;

          const { adjustedWidth, adjustedHeight } = getBoundaryChecksForSize({
            newWidth,
            newHeight,
            position,
            parentRect,
          });

          setSize({ width: adjustedWidth, height: adjustedHeight });
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [size, position],
  );

  const handleTextResize = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = size.width;
      const startHeight = size.height;

      const handleMouseMove = (event: MouseEvent) => {
        if (elementRef.current && elementRef.current.parentElement) {
          const parentRect =
            elementRef.current.parentElement.getBoundingClientRect();

          const newWidth = startWidth + (event.clientX - startX);
          const newHeight = startHeight + (event.clientY - startY);

          const { adjustedWidth, adjustedHeight } = getBoundaryChecksForSize({
            newWidth,
            newHeight,
            position,
            parentRect,
          });

          setSize({ width: adjustedWidth, height: adjustedHeight });
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [size, position],
  );

  const handleResize = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isImage) {
        handleImageResize(e);
      } else {
        handleTextResize(e);
      }
    },
    [isImage, handleImageResize, handleTextResize],
  );

  return {
    position,
    size,
    elementRef,
    handleDrag,
    handleResize,
  };
}
