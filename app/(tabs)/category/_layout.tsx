import { Stack } from "expo-router";

import { colors } from "@/theme/colors";

export default function CategoryStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.neutral[950] },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" options={{ animation: "slide_from_bottom" }} />
    </Stack>
  );
}
