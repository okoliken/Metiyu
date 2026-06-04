import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { StarIcon } from "@/components/icons/StarIcon";
import { ReviewItem } from "@/components/product/ReviewItem";
import { Screen } from "@/components/layout/Screen";
import { IconButton } from "@/components/ui/IconButton";
import { REVIEWS } from "@/data/reviews";
import { colors } from "@/theme/colors";

type Filter =
  | { type: "all" }
  | { type: "media" }
  | { type: "rating"; rating: number };

export default function ReviewsScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<Filter>({ type: "all" });

  // Build the chip list with live counts derived from the data.
  const filters = useMemo(() => {
    const ratings = [5, 4, 3, 2, 1].filter((r) =>
      REVIEWS.some((review) => review.rating === r),
    );
    return [
      { key: "all", label: "All", count: REVIEWS.length, value: { type: "all" } as Filter },
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
  }, []);

  const filtered = useMemo(() => {
    if (filter.type === "all") return REVIEWS;
    if (filter.type === "media") return REVIEWS.filter((r) => r.media?.length);
    return REVIEWS.filter((r) => r.rating === filter.rating);
  }, [filter]);

  const isActive = (value: Filter) =>
    value.type === filter.type &&
    (value.type !== "rating" ||
      (filter.type === "rating" && value.rating === filter.rating));

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
        <Text className="text-xl font-semibold text-neutral-0">Reviews</Text>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // A horizontal ScrollView otherwise stretches to fill vertical space.
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 16, paddingVertical: 12 }}
      >
        {filters.map((chip) => {
          const active = isActive(chip.value);
          return (
            <Pressable
              key={chip.key}
              onPress={() => setFilter(chip.value)}
              className={`h-9 flex-row items-center justify-center gap-1.5 rounded-full border px-4 ${
                active
                  ? "border-primary bg-primary"
                  : "border-neutral-700 bg-transparent"
              }`}
            >
              {"star" in chip && chip.star ? (
                <StarIcon
                  size={14}
                  color={active ? colors.neutral[950] : colors.yellow}
                />
              ) : null}
              <Text
                className={`text-sm font-semibold ${
                  active ? "text-neutral-950" : "text-neutral-400"
                }`}
              >
                {chip.label} ({chip.count})
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

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
          {filtered.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
