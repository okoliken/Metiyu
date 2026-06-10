import { View } from "react-native";
import { AppText } from "@/components/ui/AppText";

import { PressableScale } from "@/components/ui/PressableScale";
import { ReviewItem } from "@/components/product/ReviewItem";
import { type Review } from "@/data/reviews";

type ReviewsProps = {
  reviews: Review[];
  count: number;
  onSeeMore?: () => void;
};

export function Reviews({ reviews, count, onSeeMore }: ReviewsProps) {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <AppText className="text-lg font-semibold text-neutral-0">
          Reviews ({count})
        </AppText>
        <PressableScale hitSlop={8} onPress={onSeeMore}>
          <AppText className="text-base text-neutral-400">See More</AppText>
        </PressableScale>
      </View>

      <View className="mt-4 gap-5">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </View>
    </View>
  );
}
