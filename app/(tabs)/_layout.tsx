import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryIcon } from "@/components/icons/tab/CategoryIcon";
import { FavoritesIcon } from "@/components/icons/tab/FavoritesIcon";
import { HomeIcon } from "@/components/icons/tab/HomeIcon";
import { ProfileIcon } from "@/components/icons/tab/ProfileIcon";
import { colors } from "@/theme/colors";

function TabBarLabel({
  focused,
  children,
}: {
  focused: boolean;
  children: string;
}) {
  return (
    <AppText
      className={
        focused
          ? "mt-1 text-xs font-medium text-primary"
          : "mt-1 text-xs font-medium text-neutral-400"
      }
    >
      {children}
    </AppText>
  );
}

function TabBarIcon({
  focused,
  children,
}: {
  focused: boolean;
  children: ReactNode;
}) {
  return (
    <View
      className="rounded-[17px] px-6 py-2"
      style={focused ? { backgroundColor: colors.primary } : undefined}
    >
      {children}
    </View>
  );
}

function TabBarBackground() {
  return (
    <BlurView
      intensity={40}
      tint="dark"
      // No `blurMethod`/`blurTarget`: iOS blurs natively, and Android shows the
      // semi-transparent fallback (its dimezis blur needs a BlurTargetView ref
      // wrapping the content — not practical for a tab-bar overlay). The
      // gradient tint below carries the look on Android. Avoids the warning.
      style={StyleSheet.absoluteFill}
    >
      {/* Brand tint on top of the blur — lowered opacity so the blur reads through */}
      <LinearGradient
        colors={["rgba(26, 26, 26, 0.55)", "rgba(54, 55, 6, 0.55)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </BlurView>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral[400],
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "transparent",
          borderTopWidth: 1,
          borderTopColor: colors.neutral[700],
          elevation: 0,
          height: 61 + insets.bottom,
          paddingTop: 6,
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
        },
        tabBarItemStyle: { paddingVertical: 0 },
        tabBarLabel: ({ focused, children }) => (
          <TabBarLabel focused={focused}>{children}</TabBarLabel>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused}>
              <HomeIcon
                color={focused ? colors.neutral[950] : colors.neutral[400]}
              />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused}>
              <CategoryIcon
                color={focused ? colors.neutral[950] : colors.neutral[400]}
              />
            </TabBarIcon>
          ),
        }}
        listeners={({ navigation }) => ({
          // The category tab hosts a nested stack (list → detail). Without this,
          // re-entering the tab restores its last screen (the detail). Always
          // send a tab press back to the list.
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("category", { screen: "index" });
          },
        })}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused}>
              <FavoritesIcon
                color={focused ? colors.neutral[950] : colors.neutral[400]}
              />
            </TabBarIcon>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("orders", { screen: "index" });
          },
        })}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused}>
              <ProfileIcon
                color={focused ? colors.neutral[950] : colors.neutral[400]}
              />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}
