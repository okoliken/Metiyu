import { ScrollView, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { Screen } from "@/components/layout/Screen";

export default function CategoryScreen() {
  return (
    <Screen edges={["top"]}>
      <View className="flex-row items-center justify-center gap-1 px-4 pb-3 pt-1.5">
        <AppText className="text-xl font-semibold text-neutral-0">
          Category
        </AppText>
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
              <AppText className="text-lg font-semibold text-neutral-0">
                Category {index + 1}
              </AppText>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
