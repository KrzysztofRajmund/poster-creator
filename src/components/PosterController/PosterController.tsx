"use client";
import usePosterController from "@/hooks/usePosterController";

import EditorIcon from "@/assets/icons/editor.svg";
import ResetIcon from "@/assets/icons/reset.svg";

import { Button } from "../atoms";
import { PosterActions } from "../PosterActions";

export const PosterController = () => {
  const { addTextElement, addImageElement, handleBackgroundChange } =
    usePosterController();

  return (
    <section className="flex h-[948px] w-[759px] flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <EditorIcon width={48} height={48} />
          <h2 className="leading-12 text-lg font-bold text-black-75">
            CanvasEditor
          </h2>
        </div>
        <Button
          className="h-90 h-8 w-fit border-b border-red-100 p-0 text-red-100"
          variant="ghost"
          icon={<ResetIcon width={24} height={22} />}
        >
          Reset
        </Button>
      </div>
      <div className="flex-1 justify-center border-b-2 border-t-2 border-white-98 py-8">
        <PosterActions
          addTextElement={addTextElement}
          addImageElement={addImageElement}
          handleBackgroundChange={handleBackgroundChange}
        />
      </div>
      {/* TODO: Implement Export to PNG */}
      <Button className="ml-auto flex" onClick={() => {}}>
        Export to PNG
      </Button>
    </section>
  );
};
