import { router, useLocalSearchParams } from "expo-router";
import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  TextInput,
  View,
  type ViewToken,
} from "react-native";
import { AppText } from "@/components/ui/AppText";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { SearchIcon } from "@/components/icons/header/SearchIcon";
import { IconButton } from "@/components/ui/IconButton";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSheet } from "@/components/search/SortSheet";
import { Screen } from "@/components/layout/Screen";
import { PRODUCTS, type Product } from "@/data/products";
import { colors } from "@/theme/colors";

const SORT_OPTIONS = [
  "Newest",
  "Trending",
  "Price: Low to High",
  "Price: High to Low",
  "Best Rating",
] as const;

type SortOption = (typeof SORT_OPTIONS)[number];

function sortProducts(items: Product[], sort: SortOption): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "Price: Low to High":
      return sorted.sort((a, b) => a.price - b.price);
    case "Price: High to Low":
      return sorted.sort((a, b) => b.price - a.price);
    case "Best Rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "Trending":
      return sorted.sort((a, b) => b.reviews - a.reviews);
    case "Newest":
    default:
      return sorted; // original order
  }
}

// An item counts as "in view" once 30% of it is visible.
const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 30 };
const COLUMN_WRAPPER = {
  justifyContent: "space-between" as const,
  marginBottom: 20,
};

/**
 * Fades + slides a card into place the first time it enters the viewport
 * (driven by the FlatList's onViewableItemsChanged). Latches via `revealed`,
 * so cards remounted by virtualization re-appear instantly without replaying.
 */
function ScrollRevealItem({
  revealed,
  children,
}: {
  revealed: boolean;
  children: ReactNode;
}) {
  const progress = useSharedValue(revealed ? 1 : 0);
  const hasAnimated = useRef(revealed);

  useEffect(() => {
    if (revealed && !hasAnimated.current) {
      hasAnimated.current = true;
      // .set()/.get() (not .value) so the React Compiler can track it.
      progress.set(
        withTiming(1, { duration: 420, easing: Easing.out(Easing.cubic) }),
      );
    }
  }, [revealed, progress]);

  const style = useAnimatedStyle(() => ({
    opacity: progress.get(),
    transform: [{ translateY: (1 - progress.get()) * 24 }],
  }));

  return (
    <Animated.View className="w-[48%]" style={style}>
      {children}
    </Animated.View>
  );
}

export default function SearchScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(q ?? "");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [sortVisible, setSortVisible] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(() => new Set());
  const insets = useSafeAreaInsets();

  // Stable callback (FlatList requires the reference not to change).
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setRevealedIds((prev) => {
        let changed = false;
        const next = new Set(prev);
        for (const token of viewableItems) {
          const id = (token.item as Product).id;
          if (id && !next.has(id)) {
            next.add(id);
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    },
  ).current;

  // The React Compiler memoizes this derivation — no useMemo needed.
  const sortedResults = sortProducts(PRODUCTS, sort);

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

      <FlatList
        data={sortedResults}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={COLUMN_WRAPPER}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 16 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
        renderItem={({ item }) => (
          <ScrollRevealItem revealed={revealedIds.has(item.id)}>
            <ProductCard
              id={item.id}
              name={item.name}
              image={item.image}
              rating={item.rating}
              reviews={item.reviews}
              price={item.price}
              widthClassName="w-full"
            />
          </ScrollRevealItem>
        )}
      />

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
