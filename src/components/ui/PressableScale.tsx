import { type ComponentProps } from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type PressableScaleProps = ComponentProps<typeof Pressable> & {
  /** Scale applied while held down. Lower = more pronounced. */
  scale?: number;
};

/**
 * Drop-in replacement for Pressable that springs the element down a touch while
 * it's held, then back on release. Pairs with the existing `active:` className
 * states for a subtle, tactile press response. Honours `className` via NativeWind
 * just like the rest of the app's animated views.
 */
export function PressableScale({
  scale = 0.96,
  onPressIn,
  onPressOut,
  style,
  ...rest
}: PressableScaleProps) {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - pressed.value * (1 - scale) }],
  }));

  return (
    <AnimatedPressable
      onPressIn={(event) => {
        pressed.value = withTiming(1, { duration: 90 });
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        pressed.value = withTiming(0, { duration: 140 });
        onPressOut?.(event);
      }}
      style={[animatedStyle, style]}
      {...rest}
    />
  );
}
