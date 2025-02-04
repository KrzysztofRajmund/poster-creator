"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import CloseIcon from "@/assets/icons/close.svg";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";

import { Button } from "../atoms";

interface DialogProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const Dialog = ({
  title,
  description,
  icon,
  isOpen,
  onClose,
  onConfirm,
}: DialogProps) => {
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="mask" />
          <motion.div
            className="bg-black fixed inset-0 z-[9999] flex items-center justify-center bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative min-h-[584px] min-w-[643px] rounded-[10px] bg-white-base p-12"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute right-[36px] top-[36px]"
                onClick={onClose}
                aria-label="Close"
              >
                <CloseIcon width={24} height={24} />
              </button>
              <div className="flex flex-col items-center">
                <div className="mx-[36px] my-[45px]">{icon}</div>
                <p className="mb-2 text-center text-lg font-bold uppercase">
                  {title}
                </p>
                <p className="mb-12 w-[387px] text-center text-md text-black-75">
                  {description}
                </p>
                <div className="flex gap-8">
                  <Button className="px-0" variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={onConfirm}>Reset</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
