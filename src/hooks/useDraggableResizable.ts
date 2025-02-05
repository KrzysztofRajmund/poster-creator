import { useCallback, useEffect, useRef, useState } from "react";

import { MIN_HEIGHT, MIN_WIDTH } from "@/constants";
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
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>(initPosition);
  const [size, setSize] = useState<Size>(initSize);
  const [isVisible, setIsVisible] = useState(true);

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

  const handlePropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),
    [],
  );

  const makeItemActionsVisible = useCallback(() => setIsVisible(true), []);

  const handleDrag = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX - position.x;
      const startY = e.clientY - position.y;

      const handleMouseMove = (event: MouseEvent) => {
        if (elementRef.current && elementRef.current.parentElement) {
          const parentRect =
            elementRef.current.parentElement.getBoundingClientRect();

          const newX = event.clientX - startX;
          const newY = event.clientY - startY;

          const { adjustedX, adjustedY } = getBoundaryChecksForPosition({
            newX,
            newY,
            parentRect,
            elementRect: elementRef.current.getBoundingClientRect(),
          });

          setPosition({ x: adjustedX, y: adjustedY });
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [position.x, position.y],
  );

  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isVisible) {
        setIsVisible(false);
      }
      handlePropagation(e);
      handleDrag(e);
    },
    [handleDrag, handlePropagation, isVisible],
  );

  const handleImageResize = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = size.width;
      const startHeight = size.height;
      const aspectRatio = size.width / size.height;

      const handleMouseMove = (event: MouseEvent) => {
        if (elementRef.current && elementRef.current.parentElement) {
          const parentRect =
            elementRef.current.parentElement.getBoundingClientRect();

          const deltaX = event.clientX - startX;
          const deltaY = event.clientY - startY;

          // Calculate new size with maintained aspect ratio
          let newWidth = startWidth + deltaX;
          let newHeight = startHeight + deltaY;

          // Adjust the width or height based on the aspect ratio
          if (newWidth / newHeight > aspectRatio) {
            newWidth = newHeight * aspectRatio;
          } else {
            newHeight = newWidth / aspectRatio;
          }

          const { adjustedWidth, adjustedHeight } = getBoundaryChecksForSize({
            newWidth,
            newHeight,
            position,
            parentRect,
          });

          // Prevent resizing if the aspect ratio changes or the size is too small
          if (
            aspectRatio !== adjustedWidth / adjustedHeight ||
            adjustedWidth < MIN_WIDTH ||
            adjustedHeight < MIN_HEIGHT
          ) {
            return;
          }

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

          // Calculate new width and height based on mouse movement
          const newWidth = startWidth + (event.clientX - startX);
          const newHeight = startHeight + (event.clientY - startY);

          const { adjustedWidth, adjustedHeight } = getBoundaryChecksForSize({
            newWidth,
            newHeight,
            position,
            parentRect,
          });

          // Prevent resizing if  the size is too small
          if (
            adjustedWidth < MIN_WIDTH * 2 ||
            adjustedHeight < MIN_HEIGHT * 2
          ) {
            return;
          }

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return {
    elementRef,
    position,
    isVisible,
    size,
    handleDragStart,
    handlePropagation,
    handleResize,
    makeItemActionsVisible,
    setIsVisible,
  };
}
