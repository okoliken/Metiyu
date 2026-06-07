import { Pressable, View } from "react-native";
import { router } from "expo-router";

import { StarIcon } from "@/components/icons/StarIcon";
import { AppImage } from "@/components/ui/AppImage";
import { AppText } from "@/components/ui/AppText";
import { type Order } from "@/data/orders";

export function OrderCard({ order }: { order: Order }) {
  const lead = order.items[0].product;
  const extra = order.items.length - 1;

  return (
    <Pressable
      onPress={() => router.push(`/orders/${order.id}`)}
      className="flex-row items-center gap-3 rounded-2xl bg-neutral-900 p-3 active:opacity-80"
    >
      <View className="h-16 w-16 overflow-hidden rounded-xl bg-neutral-800">
        <AppImage source={lead.image} className="size-full" contentFit="contain" />
      </View>

      <View className="flex-1">
        <AppText
          className="text-base font-semibold text-neutral-0"
          numberOfLines={1}
        >
          {lead.name}
        </AppText>

        <View className="mt-1 flex-row items-center gap-1">
          <StarIcon size={16} />
          <AppText className="text-xs font-semibold text-neutral-0">
            {lead.rating.toFixed(1)}
          </AppText>
          <AppText className="text-xs text-neutral-400">
            ({lead.reviews} Reviews)
          </AppText>
        </View>

        <View className="mt-1 flex-row items-center gap-2">
          <AppText className="text-sm font-semibold text-neutral-0">
            ${lead.price}
          </AppText>
          {extra > 0 ? (
            <AppText className="text-xs text-neutral-400">
              +{extra} more item{extra > 1 ? "s" : ""}
            </AppText>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
