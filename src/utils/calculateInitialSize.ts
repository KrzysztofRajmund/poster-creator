const MAX_DIMENSION = 300;

export function calculateInitialSize(width: number, height: number) {
  const aspectRatio = width / height;
  if (width > height) {
    return {
      width: MAX_DIMENSION,
      height: MAX_DIMENSION / aspectRatio,
    };
  } else {
    return {
      width: MAX_DIMENSION * aspectRatio,
      height: MAX_DIMENSION,
    };
  }
}
