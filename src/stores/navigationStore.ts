import { atom, computed } from "nanostores";

export type Screen = "tower" | "menu" | "browse";

export const currentScreen = atom<Screen>("tower");
const pendingScreen = atom<Screen | null>(null);

export const isTransitioning = computed(
  pendingScreen,
  (pending) => pending !== null
);

export const transitionToScreen = (newScreen: Screen) => {
  if (currentScreen.get() === newScreen || pendingScreen.get() !== null) return;
  pendingScreen.set(newScreen);
};

export const commitTransition = () => {
  const next = pendingScreen.get();
  if (next === null) return;
  currentScreen.set(next);
  pendingScreen.set(null);
};
