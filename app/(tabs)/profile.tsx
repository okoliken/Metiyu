import { type ReactNode } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path, Rect } from "react-native-svg";

import { Screen } from "@/components/layout/Screen";
import { AppText } from "@/components/ui/AppText";
import { IconButton } from "@/components/ui/IconButton";
import { PressableScale } from "@/components/ui/PressableScale";
import { colors } from "@/theme/colors";

type Row = {
  key: string;
  label: string;
  icon: (color: string) => ReactNode;
  value?: string;
  danger?: boolean;
  onPress?: () => void;
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const logOut = () =>
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive" },
    ]);

  const general: Row[] = [
    { key: "profile", label: "My Profile", icon: (c) => <PersonIcon color={c} /> },
    {
      key: "password",
      label: "Change Password",
      icon: (c) => <LockIcon color={c} />,
    },
    {
      key: "address",
      label: "My Addresses",
      icon: (c) => <AddressIcon color={c} />,
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: (c) => <BellIcon color={c} />,
    },
    {
      key: "security",
      label: "Security & Privacy",
      icon: (c) => <ShieldKeyIcon color={c} />,
    },
    {
      key: "language",
      label: "Language",
      value: "English (UK)",
      icon: (c) => <GlobeIcon color={c} />,
    },
  ];

  const preferences: Row[] = [
    { key: "wallet", label: "E-Wallet", icon: (c) => <WalletIcon color={c} /> },
    { key: "help", label: "Help Center", icon: (c) => <HelpIcon color={c} /> },
    {
      key: "invite",
      label: "Invite Friends",
      icon: (c) => <UserCircleIcon color={c} />,
    },
    {
      key: "logout",
      label: "Log Out",
      danger: true,
      icon: (c) => <LogoutIcon color={c} />,
      onPress: logOut,
    },
  ];

  return (
    <Screen edges={["top"]}>
      {/* Header */}
      <View className="h-12 flex-row items-center justify-center px-4">
        <IconButton accessibilityLabel="Options" className="absolute right-4">
          <DotsIcon color={colors.neutral[0]} />
        </IconButton>
        <AppText className="text-xl font-semibold text-neutral-0">
          My Profile
        </AppText>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          // clear the absolute (blurred) tab bar
          paddingBottom: 61 + insets.bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Section title="General" rows={general} />
        <View className="h-7" />
        <Section title="Preferences" rows={preferences} />
      </ScrollView>
    </Screen>
  );
}

function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <View>
      <AppText className="mb-3 text-xl font-bold text-neutral-0">
        {title}
      </AppText>
      <View className="gap-3">
        {rows.map((row) => (
          <SettingRow key={row.key} row={row} />
        ))}
      </View>
    </View>
  );
}

function SettingRow({ row }: { row: Row }) {
  const tint = row.danger ? colors.red : colors.neutral[400];
  const labelColor = row.danger ? "text-red" : "text-neutral-0";

  return (
    <PressableScale
      onPress={row.onPress}
      accessibilityRole="button"
      accessibilityLabel={row.label}
      className="h-14 flex-row items-center gap-3 rounded-2xl bg-neutral-900 px-4 active:bg-neutral-800"
    >
      {row.icon(tint)}
      <AppText className={`flex-1 text-base font-medium ${labelColor}`}>
        {row.label}
      </AppText>
      {row.value ? (
        <AppText className="text-base text-neutral-500">{row.value}</AppText>
      ) : null}
      <ChevronRightIcon color={tint} />
    </PressableScale>
  );
}

// ----- Icons --------------------------------------------------------------

function PersonIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={3.5} stroke={color} strokeWidth={1.6} />
      <Path
        d="M5.5 19c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function LockIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect
        x={5}
        y={10.5}
        width={14}
        height={9.5}
        rx={2.5}
        stroke={color}
        strokeWidth={1.6}
      />
      <Path
        d="M8 10.5V8a4 4 0 0 1 8 0v2.5"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function AddressIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect
        x={4.5}
        y={3.5}
        width={11}
        height={17}
        rx={1.6}
        stroke={color}
        strokeWidth={1.6}
      />
      <Path
        d="M15.5 9h3a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5h-3"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Path
        d="M8 7.5h0M11.5 7.5h0M8 11h0M11.5 11h0M8 14.5h0M11.5 14.5h0"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function BellIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Path
        d="M10 18a2 2 0 0 0 4 0"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function ShieldKeyIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3.5 19 6v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-2.5Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={10.5} r={1.8} stroke={color} strokeWidth={1.6} />
      <Path d="M12 12.3V15" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

function GlobeIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={8.5} stroke={color} strokeWidth={1.6} />
      <Path
        d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17"
        stroke={color}
        strokeWidth={1.6}
      />
    </Svg>
  );
}

function WalletIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3.5}
        y={6}
        width={17}
        height={13}
        rx={3}
        stroke={color}
        strokeWidth={1.6}
      />
      <Path
        d="M15.5 12.5h2.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function HelpIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect
        x={4}
        y={4}
        width={16}
        height={16}
        rx={5}
        stroke={color}
        strokeWidth={1.6}
      />
      <Path
        d="M9.7 9.6a2.3 2.3 0 0 1 4.3 1.1c0 1.5-2 1.8-2 3"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Path d="M12 16h0" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function UserCircleIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={8.5} stroke={color} strokeWidth={1.6} />
      <Circle cx={12} cy={10} r={2.5} stroke={color} strokeWidth={1.6} />
      <Path
        d="M7.5 18c.6-2 2.4-3 4.5-3s3.9 1 4.5 3"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function LogoutIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 5.5H6.5A1.5 1.5 0 0 0 5 7v10a1.5 1.5 0 0 0 1.5 1.5H14"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 8.5 18.5 12 15 15.5M9.5 12h9"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ChevronRightIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6L15 12L9 18"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function DotsIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx={5} cy={12} r={1.6} fill={color} />
      <Circle cx={12} cy={12} r={1.6} fill={color} />
      <Circle cx={19} cy={12} r={1.6} fill={color} />
    </Svg>
  );
}
