import { Platform } from "react-native";

export type StackAnimation =
  | "default"
  | "fade"
  | "fade_from_bottom"
  | "flip"
  | "simple_push"
  | "slide_from_bottom"
  | "slide_from_left"
  | "slide_from_right"
  | "none";

/**
 * Platform-aware stack transition.
 *
 * iOS gets the `ios` animation (native slides feel right and render smoothly).
 * Android gets `android` — defaults to `fade`, because the slide transitions can
 * flash a blank frame while the revealed screen paints; a cross-fade keeps both
 * screens mounted through the transition.
 *
 * Pass a different `ios` per screen, e.g. `stackAnimation("slide_from_bottom")`
 * for a modal-style detail. Use in a navigator's `screenOptions.animation` or a
 * screen's `options.animation`.
 */
export function stackAnimation(
  ios: StackAnimation = "slide_from_right",
  android: StackAnimation = "fade",
): StackAnimation {
  return Platform.select({ ios, android, default: ios });
}
