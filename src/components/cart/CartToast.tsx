import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { AppText } from "@/components/ui/AppText";
import { useCart } from "@/lib/cart";
import { colors } from "@/theme/colors";

const VISIBLE_MS = 1600;

/**
 * Global "Added to cart" toast. Mount once near the navigator; it watches the
 * cart's `lastAdded` signal and slides a pill down from the top.
 */
export function CartToast() {
  const { lastAdded } = useCart();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");

  const progress = useSharedValue(0); // 0 hidden → 1 shown

  useEffect(() => {
    if (!lastAdded) return;
    setName(lastAdded.name);
    progress.value = withSequence(
      withTiming(1, { duration: 260, easing: Easing.out(Easing.cubic) }),
      withDelay(
        VISIBLE_MS,
        withTiming(0, { duration: 220, easing: Easing.in(Easing.cubic) }),
      ),
    );
    // Re-fires on every add (lastAdded.at changes).
  }, [lastAdded?.at]);

  const style = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * -20 }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.wrap,
        { top: insets.top + 8 },
        style,
      ]}
    >
      <View className="flex-row items-center gap-2 rounded-full bg-neutral-800 px-4 py-2.5 shadow-lg">
        <View className="h-5 w-5 items-center justify-center rounded-full bg-primary">
          <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
            <Path
              d="M5 12.5L10 17.5L19 7"
              stroke={colors.neutral[950]}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <AppText className="text-sm font-semibold text-neutral-0" numberOfLines={1}>
          Added to cart
        </AppText>
        {name ? (
          <AppText
            className="max-w-[150px] text-sm text-neutral-400"
            numberOfLines={1}
          >
            · {name}
          </AppText>
        ) : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 50,
  },
});
