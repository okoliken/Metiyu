import { ScrollView, View } from "react-native";

import { CategoryCard } from "@/components/category/CategoryCard";
import { Screen } from "@/components/layout/Screen";
import { AppText } from "@/components/ui/AppText";
import { CATEGORIES } from "@/data/categories";

export default function CategoryScreen() {
  return (
    <Screen edges={["top"]}>
      <View className="flex-row items-center justify-center px-4 pb-3 pt-1.5">
        <AppText className="text-xl font-semibold text-neutral-0">
          Category
        </AppText>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ScrollView>
    </Screen>
  );
}
