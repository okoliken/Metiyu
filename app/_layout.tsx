import "../global.css";

import {
  InstrumentSans_400Regular,
  InstrumentSans_500Medium,
  InstrumentSans_600SemiBold,
  InstrumentSans_700Bold,
  useFonts,
} from "@expo-google-fonts/instrument-sans";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InstrumentSans_400Regular,
    InstrumentSans_500Medium,
    InstrumentSans_600SemiBold,
    InstrumentSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

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
          <Stack.Screen
            name="search"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="product/[id]"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="reviews"
            options={{ animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="chat"
            options={{ animation: "slide_from_right" }}
          />
        </Stack>
        {/* App is dark, so use light status bar content */}
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
