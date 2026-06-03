import { Text, View } from "react-native";

import { AppImage } from "@/components/ui/AppImage";

type PopularProductCardProps = {
  name: string;
  image: number;
};

export function PopularProductCard({ name, image }: PopularProductCardProps) {
  return (
    <View className="aspect-[2.5] w-[48%] overflow-hidden rounded-2xl bg-neutral-800">
      <View className="z-10 flex-1 justify-center pl-4 pr-[40%]">
        <Text className="text-sm font-semibold leading-5 text-neutral-0">
          {name}
        </Text>
      </View>
      <View className="absolute bottom-0 right-0 top-0 w-[52%]">
        <AppImage
          source={image}
          className="size-full"
          contentFit="contain"
          contentPosition="bottom right"
        />
      </View>
    </View>
  );
}
