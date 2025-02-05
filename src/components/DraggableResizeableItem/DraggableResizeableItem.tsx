"use client";
import { useMemo } from "react";

import clsx from "clsx";

import DragIcon from "@/assets/icons/drag.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import { INIT_POSITION, INIT_SIZE } from "@/constants";
import useDraggableResizable, { Size } from "@/hooks/useDraggableResizable";
import { ImageElement } from "@/types";

import { ImageLayer } from "./ImageLayer";
import { TextLayer } from "./TextLayer";

interface DraggableResizableProps {
  layerIndex: number;
  image?: ImageElement;
  initialSize?: Size;
  onRemove: () => void;
}

export const DraggableResizableItem = ({
  layerIndex,
  image,
  initialSize = INIT_SIZE,
  onRemove,
}: DraggableResizableProps) => {
  const {
    elementRef,
    position,
    isVisible,
    size,
    handleDragStart,
    handlePropagation,
    handleResize,
    setIsVisible,
  } = useDraggableResizable({
    initPosition: INIT_POSITION,
    initSize: initialSize,
    isImage: !!image,
  });

  const renderEditableContent = useMemo(() => {
    if (image) {
      return (
        <ImageLayer
          image={image}
          size={size}
          setIsVisible={setIsVisible}
          handleDragStart={handleDragStart}
        />
      );
    }

    return <TextLayer isVisible={isVisible} ref={elementRef} />;
  }, [elementRef, handleDragStart, image, isVisible, setIsVisible, size]);

  return (
    <div
      ref={elementRef}
      className={clsx("absolute bg-transparent outline outline-2", {
        "outline-primary": isVisible,
        "outline-transparent": !isVisible,
      })}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: layerIndex,
      }}
      onMouseDown={() => setIsVisible(true)}
    >
      {/* Drag handle*/}
      <div
        className="drag-icon absolute left-0 top-0 flex h-10 w-10 translate-x-[-50%] translate-y-[-50%] cursor-move items-center justify-center rounded-full bg-white-base"
        onMouseDown={handleDragStart}
        style={{
          zIndex: layerIndex + 1,
        }}
      >
        <DragIcon width={24} height={24} />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        {renderEditableContent}
        {isVisible ? (
          <>
            {/* Trash handle*/}
            <div
              className="absolute right-0 top-0 flex h-6 w-6 translate-x-[50%] translate-y-[-50%] cursor-pointer items-center justify-center rounded-full bg-white-base"
              onClick={onRemove}
              onMouseDown={handlePropagation}
            >
              <TrashIcon width={12} height={14} />
            </div>
            {/* Resize handle*/}
            <div
              className="absolute bottom-0 right-0 h-6 w-6 translate-x-[50%] translate-y-[50%] cursor-se-resize rounded-full border-4 border-white-base bg-primary"
              onMouseDown={handleResize}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
