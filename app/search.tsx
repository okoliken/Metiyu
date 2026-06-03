import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
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

export default function SearchScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(q ?? "");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [sortVisible, setSortVisible] = useState(false);
  const insets = useSafeAreaInsets();

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
            className="flex-1 text-base text-neutral-0"
          />
        </View>
      </View>

      {/* Result count */}
      <View className="flex-row items-center justify-between px-4 pb-3">
        <Text className="text-base font-medium text-neutral-0">
          Result for {query || ""}
        </Text>
        <Text className="text-sm font-medium text-neutral-400">
          {sortedResults.length} Product
        </Text>
      </View>

      {/* Sort row */}
      <View className="border-y border-neutral-800 px-4 py-2">
        <Pressable
          onPress={() => setSortVisible(true)}
          className="flex-row items-center gap-1 self-start active:opacity-70"
        >
          <Text className="text-base text-neutral-400">Sort by: {sort}</Text>
          <ChevronDownIcon color={colors.neutral[400]} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between gap-y-5">
          {sortedResults.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              rating={product.rating}
              reviews={product.reviews}
              price={product.price}
            />
          ))}
        </View>
      </ScrollView>

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
