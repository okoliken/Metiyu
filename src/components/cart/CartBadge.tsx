import Animated, { ZoomIn } from "react-native-reanimated";

import { AppText } from "@/components/ui/AppText";
import { useCart } from "@/lib/cart";

/**
 * Count bubble for the cart bag icon. Place inside a `relative` wrapper around
 * the icon button; it sits at the top-right and ignores touches.
 */
export function CartBadge() {
  const { count } = useCart();
  if (count === 0) return null;

  return (
    <Animated.View
      // Remount on change so the bubble re-pops when the count updates.
      key={count}
      entering={ZoomIn.duration(200)}
      pointerEvents="none"
      className="absolute -right-1 -top-1 h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1"
    >
      <AppText className="text-[11px] font-bold text-neutral-950">
        {count > 99 ? "99+" : count}
      </AppText>
    </Animated.View>
  );
}
