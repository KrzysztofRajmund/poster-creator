import { Position } from "@/hooks/useDraggableResizable";

type ChecksForPositionParams = {
  newX: number;
  newY: number;
  parentRect: DOMRect;
  elementRect: DOMRect;
};

type ChecksForSizeParams = {
  newWidth: number;
  newHeight: number;
  position: Position;
  parentRect: DOMRect;
};

export const getBoundaryChecksForPosition = ({
  newX,
  newY,
  parentRect,
  elementRect,
}: ChecksForPositionParams): { adjustedX: number; adjustedY: number } => {
  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;

  // Boundary checks for parent element
  if (newX + elementRect.width > parentRect.width)
    newX = parentRect.width - elementRect.width;
  if (newY + elementRect.height > parentRect.height)
    newY = parentRect.height - elementRect.height;

  return {
    adjustedX: newX,
    adjustedY: newY,
  };
};

export const getBoundaryChecksForSize = ({
  newWidth,
  newHeight,
  position,
  parentRect,
}: ChecksForSizeParams): { adjustedWidth: number; adjustedHeight: number } => {
  // Boundary checks for parent element
  if (newWidth + position.x > parentRect.width)
    newWidth = parentRect.width - position.x;
  if (newHeight + position.y > parentRect.height)
    newHeight = parentRect.height - position.y;

  // Boundary checks for viewport
  const viewportWidth = window.innerWidth + window.scrollX;
  const viewportHeight = window.innerHeight + window.scrollY;

  if (newWidth + position.x > viewportWidth)
    newWidth = viewportWidth - position.x;
  if (newHeight + position.y > viewportHeight)
    newHeight = viewportHeight - position.y;

  return {
    adjustedWidth: newWidth,
    adjustedHeight: newHeight,
  };
};
