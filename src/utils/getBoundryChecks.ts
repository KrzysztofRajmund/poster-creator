import { Position } from "@/hooks/useDraggableResizable";

type ChecksForPositionParams = {
  newX: number;
  newY: number;
  parentRect: DOMRect;
  dragIconRect: DOMRect;
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
  dragIconRect,
}: ChecksForPositionParams): { adjustedX: number; adjustedY: number } => {
  const dragIconOffsetX = dragIconRect.width / 2;
  const dragIconOffsetY = dragIconRect.height / 2;

  // Adjust boundaries according to the drag icon size
  if (newX < -dragIconOffsetX) newX = -dragIconOffsetX;
  if (newY < -dragIconOffsetY) newY = -dragIconOffsetY;

  // Boundary checks for parent element
  if (newX + dragIconOffsetX > parentRect.width)
    newX = parentRect.width - dragIconOffsetX;
  if (newY + dragIconOffsetY > parentRect.height)
    newY = parentRect.height - dragIconOffsetY;

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
