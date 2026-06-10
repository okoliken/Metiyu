import "../global.css";

import {
  InstrumentSans_400Regular,
  InstrumentSans_500Medium,
  InstrumentSans_600SemiBold,
  InstrumentSans_700Bold,
  useFonts,
} from "@expo-google-fonts/instrument-sans";
import { DarkTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { stackAnimation } from "@/lib/navigation";
import { CartProvider } from "@/lib/cart";
import { CartToast } from "@/components/cart/CartToast";
import { colors } from "@/theme/colors";

SplashScreen.preventAutoHideAsync();

// React Navigation's default theme is light, so its background/card colours
// flash white behind transitions (notably back gestures on Android). Give the
// navigators a dark theme that matches the app background.
const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.neutral[950],
    card: colors.neutral[950],
  },
};

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
        <ThemeProvider value={navigationTheme}>
          <CartProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                // Global app background — inherited by every screen.
                contentStyle: { backgroundColor: colors.neutral[950] },
                // Slide on iOS, fade on Android (see stackAnimation).
                animation: stackAnimation(),
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="search" />
              <Stack.Screen name="product/[id]" />
              <Stack.Screen name="orders/[id]" />
              <Stack.Screen name="reviews" />
              <Stack.Screen name="chat" />
              <Stack.Screen name="cart" />
            </Stack>
            <CartToast />
          </CartProvider>
          {/* App is dark, so use light status bar content */}
          <StatusBar style="light" />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
