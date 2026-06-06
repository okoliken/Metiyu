import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { BagIcon } from "@/components/icons/header/BagIcon";
import { CategoryHero } from "@/components/category/CategoryHero";
import { Screen } from "@/components/layout/Screen";
import { ProductCard } from "@/components/product/ProductCard";
import { SortSheet } from "@/components/search/SortSheet";
import { CATEGORIES } from "@/data/categories";
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

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const [sort, setSort] = useState<SortOption>("Newest");
  const [sortVisible, setSortVisible] = useState(false);

  const category = CATEGORIES.find((item) => item.id === id);

  const products = useMemo(() => {
    if (!category) return [];
    const items = PRODUCTS.filter((item) => item.category === category.name);
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
  }, [category, sort]);

  if (!category) {
    return (
      <Screen edges={["top"]}>
        <View className="flex-1 items-center justify-center px-6">
          <AppText className="text-base text-neutral-400">
            Category not found.
          </AppText>
          <Pressable onPress={() => router.back()} className="mt-4">
            <AppText className="text-base font-semibold text-primary">
              Go back
            </AppText>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={["top"]}>
      {/* Header */}
      <View className="h-12 flex-row items-center justify-between px-4">
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 active:bg-neutral-700"
        >
          <ArrowLeftIcon color={colors.neutral[0]} />
        </Pressable>

        <AppText className="text-xl font-semibold text-neutral-0">
          Category
        </AppText>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Bag"
          className="h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 active:bg-neutral-700"
        >
          <BagIcon color={colors.neutral[0]} />
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {/* Hero banner */}
        <View className="px-4 pb-2 pt-2">
          <CategoryHero category={category} />
        </View>

        {/* Sort row — sticks below the banner while scrolling */}
        <View className="border-y border-neutral-800 bg-neutral-950 px-4 py-3">
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

        {/* Product grid */}
        <View className="flex-row flex-wrap justify-between gap-y-5 px-4 pt-4">
          {products.map((product) => (
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

        {products.length === 0 ? (
          <View className="items-center px-6 py-16">
            <AppText className="text-base text-neutral-400">
              No products in this category yet.
            </AppText>
          </View>
        ) : null}
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
