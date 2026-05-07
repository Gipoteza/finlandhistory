"use client";

// SSR-safe GSAP plugin registration
// This module only runs in the browser environment

let gsapRegistered = false;

export async function registerGSAPPlugins() {
  if (typeof window === "undefined") return;
  if (gsapRegistered) return;

  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);
  gsapRegistered = true;

  return { gsap, ScrollTrigger };
}

export function getGSAP() {
  if (typeof window === "undefined") return null;
  // Dynamic import is handled by registerGSAPPlugins
  // This is a synchronous accessor after registration
  return typeof window !== "undefined" ? require("gsap").gsap : null;
}
