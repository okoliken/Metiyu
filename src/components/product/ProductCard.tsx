import { Pressable, Text, View } from "react-native";
import { useState } from "react";

import { AppImage } from "@/components/ui/AppImage";
import { StarIcon } from "@/components/icons/StarIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { router } from "expo-router";

type ProductCardProps = {
  id: string;
  name: string;
  image: number;
  rating: number;
  reviews: number;
  price: number;
  disabled?: boolean;
  /** Width utility — defaults to a 2-column grid card; override for carousels. */
  widthClassName?: string;
};

export function ProductCard({
  id,
  name,
  image,
  rating,
  reviews,
  price,
  disabled = false,
  widthClassName = "w-[48%]",
}: ProductCardProps) {
  const [favorite, setFavorite] = useState(false);

  return (
    <Pressable className={widthClassName} onPress={() => router.push(`/product/${id}`)} disabled={disabled}>
      <View className="aspect-[180/176] w-full overflow-hidden rounded-2xl bg-neutral-800">
        <AppImage source={image} className="size-full" contentFit="contain" />
        <Pressable
          onPress={() => setFavorite((prev) => !prev)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={favorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-2 top-2 h-6 w-6 flex-row items-center justify-center rounded-full bg-neutral-600 active:opacity-80"
        >
          <HeartIcon filled={favorite} size={12} />
        </Pressable>
      </View>

      <Text
        className="mt-2.5 text-sm font-semibold text-neutral-0"
        numberOfLines={1}
      >
        {name}
      </Text>

      <View className="mt-1 flex-row items-center gap-1">
        <StarIcon size={16} />
        <Text className="text-xs font-semibold text-neutral-0">
          {rating.toFixed(1)}
        </Text>
        <Text className="text-xs text-neutral-400">({reviews} Reviews)</Text>
      </View>

      <Text className="mt-1 text-sm font-semibold text-neutral-0">
        ${price}
      </Text>
    </Pressable>
  );
}
