import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1 bg-neutral-950">
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            // Global app background — inherited by every screen.
            contentStyle: { backgroundColor: colors.neutral[950] },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="search" options={{ animation: "slide_from_right" }} />
          <Stack.Screen name="product/[id]" options={{ animation: "slide_from_right" }} />
          <Stack.Screen name="reviews" options={{ animation: "slide_from_right" }} />
          <Stack.Screen name="chat" options={{ animation: "slide_from_right" }} />
        </Stack>
        {/* App is dark, so use light status bar content */}
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
