import type { PageNameType } from "~/types";

export const pageList: Record<PageNameType, string> = {
  "All Assets": "/all-assets",
  "3D Illustrations": "/3d-illustrations",
  "Lottie Animations": "/lottie-animations",
  "Dot Lottie": "/dot-lottie",
  Illustrations: "/illustrations",
  Icons: "/icons",
} as const;
