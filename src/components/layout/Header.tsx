import { View } from "react-native";
import { AppText } from "@/components/ui/AppText";

import { BagIcon } from "@/components/icons/header/BagIcon";
import { ChatIcon } from "@/components/icons/header/ChatIcon";
import { SearchIcon } from "@/components/icons/header/SearchIcon";
import { CartBadge } from "@/components/cart/CartBadge";
import { IconButton } from "@/components/ui/IconButton";
import { colors } from "@/theme/colors";

type HeaderProps = {
  title?: string;
  onSearch?: () => void;
  onChat?: () => void;
  onBag?: () => void;
};

export function Header({
  title = "Metiyu",
  onSearch,
  onChat,
  onBag,
}: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-neutral-700 px-4 py-3">
      <AppText className="text-[22px] font-semibold text-neutral-0">
        {title}
      </AppText>

      <View className="flex-row items-center gap-3">
        <IconButton accessibilityLabel="Search" onPress={onSearch}>
          <SearchIcon color={colors.neutral[0]} />
        </IconButton>
        <IconButton accessibilityLabel="Messages" onPress={onChat}>
          <ChatIcon color={colors.neutral[0]} />
        </IconButton>
        <View className="relative">
          <IconButton accessibilityLabel="Bag" onPress={onBag}>
            <BagIcon color={colors.neutral[0]} />
          </IconButton>
          <CartBadge />
        </View>
      </View>
    </View>
  );
}
