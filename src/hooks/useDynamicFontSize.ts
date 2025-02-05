import { useEffect } from "react";

const WIDTH_THRESHOLD = 10;
const HEIGHT_THRESHOLD = 2;

export default function useDynamicFontSize(
  containerRef: React.RefObject<HTMLDivElement>,
  textRef: React.RefObject<HTMLTextAreaElement>,
) {
  useEffect(() => {
    const refContainerElement = containerRef.current;
    const refTextElement = textRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (refContainerElement && refTextElement) {
        const containerWidth = refContainerElement.offsetWidth;
        const containerHeight = refContainerElement.offsetHeight;
        const fontSize = Math.min(
          containerWidth / WIDTH_THRESHOLD,
          containerHeight / HEIGHT_THRESHOLD,
        );
        refTextElement.style.fontSize = `${fontSize}px`;
      }
    });

    if (refContainerElement) {
      resizeObserver.observe(refContainerElement);
    }

    return () => {
      if (refContainerElement) {
        resizeObserver.unobserve(refContainerElement);
      }
    };
  }, [containerRef, textRef]);
}
