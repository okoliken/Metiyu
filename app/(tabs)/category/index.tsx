import { ScrollView, View } from "react-native";
import Animated, { Easing, FadeInDown } from "react-native-reanimated";

import { CategoryCard } from "@/components/category/CategoryCard";
import { Screen } from "@/components/layout/Screen";
import { AppText } from "@/components/ui/AppText";
import { CATEGORIES } from "@/data/categories";

export default function CategoryScreen() {
  // Cards fade in once when the screen first mounts. We intentionally DON'T
  // replay on focus — remounting them on a back-navigation focus restarts them
  // at opacity 0, which reads as a blank flash before the list reappears.
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
          <Animated.View
            key={category.id}
            entering={FadeInDown.duration(420).easing(Easing.out(Easing.cubic))}
          >
            <CategoryCard category={category} />
          </Animated.View>
        ))}
      </ScrollView>
    </Screen>
  );
}
