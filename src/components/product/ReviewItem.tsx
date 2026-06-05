import { View } from "react-native";
import { AppText } from "@/components/ui/AppText";

import { RatingStars } from "@/components/product/RatingStars";
import { AppImage } from "@/components/ui/AppImage";
import { type Review } from "@/data/reviews";

const MAX_THUMBS = 3;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewMedia({ media }: { media: number[] }) {
  const overflow = media.length > MAX_THUMBS;
  // When overflowing, show 2 images + a "+N" tile; otherwise show up to 3.
  const visible = overflow ? media.slice(0, 2) : media.slice(0, MAX_THUMBS);

  return (
    <View className="mt-3 flex-row gap-2">
      {visible.map((image, index) => (
        <View
          key={index}
          className="h-10 w-10 overflow-hidden rounded-[10px] bg-neutral-800"
        >
          <AppImage source={image} className="size-full" contentFit="cover" />
        </View>
      ))}
      {overflow ? (
        <View className="h-10 w-10 items-center justify-center rounded-[10px] bg-neutral-400">
          <AppText className="text-base font-semibold text-neutral-0">
            {media.length - 2}+
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

export function ReviewItem({ review }: { review: Review }) {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-neutral-700">
            <AppText className="text-sm font-semibold text-neutral-0">
              {initials(review.name)}
            </AppText>
          </View>
          <View className="gap-1">
            <AppText className="text-base font-semibold text-neutral-0">
              {review.name}
            </AppText>
            <RatingStars rating={review.rating} size={14} />
          </View>
        </View>
        <AppText className="text-sm text-neutral-400">{review.time}</AppText>
      </View>

      <AppText className="mt-2 text-sm leading-5 text-neutral-400">
        {review.comment}
      </AppText>

      {review.media?.length ? <ReviewMedia media={review.media} /> : null}
    </View>
  );
}
