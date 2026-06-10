import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, TextInput, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { StarIcon } from "@/components/icons/StarIcon";
import { AppImage } from "@/components/ui/AppImage";
import { AppText } from "@/components/ui/AppText";
import { PressableScale } from "@/components/ui/PressableScale";
import { type Order } from "@/data/orders";
import { colors } from "@/theme/colors";

const RATING = [1, 2, 3, 4, 5];

type ReviewSheetProps = {
  /** The order being reviewed, or null when the sheet is closed. */
  order: Order | null;
  onClose: () => void;
  onSubmit?: (input: { order: Order; rating: number; review: string }) => void;
  /** Pause before the sheet rises, so the screen beneath settles first. */
  openDelay?: number;
};

/**
 * "Leave a Review" bottom sheet — opened from an order in the "Give Review"
 * tab. Drives its own slide-up + backdrop-fade with Reanimated (RN's built-in
 * Modal slide drags the whole scrim up, which looks off for a bottom sheet).
 */
export function ReviewSheet({
  order,
  onClose,
  onSubmit,
  openDelay = 280,
}: ReviewSheetProps) {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // Keep the Modal mounted across the exit animation, and hold the last order
  // so its content stays rendered while the sheet slides away.
  const [mounted, setMounted] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const progress = useSharedValue(0); // 0 = hidden, 1 = fully open
  const sheetHeight = useSharedValue(0);

  // Reset the form whenever a different order is opened.
  useEffect(() => {
    if (order) {
      setRating(0);
      setReview("");
    }
  }, [order?.id]);

  useEffect(() => {
    if (order) {
      setActiveOrder(order);
      setMounted(true);
      progress.value = withDelay(
        openDelay,
        withTiming(1, { duration: 340, easing: Easing.out(Easing.cubic) }),
      );
    } else {
      progress.value = withTiming(
        0,
        { duration: 230, easing: Easing.in(Easing.cubic) },
        (finished) => {
          if (finished) runOnJS(setMounted)(false);
        },
      );
    }
  }, [order]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  const panelStyle = useAnimatedStyle(() => {
    // Fall back to an off-screen offset until the panel has been measured.
    const distance = sheetHeight.value || 1000;
    return { transform: [{ translateY: (1 - progress.value) * distance }] };
  });

  const lead = activeOrder?.items[0];

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
        <BlurView
          intensity={25}
          tint="dark"
          style={StyleSheet.absoluteFill}
        />
        <Pressable
          style={[StyleSheet.absoluteFill, { backgroundColor: "#000000A6" }]}
          onPress={onClose}
        />
      </Animated.View>

      {/* Floating panel */}
      {activeOrder && lead ? (
        <Animated.View
          onLayout={(event) => {
            // Slide the panel fully below the screen, margin included.
            sheetHeight.value =
              event.nativeEvent.layout.height + insets.bottom + 24;
          }}
          style={[panelStyle, { marginBottom: insets.bottom + 12 }]}
          className="absolute bottom-0 left-0 right-0 mx-3 rounded-[22px] bg-neutral-800 px-4 pb-4 pt-2"
        >
          {/* Grab handle */}
          <View className="mb-3 mt-2 h-1.5 w-[116px] self-center rounded-[9px] bg-neutral-950" />

          <AppText className="text-center text-lg font-bold text-neutral-0 mt-4">
            Leave a Review
          </AppText>

          {/* Product summary */}
          <View className="mt-5 flex-row items-center gap-3 rounded-2xl bg-neutral-950 p-3">
            <View className="h-[72px] w-[58px] overflow-hidden">
              <AppImage
                source={lead.product.image}
                className="size-full"
                contentFit="contain"
              />
            </View>

            <View className="flex-1">
              <AppText
                className="text-base font-semibold text-neutral-0"
                numberOfLines={1}
              >
                {lead.product.name}
              </AppText>
              <AppText className="mt-0.5 text-xs text-neutral-400">
                Size : {lead.size}
              </AppText>
              <View className="mt-1.5 self-start rounded-full bg-neutral-900 px-3 py-1">
                <AppText className="text-xs font-medium text-neutral-100">
                  Completed
                </AppText>
              </View>
              <AppText className="mt-1.5 text-base font-semibold text-neutral-0">
                ${lead.product.price}
              </AppText>
            </View>
          </View>

          {/* Rating */}
          <AppText className="mt-5 text-center text-lg font-bold text-neutral-0">
            How is your order?
          </AppText>
          <AppText className="mt-3 text-center text-sm text-neutral-400">
            {activeOrder.etaLabel}
          </AppText>

          <View className="mt-4 flex-row items-center justify-center gap-2">
            {RATING.map((value) => (
              <PressableScale
                key={value}
                hitSlop={4}
                onPress={() => setRating(value)}
                accessibilityRole="button"
                accessibilityLabel={`Rate ${value} star${value > 1 ? "s" : ""}`}
              >
                <StarIcon size={20} filled={value <= rating} color={colors.yellow} />
              </PressableScale>
            ))}
          </View>

          {/* Review text */}
          <View className="mt-5 h-12 justify-center rounded-2xl bg-neutral-950 px-4">
            <TextInput
              value={review}
              onChangeText={setReview}
              placeholder="Type review..."
              placeholderTextColor={colors.neutral[400]}
              cursorColor={colors.primary}
              selectionColor={colors.primary}
              className="text-neutral-0"
              style={{
                fontSize: 14,
                padding: 0,
                textAlignVertical: "center",
                includeFontPadding: false,
              }}
            />
          </View>

          {/* Actions */}
          <View className="mt-5 flex-row items-center gap-3">
            <PressableScale
              onPress={onClose}
              className="h-14 flex-1 items-center justify-center rounded-[18px] border border-neutral-700 active:bg-neutral-800"
            >
              <AppText className="text-base font-semibold text-neutral-400">
                Skip
              </AppText>
            </PressableScale>
            <PressableScale
              onPress={() => {
                onSubmit?.({ order: activeOrder, rating, review });
                onClose();
              }}
              disabled={rating === 0}
              className={`h-14 flex-1 items-center justify-center rounded-[18px] bg-primary active:opacity-90 ${
                rating === 0 ? "opacity-40" : ""
              }`}
            >
              <AppText className="text-base font-semibold text-neutral-950">
                Rate
              </AppText>
            </PressableScale>
          </View>
        </Animated.View>
      ) : null}
    </Modal>
  );
}
