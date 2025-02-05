import Image from "next/image";

import { ImageElement } from "@/types";

interface ImageLayerProps {
  image: ImageElement;
  size: { width: number; height: number };
  handleDragStart: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMakeItemActionsVisible: () => void;
}

export const ImageLayer = ({
  image,
  size,
  handleDragStart,
  onMakeItemActionsVisible,
}: ImageLayerProps) => {
  return (
    <div
      onClick={onMakeItemActionsVisible}
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
