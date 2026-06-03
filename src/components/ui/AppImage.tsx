import { Image as ExpoImage } from "expo-image";
import { cssInterop } from "nativewind";

/** expo-image with NativeWind className support (maps className → style). */
export const AppImage = cssInterop(ExpoImage, { className: "style" });
