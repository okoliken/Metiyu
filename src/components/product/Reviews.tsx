import { Pressable, Text, View } from "react-native";

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
        <Text className="text-lg font-semibold text-neutral-0">
          Reviews ({count})
        </Text>
        <Pressable hitSlop={8} onPress={onSeeMore}>
          <Text className="text-base text-neutral-400">See More</Text>
        </Pressable>
      </View>

      <View className="mt-4 gap-5">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </View>
    </View>
  );
}
