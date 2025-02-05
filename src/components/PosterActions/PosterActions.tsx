"use client";
import React from "react";

import { ActionCard } from "../ActionCard";

import BackgroundIcon from "@/assets/icons/bg-icon.svg";
import ImagePlaceholderIcon from "@/assets/icons/img-placeholder.svg";
import TextIcon from "@/assets/icons/text.svg";

interface PosterActionsProps {
  addImageElement: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTextElement: () => void;
  handleBackgroundChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PosterActions = ({
  addImageElement,
  addTextElement,
  handleBackgroundChange,
}: PosterActionsProps) => {
  return (
    <div className="mb-auto grid grid-cols-2 justify-center gap-x-[29px] gap-y-8">
      <h4 className="col-span-full rounded-[10px] bg-white-97 px-4 py-6 text-md font-bold">
        Add content
      </h4>
      <ActionCard
        icon={<TextIcon width={96} height={96} />}
        text="Add text"
        onClick={addTextElement}
      />
      <ActionCard
        icon={<ImagePlaceholderIcon width={96} height={88} />}
        text="Add image"
        onClick={() => document.getElementById("imageInput")?.click()}
      />
      <input
        className="hidden"
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={addImageElement}
      />
      <ActionCard
        icon={<BackgroundIcon width={96} height={96} />}
        text="Add background image"
        onClick={() => document.getElementById("backgroundInput")?.click()}
      />
      <input
        className="hidden"
        id="backgroundInput"
        type="file"
        accept="image/*"
        onChange={handleBackgroundChange}
      />
    </div>
  );
};
