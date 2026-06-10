import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import Animated, { Easing, FadeInDown } from "react-native-reanimated";
import { AppText } from "@/components/ui/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { StarIcon } from "@/components/icons/StarIcon";
import { ReviewItem } from "@/components/product/ReviewItem";
import { Chips } from "@/components/ui/Chips";
import { Screen } from "@/components/layout/Screen";
import { IconButton } from "@/components/ui/IconButton";
import { REVIEWS } from "@/data/reviews";
import { colors } from "@/theme/colors";

type Filter =
  | { type: "all" }
  | { type: "media" }
  | { type: "rating"; rating: number };

// Chip list with live counts. Derived from static data, so it's a constant.
const REVIEW_FILTERS = (() => {
  const ratings = [5, 4, 3, 2, 1].filter((r) =>
    REVIEWS.some((review) => review.rating === r),
  );
  return [
    {
      key: "all",
      label: "All",
      count: REVIEWS.length,
      value: { type: "all" } as Filter,
    },
    {
      key: "media",
      label: "With Media",
      count: REVIEWS.filter((r) => r.media?.length).length,
      value: { type: "media" } as Filter,
    },
    ...ratings.map((rating) => ({
      key: `r${rating}`,
      label: String(rating),
      star: true,
      count: REVIEWS.filter((r) => r.rating === rating).length,
      value: { type: "rating", rating } as Filter,
    })),
  ];
})();

export default function ReviewsScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<Filter>({ type: "all" });

  // The React Compiler memoizes this derivation — no useMemo needed.
  const filtered =
    filter.type === "all"
      ? REVIEWS
      : filter.type === "media"
        ? REVIEWS.filter((r) => r.media?.length)
        : REVIEWS.filter((r) => r.rating === filter.rating);

  const isActive = (value: Filter) =>
    value.type === filter.type &&
    (value.type !== "rating" ||
      (filter.type === "rating" && value.rating === filter.rating));

  // Changes whenever the filter changes, so the list remounts and replays the
  // reveal animation when switching tabs.
  const filterKey = filter.type === "rating" ? `r${filter.rating}` : filter.type;

  return (
    <Screen edges={["top"]}>
      {/* Header */}
      <View className="h-12 flex-row items-center justify-center px-4">
        <IconButton
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          className="absolute left-4"
        >
          <ArrowLeftIcon color={colors.neutral[0]} />
        </IconButton>
        <AppText className="text-xl font-semibold text-neutral-0">
          Reviews
        </AppText>
      </View>

      {/* Filter chips */}
      <Chips
        options={REVIEW_FILTERS.map((chip) => ({
          key: chip.key,
          label: `${chip.label} (${chip.count})`,
          value: chip.value,
          icon:
            "star" in chip && chip.star
              ? (active) => (
                  <StarIcon
                    size={14}
                    color={active ? colors.neutral[950] : colors.yellow}
                  />
                )
              : undefined,
        }))}
        isActive={isActive}
        onSelect={setFilter}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-5 items-start">
          {filtered.map((review, index) => (
            <Animated.View
              // Keyed by filter so switching tabs replays the reveal.
              key={`${filterKey}-${review.id}`}
              entering={FadeInDown.duration(360)
                .delay(index * 45)
                .easing(Easing.out(Easing.cubic))}
              className="w-full"
            >
              <ReviewItem review={review} />
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
