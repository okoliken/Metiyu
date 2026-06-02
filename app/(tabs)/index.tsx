import { ScrollView, Text, View } from "react-native";

import { Header } from "@/components/layout/Header";
import { Screen } from "@/components/layout/Screen";

const POPULAR_PRODUCTS = [
  { id: "1", name: "Basketball Shorts" },
  { id: "2", name: "Women's Baggy T-Shirt" },
  { id: "3", name: "Beanie Hat" },
  { id: "4", name: "Shopper Bag" },
] as const;

export default function HomeScreen() {
  return (
    <Screen edges={["top"]}>
      <Header />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-base text-neutral-0">Popular Product</Text>
          <Text className="text-base font-semibold text-neutral-400">
            See all
          </Text>
        </View>

        <View className="mt-4 flex-row flex-wrap justify-between gap-y-4">
          {POPULAR_PRODUCTS.map((product) => (
            <View
              key={product.id}
              className="h-[79px] w-[48%] flex-row items-center overflow-hidden rounded-2xl bg-neutral-800"
            >
              <Text
                className="flex-1 px-3 text-sm font-semibold leading-tight text-neutral-0"
                numberOfLines={2}
              >
                {product.name}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
