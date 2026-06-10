import { Stack } from "expo-router";

import { stackAnimation } from "@/lib/navigation";
import { colors } from "@/theme/colors";

export default function OrdersStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.neutral[950] },
        // Slide on iOS, fade on Android (see stackAnimation).
        animation: stackAnimation(),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
