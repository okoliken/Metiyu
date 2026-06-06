import { router, useLocalSearchParams } from "expo-router";
import { type ReactNode, useMemo, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { SearchIcon } from "@/components/icons/header/SearchIcon";
import { IconButton } from "@/components/ui/IconButton";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSheet } from "@/components/search/SortSheet";
import { Screen } from "@/components/layout/Screen";
import { PRODUCTS } from "@/data/products";
import { colors } from "@/theme/colors";

const SORT_OPTIONS = [
  "Newest",
  "Trending",
  "Price: Low to High",
  "Price: High to Low",
  "Best Rating",
] as const;

type SortOption = (typeof SORT_OPTIONS)[number];

// How far past the viewport's bottom edge an item must travel before it reveals.
const TRIGGER_INSET = 70;

/**
 * Fades + slides a grid item into place the first time it enters the viewport,
 * then latches so it never replays. Scroll-position driven (no spring), so it
 * stays smooth. Scoped to the search screen.
 */
function ScrollRevealItem({
  scrollY,
  viewportHeight,
  children,
}: {
  scrollY: SharedValue<number>;
  viewportHeight: number;
  children: ReactNode;
}) {
  const offset = useSharedValue(-1); // -1 until measured
  const progress = useSharedValue(0);
  const triggered = useSharedValue(false);

  useAnimatedReaction(
    () => {
      if (offset.value < 0 || !viewportHeight) return false;
      // Item top relative to the viewport's top edge.
      return offset.value - scrollY.value < viewportHeight - TRIGGER_INSET;
    },
    (inView) => {
      if (inView && !triggered.value) {
        triggered.value = true;
        progress.value = withTiming(1, {
          duration: 420,
          easing: Easing.out(Easing.cubic),
        });
      }
    },
  );

  const style = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 24 }],
  }));

  return (
    <Animated.View
      onLayout={(e) => {
        offset.value = e.nativeEvent.layout.y;
      }}
      className="w-[48%]"
      style={style}
    >
      {children}
    </Animated.View>
  );
}

export default function SearchScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(q ?? "");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [sortVisible, setSortVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const insets = useSafeAreaInsets();

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const sortedResults = useMemo(() => {
    const items = [...PRODUCTS];
    switch (sort) {
      case "Price: Low to High":
        return items.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return items.sort((a, b) => b.price - a.price);
      case "Best Rating":
        return items.sort((a, b) => b.rating - a.rating);
      case "Trending":
        return items.sort((a, b) => b.reviews - a.reviews);
      case "Newest":
      default:
        return items; // original order
    }
  }, [sort]);

  return (
    <Screen edges={["top"]}>
      {/* Search bar row */}
      <View className="flex-row items-center gap-1 px-4 pb-3 pt-1">
        <IconButton accessibilityLabel="Go back" onPress={() => router.back()}>
          <ArrowLeftIcon color={colors.neutral[0]} />
        </IconButton>

        <View className="flex-1 flex-row items-center gap-2 rounded-xl bg-neutral-800 p-2">
          <SearchIcon color={colors.neutral[0]} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search products"
            placeholderTextColor={colors.neutral[400]}
            autoFocus
            cursorColor={colors.primary}
            selectionColor={colors.primary}
            returnKeyType="search"
            className="flex-1 text-neutral-0"
            // fontSize without text-base's lineHeight, which mis-centers text on iOS.
            style={{
              fontSize: 16,
              padding: 0,
              textAlignVertical: "center",
              includeFontPadding: false,
            }}
          />
        </View>
      </View>

      {/* Result count */}
      <View className="flex-row items-center justify-between px-4 pb-3">
        <AppText className="text-base font-medium text-neutral-0">
          Result for {query || ""}
        </AppText>
        <AppText className="text-sm font-medium text-neutral-400">
          {sortedResults.length} Product
        </AppText>
      </View>

      {/* Sort row */}
      <View className="border-y border-neutral-800 px-4 py-2">
        <Pressable
          onPress={() => setSortVisible(true)}
          className="flex-row items-center gap-1 self-start active:opacity-70"
        >
          <AppText className="text-base text-neutral-400">
            Sort by: {sort}
          </AppText>
          <ChevronDownIcon color={colors.neutral[400]} />
        </Pressable>
      </View>

      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        onLayout={(e) => setViewportHeight(e.nativeEvent.layout.height)}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between gap-y-5">
          {sortedResults.map((product) => (
            <ScrollRevealItem
              key={product.id}
              scrollY={scrollY}
              viewportHeight={viewportHeight}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                price={product.price}
                widthClassName="w-full"
              />
            </ScrollRevealItem>
          ))}
        </View>
      </Animated.ScrollView>

      <SortSheet
        visible={sortVisible}
        options={SORT_OPTIONS}
        selected={sort}
        onSelect={(option) => {
          setSort(option as SortOption);
          setSortVisible(false);
        }}
        onClose={() => setSortVisible(false)}
      />
    </Screen>
  );
}
