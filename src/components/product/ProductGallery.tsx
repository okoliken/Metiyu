import { useState } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { HeartIcon } from "@/components/icons/HeartIcon";
import { AppImage } from "@/components/ui/AppImage";
import { PressableScale } from "@/components/ui/PressableScale";
import { type Product } from "@/data/products";

// Focal "spots" on the product image: the first is the full view, the rest
// zoom into a region. `focusX`/`focusY` are normalized (0–1) points in the
// image frame to bring to centre; `scale` is the zoom factor.
type Spot = { label: string; scale: number; focusX: number; focusY: number };

const SPOTS: Spot[] = [
  { label: "Full view", scale: 1, focusX: 0.5, focusY: 0.5 },
  { label: "Top", scale: 2.2, focusX: 0.5, focusY: 0.22 },
  { label: "Centre", scale: 1.8, focusX: 0.5, focusY: 0.45 },
  { label: "Bottom", scale: 2, focusX: 0.5, focusY: 0.72 },
];

const ZOOM_TIMING = { duration: 420, easing: Easing.out(Easing.cubic) };

// Transform bringing a spot's focal point to the centre of a `width`×`height`
// frame (square for thumbnails; aspect-derived for the main image).
const spotTransform = (
  scale: number,
  focusX: number,
  focusY: number,
  width: number,
  height: number,
) => {
  "worklet";
  return [
    { translateX: -((focusX - 0.5) * width) * scale },
    { translateY: -((focusY - 0.5) * height) * scale },
    { scale },
  ];
};

type ProductGalleryProps = {
  product: Product;
  favorite: boolean;
  onToggleFavorite: () => void;
};

/**
 * Product image viewer on the detail screen. The thumbnail strip is a set of
 * focal "spots"; tapping one animates the main image zooming/panning into that
 * region of the product.
 */
export function ProductGallery({
  product,
  favorite,
  onToggleFavorite,
}: ProductGalleryProps) {
  const [activeSpot, setActiveSpot] = useState(0);

  const frameW = useSharedValue(0);
  const scale = useSharedValue(1);
  const focusX = useSharedValue(0.5);
  const focusY = useSharedValue(0.5);

  const mainImageStyle = useAnimatedStyle(() => {
    const w = frameW.value;
    const h = w / 1.15; // matches the aspect-[1.15] frame
    return {
      transform: spotTransform(scale.value, focusX.value, focusY.value, w, h),
    };
  });

  const selectSpot = (index: number) => {
    setActiveSpot(index);
    const spot = SPOTS[index];
    scale.value = withTiming(spot.scale, ZOOM_TIMING);
    focusX.value = withTiming(spot.focusX, ZOOM_TIMING);
    focusY.value = withTiming(spot.focusY, ZOOM_TIMING);
  };

  return (
    <View className="overflow-hidden rounded-3xl bg-neutral-800 p-4">
      {/* Zoom frame — clips the image as it scales/pans to a spot */}
      <View
        onLayout={(event) => {
          frameW.value = event.nativeEvent.layout.width;
        }}
        className="aspect-[1.15] w-full overflow-hidden rounded-2xl"
      >
        <Animated.View style={[{ flex: 1 }, mainImageStyle]}>
          <AppImage
            source={product.image}
            className="size-full"
            contentFit="contain"
          />
        </Animated.View>
      </View>

      <PressableScale
        onPress={onToggleFavorite}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={
          favorite ? "Remove from favorites" : "Add to favorites"
        }
        className="absolute right-4 top-4 h-10 w-10 items-center justify-center rounded-full bg-neutral-700 active:opacity-80"
      >
        <HeartIcon filled={favorite} size={20} />
      </PressableScale>

      {/* Spot thumbnails — each previews and zooms to a region */}
      <View className="mt-3 flex-row gap-3">
        {SPOTS.map((spot, index) => {
          const active = index === activeSpot;
          return (
            <PressableScale
              key={spot.label}
              onPress={() => selectSpot(index)}
              accessibilityRole="button"
              accessibilityLabel={`Zoom to ${spot.label}`}
              className={`h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 ${
                active ? "border-2 border-primary" : ""
              }`}
            >
              <View
                style={{
                  flex: 1,
                  transform: spotTransform(
                    spot.scale,
                    spot.focusX,
                    spot.focusY,
                    56,
                    56,
                  ),
                }}
                className="w-full"
              >
                <AppImage
                  source={product.image}
                  className="size-full"
                  contentFit="contain"
                />
              </View>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}
