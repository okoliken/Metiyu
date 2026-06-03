import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { SearchIcon } from "@/components/icons/header/SearchIcon";
import { IconButton } from "@/components/ui/IconButton";
import { ProductCard } from "@/components/product/ProductCard";
import { Screen } from "@/components/layout/Screen";
import { colors } from "@/theme/colors";

const RESULTS = [
  {
    id: "1",
    name: "Striped Polo Shirt",
    image: require("../assets/images/products/tshirt1.png"),
    rating: 4.8,
    reviews: 562,
    price: 42,
  },
  {
    id: "2",
    name: "Color Block V-Neck Tee",
    image: require("../assets/images/products/tshirt2.png"),
    rating: 4.9,
    reviews: 562,
    price: 45,
  },
  {
    id: "3",
    name: "Essential Yellow Tee",
    image: require("../assets/images/products/tshirt3.png"),
    rating: 4.7,
    reviews: 562,
    price: 38,
  },
  {
    id: "4",
    name: "Graphic Casual T-Shirt",
    image: require("../assets/images/products/tshirt4.png"),
    rating: 4.8,
    reviews: 562,
    price: 40,
  },
] as const;

export default function SearchScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const [query, setQuery] = useState(q ?? "");
  const insets = useSafeAreaInsets();

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
          {RESULTS.length} Product
        </Text>
      </View>

      {/* Sort row */}
      <View className="border-y border-neutral-800 px-4 py-2">
        <Pressable className="flex-row items-center gap-1 self-start active:opacity-70">
          <Text className="text-base text-neutral-400">Sort by: Newest</Text>
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
          {RESULTS.map((product) => (
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
    </Screen>
  );
}
