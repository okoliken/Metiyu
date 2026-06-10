import { router, useLocalSearchParams } from "expo-router";
import { type ReactNode, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "@/components/ui/AppText";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { CopyIcon } from "@/components/icons/CopyIcon";
import { ReviewSheet } from "@/components/orders/ReviewSheet";
import { AppImage } from "@/components/ui/AppImage";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/layout/Screen";
import { ORDERS, orderTotal } from "@/data/orders";
import { colors } from "@/theme/colors";

function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <View className="flex-row items-center gap-3">
      <PressableScale
        onPress={() => onChange(Math.max(1, value - 1))}
        hitSlop={6}
        accessibilityLabel="Decrease quantity"
        className="h-7 w-7 items-center justify-center rounded-lg bg-neutral-800 active:opacity-70"
      >
        <AppText className="text-lg leading-none text-neutral-400">−</AppText>
      </PressableScale>
      <AppText className="w-4 text-center text-base font-semibold text-neutral-0">
        {value}
      </AppText>
      <PressableScale
        onPress={() => onChange(value + 1)}
        hitSlop={6}
        accessibilityLabel="Increase quantity"
        className="h-7 w-7 items-center justify-center rounded-lg bg-neutral-800 active:opacity-70"
      >
        <AppText className="text-base leading-none text-neutral-400">+</AppText>
      </PressableScale>
    </View>
  );
}

function DetailRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <View className="mt-4 flex-row items-center justify-between">
      <AppText className="text-base font-medium text-neutral-0">{label}</AppText>
      {value !== undefined ? (
        <AppText className="text-base font-medium text-neutral-0">{value}</AppText>
      ) : (
        children
      )}
    </View>
  );
}

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const order = ORDERS.find((item) => item.id === id);

  // Live quantities so the steppers update the total. Init from the order.
  const [quantities, setQuantities] = useState<number[]>(
    () => order?.items.map((item) => item.quantity) ?? [],
  );

  // Orders awaiting a review pop the review sheet open on top of the detail.
  const [reviewOpen, setReviewOpen] = useState(
    () => order?.status === "Give Review",
  );

  if (!order) {
    return (
      <Screen edges={["top"]}>
        <View className="flex-1 items-center justify-center px-6">
          <AppText className="text-base text-neutral-400">
            Order not found.
          </AppText>
          <PressableScale onPress={() => router.back()} className="mt-4">
            <AppText className="text-base font-semibold text-primary">
              Go back
            </AppText>
          </PressableScale>
        </View>
      </Screen>
    );
  }

  const total = orderTotal(order, quantities);
  const setQty = (index: number, next: number) =>
    setQuantities((prev) => prev.map((q, i) => (i === index ? next : q)));

  return (
    <Screen edges={["top"]}>
      {/* Header */}
      <View className="h-12 flex-row items-center justify-center border-b border-neutral-800 px-4">
        <PressableScale
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="absolute left-4 h-10 w-10 items-center justify-center rounded-xl bg-neutral-800 active:bg-neutral-700"
        >
          <ArrowLeftIcon color={colors.neutral[0]} />
        </PressableScale>
        <AppText className="text-xl font-semibold text-neutral-0">
          Detail Order
        </AppText>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          // Tab bar is hidden on this screen, so only clear the safe-area inset.
          paddingBottom: insets.bottom + 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Status banner */}
        <View className="rounded-2xl bg-neutral-900 px-5 py-5">
          <AppText className="text-lg font-bold text-neutral-0">
            {order.statusLabel}
          </AppText>
          <AppText className="mt-1 text-sm text-neutral-400">
            {order.etaLabel}
          </AppText>
        </View>

        {/* Products */}
        <AppText className="mt-6 text-lg font-bold text-neutral-0">
          Total Products ({order.items.length})
        </AppText>

        <View className="mt-4">
          {order.items.map((item, index) => (
            <View key={`${item.product.id}-${index}`}>
              <View className="flex-row items-center gap-4">
                <View className="h-[72px] w-[58px] overflow-hidden">
                  <AppImage
                    source={item.product.image}
                    className="size-full"
                    contentFit="contain"
                  />
                </View>

                <View className="flex-1">
                  <AppText
                    className="text-base font-semibold text-neutral-0"
                    numberOfLines={1}
                  >
                    {item.product.name}
                  </AppText>
                  <AppText className="mt-1 text-xs text-neutral-400">
                    Size : {item.size}
                  </AppText>
                  <AppText className="mt-1 text-base font-semibold text-neutral-0">
                    ${item.product.price.toFixed(2)}
                  </AppText>
                </View>

                <Stepper
                  value={quantities[index]}
                  onChange={(next) => setQty(index, next)}
                />
              </View>

              <View className="my-4 ml-20 h-px bg-neutral-800" />
            </View>
          ))}
        </View>

        {/* Detail Order */}
        <AppText className="mt-6 text-lg font-bold text-neutral-0">
          Detail Order
        </AppText>

        <DetailRow label="Payment Method" value={order.paymentMethod} />
        <DetailRow label="Shipment" value={order.shipment} />
        <DetailRow label="Delivery Address" value={order.deliveryAddress} />
        <DetailRow label="Date" value={order.dateLabel} />
        <DetailRow label="Transaction ID">
          <View className="flex-row items-center gap-2">
            <AppText className="text-base font-medium text-neutral-0">
              {order.transactionId}
            </AppText>
            <PressableScale hitSlop={8} accessibilityLabel="Copy transaction ID">
              <CopyIcon color={colors.neutral[0]} />
            </PressableScale>
          </View>
        </DetailRow>
        <DetailRow label="Status">
          <View className="rounded-full bg-neutral-800 px-3 py-1">
            <AppText className="text-xs font-medium text-neutral-300">
              {order.paymentStatus}
            </AppText>
          </View>
        </DetailRow>
        <DetailRow label="Total Amount">
          <AppText className="text-lg font-bold text-neutral-0">
            ${total.toFixed(2)}
          </AppText>
        </DetailRow>
      </ScrollView>

      <ReviewSheet
        order={reviewOpen ? order : null}
        onClose={() => setReviewOpen(false)}
      />
    </Screen>
  );
}
