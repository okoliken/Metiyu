import { ScrollView, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";

export default function CategoryScreen() {
  return (
    <Screen edges={["top"]}>
      <View className="flex-row items-center justify-center gap-1 px-4 pb-3 pt-1.5">
        <Text className="text-xl font-semibold text-neutral-0">Category</Text>
      </View>

      <ScrollView
        className="flex-1 mt-4 gap-4"
        contentContainerStyle={{
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <View key={index} className="bg-neutral-800 rounded-2xl p-4 h-32">
              <Text className="text-lg font-semibold text-neutral-0">
                Category {index + 1}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
