"use client";
import { createContext } from "react";

import { ContextType } from "./PosterProvider.types";

export const PosterContext = createContext<ContextType | null>(null);
