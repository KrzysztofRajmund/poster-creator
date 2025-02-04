export const getBoundaryChecksForPosition = (
  newX: number,
  newY: number,
  parentRect: DOMRect,
  dragIconRect: DOMRect,
): { adjustedX: number; adjustedY: number } => {
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

export const getBoundaryChecksForSize = (
  newWidth: number,
  newHeight: number,
  position: { x: number; y: number },
  parentRect: DOMRect,
): { adjustedWidth: number; adjustedHeight: number } => {
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
