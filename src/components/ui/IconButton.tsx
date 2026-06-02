import { type ReactNode } from "react";
import { Pressable } from "react-native";

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
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={`h-10 w-10 items-center justify-center rounded-full bg-neutral-800 active:bg-neutral-700 ${className ?? ""}`}
    >
      {children}
    </Pressable>
  );
}
