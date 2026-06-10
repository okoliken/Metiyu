import { type ReactNode } from "react";

import { PressableScale } from "@/components/ui/PressableScale";

type IconButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
  accessibilityLabel?: string;
};

// Circular dark action button used in headers (search / chat / bag, etc.).
export function IconButton({
  children,
  onPress,
  className,
  accessibilityLabel,
}: IconButtonProps) {
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={`h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 active:bg-neutral-700 ${className ?? ""}`}
    >
      {children}
    </PressableScale>
  );
}
