import Image from "next/image";

import { ImageElement } from "@/types";

interface ImageLayerProps {
  image: ImageElement;
  size: { width: number; height: number };
  handleDragStart: (e: React.MouseEvent<HTMLDivElement>) => void;
  setIsVisible: (visible: boolean) => void;
}

export const ImageLayer = ({
  image,
  size,
  handleDragStart,
  setIsVisible,
}: ImageLayerProps) => {
  return (
    <div
      onClick={() => setIsVisible(true)}
      onMouseDown={handleDragStart}
      className="relative cursor-move bg-transparent"
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
};
