import { View } from "react-native";

import { StarIcon } from "@/components/icons/StarIcon";
import { colors } from "@/theme/colors";

type RatingStarsProps = {
  rating: number;
  size?: number;
  count?: number;
};

// Renders `count` stars: gold up to the rounded rating, grey for the rest.
export function RatingStars({
  rating,
  size = 14,
  count = 5,
}: RatingStarsProps) {
  const filled = Math.round(rating);

  return (
    <View className="flex-row items-center gap-0.5">
      {Array.from({ length: count }).map((_, index) => (
        <StarIcon
          key={index}
          size={size}
          color={index < filled ? colors.yellow : colors.neutral[600]}
        />
      ))}
    </View>
  );
}
