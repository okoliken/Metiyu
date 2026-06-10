import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BagIcon } from "@/components/icons/header/BagIcon";
import { AppImage } from "@/components/ui/AppImage";
import { AppText } from "@/components/ui/AppText";
import { Chips } from "@/components/ui/Chips";
import { PressableScale } from "@/components/ui/PressableScale";
import { type Product } from "@/data/products";
import { colors } from "@/theme/colors";

const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
type Size = (typeof SIZES)[number];

const DEFAULT_STOCK = 12;

type BuySheetProps = {
  /** The product to buy, or null when the sheet is closed. */
  product: Product | null;
  /** Pre-select the size chosen on the detail screen. */
  initialSize?: Size;
  onClose: () => void;
  onAddToCart?: (input: { product: Product; size: Size }) => void;
};

/**
 * Bottom sheet shown when "Buy Now" is tapped on the detail screen. Lets the
 * shopper confirm a size and add to cart. Drives its own slide-up + backdrop
 * fade with Reanimated, matching ReviewSheet.
 */
export function BuySheet({
  product,
  initialSize = "S",
  onClose,
  onAddToCart,
}: BuySheetProps) {
  const insets = useSafeAreaInsets();
  const [size, setSize] = useState<Size>(initialSize);

  // Keep the Modal mounted across the exit animation, and hold the last product
  // so its content stays rendered while the sheet slides away.
  const [mounted, setMounted] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const progress = useSharedValue(0); // 0 = hidden, 1 = fully open
  const sheetHeight = useSharedValue(0);

  // Sync the selected size whenever a new product opens the sheet.
  useEffect(() => {
    if (product) setSize(initialSize);
  }, [product?.id]);

  useEffect(() => {
    if (product) {
      setActiveProduct(product);
      setMounted(true);
      progress.value = withTiming(1, {
        duration: 340,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = withTiming(
        0,
        { duration: 230, easing: Easing.in(Easing.cubic) },
        (finished) => {
          if (finished) runOnJS(setMounted)(false);
        },
      );
    }
  }, [product]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  const panelStyle = useAnimatedStyle(() => {
    // Fall back to an off-screen offset until the panel has been measured.
    const distance = sheetHeight.value || 1000;
    return { transform: [{ translateY: (1 - progress.value) * distance }] };
  });

  const stock = activeProduct?.stock ?? DEFAULT_STOCK;

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop — blurred dark scrim, fades with the sheet, tap to dismiss */}
      <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]}>
        <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
        <Pressable
          style={[StyleSheet.absoluteFill, { backgroundColor: "#000000A6" }]}
          onPress={onClose}
        />
      </Animated.View>

      {/* Floating panel */}
      {activeProduct ? (
        <Animated.View
          onLayout={(event) => {
            // Slide the panel fully below the screen, margin included.
            sheetHeight.value =
              event.nativeEvent.layout.height + insets.bottom + 24;
          }}
          style={[panelStyle, { marginBottom: insets.bottom + 12 }]}
          className="absolute bottom-0 left-0 right-0 mx-3 rounded-[22px] bg-neutral-800 px-5 pb-5 pt-2"
        >
          {/* Grab handle */}
          <View className="mb-2 mt-2 h-1.5 w-[116px] self-center rounded-[9px] bg-neutral-950" />

          {/* Product summary */}
          <View className="mt-3 flex-row items-center gap-4">
            <View className="h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 p-2">
              <AppImage
                source={activeProduct.image}
                className="size-full"
                contentFit="contain"
              />
            </View>

            <View className="flex-1">
              <AppText
                className="text-xl font-bold text-neutral-0"
                numberOfLines={2}
              >
                {activeProduct.name}
              </AppText>
              <AppText className="mt-1 text-base text-neutral-400">
                Stock Available {stock}
              </AppText>
              <AppText className="mt-1 text-xl font-bold text-neutral-0">
                ${activeProduct.price}
              </AppText>
            </View>
          </View>

          {/* Size selector */}
          <AppText className="mt-5 text-lg font-semibold text-neutral-0">
            Size
          </AppText>
          <View className="mt-3">
            <Chips
              options={SIZES.map((s) => ({ key: s, label: s, value: s }))}
              isActive={(s) => s === size}
              onSelect={setSize}
              scrollable={false}
              size="sm"
            />
          </View>

          {/* Add to cart */}
          <PressableScale
            onPress={() => {
              onAddToCart?.({ product: activeProduct, size });
              onClose();
            }}
            className="mt-6 h-14 flex-row items-center justify-center gap-2 rounded-[18px] bg-primary active:opacity-90"
          >
            <BagIcon color={colors.neutral[950]} size={20} />
            <AppText className="text-base font-semibold text-neutral-950">
              Add to Cart
            </AppText>
          </PressableScale>
        </Animated.View>
      ) : null}
    </Modal>
  );
}
