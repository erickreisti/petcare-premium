"use client";
import { useEffect, useRef } from "react";
import { magnetic } from "@/lib/motion";

/** Ref para um botão que segue levemente o cursor (veja `magnetic`) */
export function useMagnetic<T extends HTMLElement>(strength?: number, radius?: number, max?: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;
    return magnetic(ref.current, strength, radius, max);
  }, [strength, radius, max]);

  return ref;
}
