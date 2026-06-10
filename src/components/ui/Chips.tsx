import { type ReactNode } from "react";
import { ScrollView, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { PressableScale } from "@/components/ui/PressableScale";

export type ChipOption<T> = {
  /** Stable React key. */
  key: string;
  label: string;
  value: T;
  /** Optional leading icon; receives the active state for colouring. */
  icon?: (active: boolean) => ReactNode;
};

type ChipsProps<T> = {
  options: ChipOption<T>[];
  isActive: (value: T) => boolean;
  onSelect: (value: T) => void;
  /** Horizontal scroll with edge padding (filters) vs a static row (pickers). */
  scrollable?: boolean;
  /** "md" = filter tabs (default); "sm" = compact picker, e.g. sizes. */
  size?: "sm" | "md";
};

/**
 * Reusable pill selector. One active option, the rest outlined. Used for the
 * review filters, order-status filters, and the product-detail size picker.
 */
export function Chips<T>({
  options,
  isActive,
  onSelect,
  scrollable = true,
  size = "md",
}: ChipsProps<T>) {
  const pill = size === "sm" ? "h-[31px] min-w-12 px-3" : "h-9 px-4";
  const text = size === "sm" ? "text-base" : "text-sm";

  const chips = options.map((option) => {
    const active = isActive(option.value);
    return (
      <PressableScale
        key={option.key}
        onPress={() => onSelect(option.value)}
        className={`${pill} flex-row items-center justify-center gap-1.5 rounded-full border ${
          active ? "border-primary bg-primary" : "border-neutral-700 bg-transparent"
        }`}
      >
        {option.icon?.(active)}
        <AppText
          className={`${text} font-semibold ${
            active ? "text-neutral-950" : "text-neutral-400"
          }`}
        >
          {option.label}
        </AppText>
      </PressableScale>
    );
  });

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // A horizontal ScrollView otherwise stretches to fill vertical space.
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}
      >
        {chips}
      </ScrollView>
    );
  }

  return <View className="flex-row flex-wrap gap-2">{chips}</View>;
}
