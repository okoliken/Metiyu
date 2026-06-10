import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { PaymentSheet } from "@/components/cart/PaymentSheet";
import { Screen } from "@/components/layout/Screen";
import { AppImage } from "@/components/ui/AppImage";
import { AppText } from "@/components/ui/AppText";
import { IconButton } from "@/components/ui/IconButton";
import { PressableScale } from "@/components/ui/PressableScale";
import {
  DELIVERY_FEE,
  DISCOUNT_RATE,
  PROMO_CODE,
  useCart,
  type CartItem,
} from "@/lib/cart";
import { colors } from "@/theme/colors";

export default function CartScreen() {
  const {
    items,
    allSelected,
    subtotal,
    total,
    toggle,
    toggleAll,
    setQty,
    remove,
  } = useCart();
  const [paymentVisible, setPaymentVisible] = useState(false);

  const confirmPayment = () => {
    setPaymentVisible(false);
    Alert.alert("Payment successful", "Your order has been placed.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <Screen edges={["top", "bottom"]}>
      {/* Header */}
      <View className="h-12 flex-row items-center justify-between px-4">
        <IconButton accessibilityLabel="Go back" onPress={() => router.back()}>
          <ArrowLeftIcon color={colors.neutral[0]} />
        </IconButton>
        <AppText className="text-xl font-semibold text-neutral-0">Cart</AppText>
        <IconButton accessibilityLabel="Options">
          <MenuIcon color={colors.neutral[0]} />
        </IconButton>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <AppText className="text-base text-neutral-400">
            Your cart is empty.
          </AppText>
          <PressableScale onPress={() => router.back()} className="mt-4">
            <AppText className="text-base font-semibold text-primary">
              Continue shopping
            </AppText>
          </PressableScale>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Address (static — demo only) */}
            <View className="flex-row items-start gap-2">
              <View className="flex-1">
                <AppText className="text-base text-neutral-0">
                  <AppText className="font-semibold">Sevian G. Rifani </AppText>
                  <AppText className="text-neutral-500">
                    +62 (822) 4911 4628
                  </AppText>
                </AppText>
                <AppText className="mt-1 text-base text-neutral-0">
                  5274 Mangir - Rogojampi, Banyuwangi, Indonesia
                </AppText>
              </View>
              <ChevronRightIcon color={colors.neutral[0]} />
            </View>

            {/* Items */}
            <Animated.View
              layout={LinearTransition.duration(220)}
              className="mt-5 rounded-3xl bg-neutral-900 p-4"
            >
              <PressableScale
                onPress={toggleAll}
                className="flex-row items-center gap-3"
              >
                <Checkbox checked={allSelected} />
                <AppText className="text-base text-neutral-0">Select all</AppText>
              </PressableScale>

              {items.map((item, index) => (
                <Animated.View
                  key={item.key}
                  entering={FadeIn.duration(220)}
                  exiting={FadeOut.duration(220)}
                  layout={LinearTransition.duration(220)}
                >
                  {index === 0 ? (
                    <View className="mt-4" />
                  ) : (
                    <View className="my-4 ml-[52px] h-px bg-neutral-800" />
                  )}
                  <CartRow
                    item={item}
                    onToggle={toggle}
                    onSetQty={setQty}
                    onRemove={remove}
                  />
                </Animated.View>
              ))}
            </Animated.View>

            {/* Promo + summary */}
            <Animated.View
              layout={LinearTransition.duration(220)}
              className="mt-5 rounded-3xl bg-neutral-900 p-4"
            >
              <View className="flex-row items-center justify-between rounded-2xl border border-neutral-700 px-4 py-3">
                <AppText className="text-base font-semibold text-neutral-0">
                  {PROMO_CODE}
                </AppText>
                <View className="flex-row items-center gap-1.5">
                  <AppText className="text-sm font-semibold text-primary">
                    Promo code applied
                  </AppText>
                  <CheckBadge />
                </View>
              </View>

              <SummaryRow label="Subtotal:" value={`$${subtotal.toFixed(2)}`} />
              <SummaryRow
                label="Delivery Fee:"
                value={`$${DELIVERY_FEE.toFixed(2)}`}
              />
              <SummaryRow
                label="Discount:"
                value={`${Math.round(DISCOUNT_RATE * 100)}%`}
              />
            </Animated.View>
          </ScrollView>

          {/* Bottom bar */}
          <View className="flex-row items-center justify-between border-t border-neutral-800 px-5 pb-2 pt-3">
            <View>
              <AppText className="text-sm text-neutral-400">Total</AppText>
              <AppText className="text-2xl font-bold text-neutral-0">
                ${total.toFixed(2)}
              </AppText>
            </View>
            <PressableScale
              onPress={() => setPaymentVisible(true)}
              className="h-14 flex-1 ml-6 items-center justify-center rounded-[18px] bg-primary active:opacity-90"
            >
              <AppText className="text-base font-semibold text-neutral-950">
                Checkout
              </AppText>
            </PressableScale>
          </View>
        </>
      )}

      <PaymentSheet
        visible={paymentVisible}
        onClose={() => setPaymentVisible(false)}
        onConfirm={confirmPayment}
      />
    </Screen>
  );
}

// ----- Rows / building blocks --------------------------------------------

function CartRow({
  item,
  onToggle,
  onSetQty,
  onRemove,
}: {
  item: CartItem;
  onToggle: (key: string) => void;
  onSetQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
}) {
  return (
    <ReanimatedSwipeable
      friction={2}
      rightThreshold={40}
      overshootRight={false}
      // Full swipe removes; the action button is the explicit alternative.
      onSwipeableOpen={(direction) => {
        if (direction === "right") onRemove(item.key);
      }}
      renderRightActions={() => (
        <PressableScale
          onPress={() => onRemove(item.key)}
          accessibilityLabel={`Remove ${item.product.name}`}
          className="my-0.5 ml-3 w-16 items-center justify-center rounded-2xl bg-red"
        >
          <TrashIcon />
        </PressableScale>
      )}
    >
      {/* Opaque bg so the red action stays hidden until swiped */}
      <View className="flex-row items-center gap-3 bg-neutral-900">
        <PressableScale onPress={() => onToggle(item.key)} hitSlop={6}>
          <Checkbox checked={item.selected} />
        </PressableScale>

        <View className="h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-2xl bg-neutral-800 p-1.5">
          <AppImage
            source={item.product.image}
            className="size-full"
            contentFit="contain"
          />
        </View>

        <View className="flex-1">
          <AppText
            className="text-base font-semibold text-neutral-0"
            numberOfLines={2}
          >
            {item.product.name}
          </AppText>
          <AppText className="mt-1 text-base font-semibold text-neutral-0">
            ${item.product.price.toFixed(2)}
          </AppText>
        </View>

        <Stepper
          qty={item.qty}
          onDec={() => onSetQty(item.key, item.qty - 1)}
          onInc={() => onSetQty(item.key, item.qty + 1)}
        />
      </View>
    </ReanimatedSwipeable>
  );
}

function Stepper({
  qty,
  onDec,
  onInc,
}: {
  qty: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <View className="flex-row items-center gap-2">
      <PressableScale
        onPress={onDec}
        hitSlop={4}
        accessibilityLabel="Decrease quantity"
        className="h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 active:bg-neutral-700"
      >
        <SignIcon kind="minus" />
      </PressableScale>
      <AppText className="w-5 text-center text-base font-semibold text-neutral-0">
        {qty}
      </AppText>
      <PressableScale
        onPress={onInc}
        hitSlop={4}
        accessibilityLabel="Increase quantity"
        className="h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 active:bg-neutral-700"
      >
        <SignIcon kind="plus" />
      </PressableScale>
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mt-4 flex-row items-center justify-between">
      <AppText className="text-base text-neutral-400">{label}</AppText>
      <AppText className="text-base font-semibold text-neutral-0">
        {value}
      </AppText>
    </View>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  if (!checked) {
    return <View className="h-6 w-6 rounded-md border-2 border-neutral-600" />;
  }
  return (
    <View className="h-6 w-6 items-center justify-center rounded-md bg-primary">
      <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
        <Path
          d="M5 12.5L10 17.5L19 7"
          stroke={colors.neutral[950]}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

function CheckBadge() {
  return (
    <View className="h-4 w-4 items-center justify-center rounded-full bg-primary">
      <Svg width={10} height={10} viewBox="0 0 24 24" fill="none">
        <Path
          d="M5 12.5L10 17.5L19 7"
          stroke={colors.neutral[950]}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

function SignIcon({ kind }: { kind: "plus" | "minus" }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12H19"
        stroke={colors.neutral[100]}
        strokeWidth={2}
        strokeLinecap="round"
      />
      {kind === "plus" ? (
        <Path
          d="M12 5V19"
          stroke={colors.neutral[100]}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ) : null}
    </Svg>
  );
}

function TrashIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7"
        stroke={colors.neutral[0]}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function MenuIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M4 7H20" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M4 12H20" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M4 17H14" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
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
