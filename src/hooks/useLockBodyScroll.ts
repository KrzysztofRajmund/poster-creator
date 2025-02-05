"use client";
import { useLayoutEffect } from "react";

export default function useLockBodyScroll(locked: boolean) {
  useLayoutEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [locked]);
}
