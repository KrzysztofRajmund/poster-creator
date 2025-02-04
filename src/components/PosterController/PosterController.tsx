"use client";
import usePosterController from "@/hooks/usePosterController";

import EditorIcon from "@/assets/icons/editor.svg";
import ResetIcon from "@/assets/icons/reset.svg";
import WarningIcon from "@/assets/icons/warning.svg";

import { Button } from "../atoms";
import { Dialog } from "../Dialog";
import { PosterActions } from "../PosterActions";

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
        {/* TODO: Implement Export to PNG */}
        <Button className="ml-auto flex" onClick={() => {}}>
          Export to PNG
        </Button>
      </section>
      <Dialog
        description="You’re about to reset whole process. Are you sure you want to do it?"
        title="Warning"
        isOpen={isDialogOpen}
        icon={<WarningIcon width={218} height={199} />}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDialog}
      />
    </>
  );
};
