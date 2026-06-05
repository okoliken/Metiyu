import { View } from "react-native";

import {
  CATEGORY_CARD_HEIGHT,
  type Category,
} from "@/data/categories";
import { AppImage } from "@/components/ui/AppImage";
import { AppText } from "@/components/ui/AppText";

type CategoryCardProps = {
  category: Category;
};

function getImagePosition(category: Category) {
  const { imageLayout } = category;
  const { width, height, right = 0, align = "center", offsetY = 0 } =
    imageLayout;

  if (align === "bottom") {
    return {
      width,
      height,
      right,
      bottom: -offsetY,
    };
  }

  return {
    width,
    height,
    right,
    top: (CATEGORY_CARD_HEIGHT - height) / 2 + offsetY,
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <View
      className="relative overflow-hidden rounded-3xl"
      style={{
        height: CATEGORY_CARD_HEIGHT,
        marginBottom: category.spacingBottom ?? 16,
      }}
    >
      <View className="absolute inset-0 rounded-3xl bg-neutral-800" />

      <View className="h-full justify-center px-5">
        <View className="w-[54%]">
          <AppText className="text-xl font-bold text-neutral-0">
            {category.name}
          </AppText>
          <AppText className="mt-1 text-sm leading-5 text-neutral-400">
            {category.description}
          </AppText>
          <View className="mt-3 self-start rounded-full bg-neutral-950 px-3.5 py-1.5">
            <AppText className="text-xs text-neutral-400">
              {category.productCount} Products
            </AppText>
          </View>
        </View>
      </View>

      <View className="absolute" style={getImagePosition(category)}>
        <AppImage
          source={category.image}
          className="size-full"
          contentFit="contain"
          contentPosition={category.imageLayout.contentPosition ?? "center"}
        />
      </View>
    </View>
  );
}
