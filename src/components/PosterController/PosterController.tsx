"use client";
import dynamic from "next/dynamic";

import EditorIcon from "@/assets/icons/editor.svg";
import ResetIcon from "@/assets/icons/reset.svg";
import WarningIcon from "@/assets/icons/warning.svg";
import usePosterController from "@/hooks/usePosterController";
import { exportToPng } from "@/utils/exportToPng";

import { Button } from "../atoms";
import { PosterActions } from "../PosterActions";

// Nextjs Dialog suspense and lazy loading handler
const Dialog = dynamic(() => import("../Dialog").then((mod) => mod.Dialog), {
  ssr: false,
});

export const PosterController = () => {
  const {
    isDialogOpen,
    addImageElement,
    addTextElement,
    clearPoster,
    handleBackgroundChange,
    handleCloseDialog,
    handleConfirmDialog,
  } = usePosterController();

  return (
    <>
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
            icon={<ResetIcon width={24} height={22} />}
            variant="ghost"
            onClick={clearPoster}
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
        <Button className="ml-auto flex" onClick={exportToPng}>
          Export to PNG
        </Button>
      </section>
      {isDialogOpen && (
        <Dialog
          description="You’re about to reset the whole process. Are you sure?"
          isOpen={isDialogOpen}
          icon={<WarningIcon width={218} height={199} />}
          title="Warning"
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDialog}
        />
      )}
    </>
  );
};
