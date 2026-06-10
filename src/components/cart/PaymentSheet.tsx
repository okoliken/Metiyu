import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/ui/AppText";
import { PressableScale } from "@/components/ui/PressableScale";
import { colors } from "@/theme/colors";

type Method = {
  id: string;
  label: string;
  masked: string;
  brand: "visa" | "mastercard";
};

const METHODS: Method[] = [
  { id: "visa", label: "Visa", masked: "1919 **** **** 2026", brand: "visa" },
  {
    id: "mastercard",
    label: "Mastercard",
    masked: "2020 **** **** 2026",
    brand: "mastercard",
  },
];

type PaymentSheetProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (methodId: string) => void;
};

/**
 * "Payment Method" bottom sheet shown at checkout. Slide-up + backdrop fade,
 * matching the app's other sheets.
 */
export function PaymentSheet({ visible, onClose, onConfirm }: PaymentSheetProps) {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState("visa");
  const [mounted, setMounted] = useState(false);

  const progress = useSharedValue(0);
  const sheetHeight = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      progress.value = withTiming(1, {
        duration: 320,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = withTiming(
        0,
        { duration: 220, easing: Easing.in(Easing.cubic) },
        (finished) => {
          if (finished) runOnJS(setMounted)(false);
        },
      );
    }
  }, [visible]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.value }));
  const panelStyle = useAnimatedStyle(() => {
    const distance = sheetHeight.value || 1000;
    return { transform: [{ translateY: (1 - progress.value) * distance }] };
  });

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]}>
        <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
        <Pressable
          style={[StyleSheet.absoluteFill, { backgroundColor: "#000000A6" }]}
          onPress={onClose}
        />
      </Animated.View>

      <Animated.View
        onLayout={(event) => {
          sheetHeight.value = event.nativeEvent.layout.height + insets.bottom + 24;
        }}
        style={[panelStyle, { marginBottom: insets.bottom + 12 }]}
        className="absolute bottom-0 left-0 right-0 mx-3 rounded-[22px] bg-neutral-800 px-5 pb-5 pt-2"
      >
        <View className="mb-2 mt-2 h-1.5 w-[116px] self-center rounded-[9px] bg-neutral-950" />

        <AppText className="mt-3 text-center text-lg font-bold text-neutral-0">
          Payment Method
        </AppText>

        <View className="mt-5 gap-3">
          {METHODS.map((method) => {
            const active = selected === method.id;
            return (
              <PressableScale
                key={method.id}
                onPress={() => setSelected(method.id)}
                className="flex-row items-center gap-3 rounded-2xl bg-neutral-950 p-3"
              >
                <View className="h-11 w-14 items-center justify-center rounded-xl bg-neutral-800">
                  <CardMark brand={method.brand} />
                </View>
                <View className="flex-1">
                  <AppText className="text-base font-semibold text-neutral-0">
                    {method.label}
                  </AppText>
                  <AppText className="mt-0.5 text-sm text-neutral-400">
                    {method.masked}
                  </AppText>
                </View>
                <Radio active={active} />
              </PressableScale>
            );
          })}
        </View>

        <PressableScale
          onPress={() => onConfirm(selected)}
          className="mt-6 h-14 items-center justify-center rounded-[18px] bg-primary active:opacity-90"
        >
          <AppText className="text-base font-semibold text-neutral-950">
            Confirm Payment
          </AppText>
        </PressableScale>
      </Animated.View>
    </Modal>
  );
}

function Radio({ active }: { active: boolean }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle
        cx={11}
        cy={11}
        r={10}
        stroke={active ? colors.primary : colors.neutral[600]}
        strokeWidth={2}
        fill="none"
      />
      {active ? <Circle cx={11} cy={11} r={5} fill={colors.primary} /> : null}
    </Svg>
  );
}

function CardMark({ brand }: { brand: Method["brand"] }) {
  if (brand === "visa") {
    return (
      <AppText className="text-[13px] font-bold italic text-neutral-0">
        VISA
      </AppText>
    );
  }
  return (
    <Svg width={30} height={20} viewBox="0 0 30 20">
      <Circle cx={11} cy={10} r={8} fill="#EB001B" />
      <Circle cx={19} cy={10} r={8} fill="#F79E1B" fillOpacity={0.85} />
    </Svg>
  );
}
