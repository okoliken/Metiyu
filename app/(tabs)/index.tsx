import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";

import { PopularProductCard } from "@/components/home/PopularProductCard";
import { ProductCard } from "@/components/product/ProductCard";
import { Header } from "@/components/layout/Header";
import { Screen } from "@/components/layout/Screen";
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
    id: "7",
    name: "Jewelry",
  },
  {
    id: "8",
    name: "Watches",
  },
  {
    id: "9",
    name: "Sunglasses",
  },
  {
    id: "10",
    name: "Wallets",
  },
  {
    id: "11",
    name: "Hoodies",
  },
  {
    id: "12",
    name: "Sweaters",
  },
  {
    id: "13",
    name: "Jacket",
  },
];

const PRODUCTS = [
  {
    id: "1",
    name: "Striped Polo Shirt",
    image: require("../../assets/images/products/tshirt1.png"),
    rating: 4.8,
    reviews: 412,
    price: 42,
  },
  {
    id: "2",
    name: "Color Block V-Neck Tee",
    image: require("../../assets/images/products/tshirt2.png"),
    rating: 4.9,
    reviews: 562,
    price: 45,
  },
  {
    id: "3",
    name: "Classic Cotton T-Shirt",
    image: require("../../assets/images/products/tshirt3.png"),
    rating: 4.7,
    reviews: 318,
    price: 38,
  },
  {
    id: "4",
    name: "Graphic Street Tee",
    image: require("../../assets/images/products/tshirt4.png"),
    rating: 4.6,
    reviews: 204,
    price: 40,
  },
] as const;

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>("T-Shirts");
  const insets = useSafeAreaInsets();
  return (
    <Screen edges={["top"]}>
      <Header onSearch={() => router.push("/search")} />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 16,
          // clear the absolute (blurred) tab bar: 61 height + safe-area inset
          paddingBottom: 61 + insets.bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-lg text-neutral-0 font-semibold">
            Popular Product
          </Text>
          <Text className="text-base font-semibold text-neutral-400">
            See all
          </Text>
        </View>
        <View className="mt-4 flex-row flex-wrap gap-3">
          {POPULAR_PRODUCTS.map((product) => (
            <PopularProductCard
              key={product.id}
              name={product.name}
              image={product.image}
            />
          ))}
        </View>

        <View className="mt-6 gap-2 flex-row">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingRight: 0 }}
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.name;
              return (
                <Pressable
                  onPress={() => setSelectedCategory(category.name)}
                  className={`h-[31px] items-center justify-center rounded-[18px] px-3 py-2 ${
                    isSelected
                      ? "bg-primary"
                      : "border border-neutral-700 bg-transparent"
                  }`}
                  key={category.id}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      isSelected ? "text-neutral-950" : "text-neutral-400"
                    }`}
                  >
                    {category.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View className="mt-6 flex-row flex-wrap justify-between gap-y-5">
          {PRODUCTS.map((product) => (
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
