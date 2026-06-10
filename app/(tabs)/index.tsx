import { FlatList, ScrollView, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import Animated, { Easing, FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";

import { PressableScale } from "@/components/ui/PressableScale";
import { PopularProductCard } from "@/components/home/PopularProductCard";
import { ProductCard } from "@/components/product/ProductCard";
import { Header } from "@/components/layout/Header";
import { Screen } from "@/components/layout/Screen";
import { PRODUCTS } from "@/data/products";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const POPULAR_PRODUCTS = [
  {
    id: "1",
    name: "Basketball Shorts",
    image: require("../../assets/images/shorts.png"),
  },
  {
    id: "2",
    name: "Women's Baggy T-Shirt",
    image: require("../../assets/images/t-shirt.png"),
  },
  {
    id: "3",
    name: "Beanie Hat",
    image: require("../../assets/images/beanie-hat.png"),
  },
  {
    id: "4",
    name: "Shopper Bag",
    image: require("../../assets/images/shopper-bag.png"),
  },
] as const;

const CATEGORIES = [
  {
    id: "1",
    name: "T-Shirts",
  },
  {
    id: "2",
    name: "Shorts",
  },
  {
    id: "3",
    name: "Hats",
  },
  {
    id: "4",
    name: "Shoes",
  },
  {
    id: "5",
    name: "Bags",
  },
  {
    id: "6",
    name: "Accessories",
  },
  {
    id: "13",
    name: "Jacket",
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>("T-Shirts");
  const insets = useSafeAreaInsets();

  const filteredProducts = PRODUCTS.filter(
    (product) => product.category === selectedCategory,
  );
  return (
    <Screen edges={["top"]}>
      <Header
        onSearch={() => router.push("/search")}
        onChat={() => router.push("/chat")}
        onBag={() => router.push("/cart")}
      />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 61 + insets.bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <AppText className="text-lg text-neutral-0 font-semibold">
            Popular Product
          </AppText>
          <AppText className="text-base font-semibold text-neutral-400">
            See all
          </AppText>
        </View>
        <FlatList
          data={POPULAR_PRODUCTS}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ gap: 12, paddingTop: 16 }}
          renderItem={({ item }) => (
            <PopularProductCard name={item.name} image={item.image} />
          )}
        />

        <View className="mt-8 gap-2 flex-row">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingRight: 0 }}
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.name;
              return (
                <PressableScale
                  onPress={() => setSelectedCategory(category.name)}
                  className={`h-[31px] items-center justify-center rounded-[18px] border px-3 py-2 ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-neutral-700 bg-transparent"
                  }`}
                  key={category.id}
                >
                  <AppText
                    className={`text-sm text-center font-semibold ${
                      isSelected ? "text-neutral-950" : "text-neutral-400"
                    }`}
                  >
                    {category.name}
                  </AppText>
                </PressableScale>
              );
            })}
          </ScrollView>
        </View>

        {filteredProducts.length > 0 ? (
          <View className="mt-3 flex-row flex-wrap justify-between gap-y-5">
            {filteredProducts.map((product) => (
              // Keyed by category so switching filters remounts the cards and
              // replays the fade/slide-in. Same look as the search reveal.
              <Animated.View
                key={`${selectedCategory}-${product.id}`}
                entering={FadeInDown.duration(420).easing(Easing.out(Easing.cubic))}
                className="w-[48%]"
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
              </Animated.View>
            ))}
          </View>
        ) : (
          <View className="mt-16 items-center">
            <AppText className="text-base text-neutral-400">
              No {selectedCategory} yet
            </AppText>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
