import { View } from "react-native";

import { type Category } from "@/data/categories";
import { AppImage } from "@/components/ui/AppImage";
import { AppText } from "@/components/ui/AppText";

type CategoryHeroProps = {
  category: Category;
};

const HERO_HEIGHT = 150;

/**
 * Larger sibling of CategoryCard used as the banner at the top of the
 * category detail screen. The product image bleeds toward the top-right.
 */
export function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <View
      className="relative overflow-hidden rounded-3xl bg-neutral-800"
      style={{ height: HERO_HEIGHT }}
    >
      <View className="h-full justify-center px-5">
        <View className="w-[58%]">
          <AppText className="text-[26px] font-bold leading-8 text-neutral-0">
            {category.name}
          </AppText>
          <AppText className="mt-1.5 text-sm leading-5 text-neutral-400">
            {category.description}
          </AppText>
          <View className="mt-3 self-start rounded-full bg-neutral-950 px-3.5 py-1.5">
            <AppText className="text-xs text-neutral-400">
              {category.productCount} Products
            </AppText>
          </View>
        </View>
      </View>

      <View className="absolute bottom-0 right-0 top-0 w-[52%]">
        <AppImage
          source={category.image}
          className="size-full"
          contentFit="contain"
          contentPosition="top right"
        />
      </View>
    </View>
  );
}
