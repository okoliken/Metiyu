import { Pressable, Text, View } from "react-native";

import { AppImage } from "@/components/ui/AppImage";
import { StarIcon } from "@/components/icons/StarIcon";
import { router } from "expo-router";

type ProductCardProps = {
  id: string;
  name: string;
  image: number;
  rating: number;
  reviews: number;
  price: number;
  disabled?: boolean;
};

export function ProductCard({
  id,
  name,
  image,
  rating,
  reviews,
  price,
  disabled = false,
}: ProductCardProps) {
  return (
    <Pressable className="w-[48%]" onPress={() => router.push(`/product/${id}`)} disabled={disabled}>
      <View className="aspect-[180/176] w-full overflow-hidden rounded-2xl bg-neutral-800">
        <AppImage source={image} className="size-full" contentFit="contain" />
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
