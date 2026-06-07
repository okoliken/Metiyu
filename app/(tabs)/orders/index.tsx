
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "@/components/ui/AppText";
import { OrderCard } from "@/components/orders/OrderCard";
import { Chips } from "@/components/ui/Chips";
import { Screen } from "@/components/layout/Screen";
import { ORDER_STATUSES, ORDERS, type OrderStatus } from "@/data/orders";

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState<OrderStatus>("Waiting for Payment");

  // The React Compiler memoizes this derivation — no useMemo needed.
  const orders = ORDERS.filter((order) => order.status === status);

  return (
    <Screen edges={["top"]}>
      {/* Header */}
      <View className="h-12 flex-row items-center justify-center px-4">
        <AppText className="text-xl font-semibold text-neutral-0">Orders</AppText>
      </View>

      {/* Status filter chips */}
      <Chips
        options={ORDER_STATUSES.map((s) => ({ key: s, label: s, value: s }))}
        isActive={(s) => s === status}
        onSelect={setStatus}
      />

      {/* Orders list */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          // clear the absolute (blurred) tab bar: 61 height + safe-area inset
          paddingBottom: 61 + insets.bottom + 16,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <OrderCard order={item} />}
        ListEmptyComponent={
          <View className="mt-24 items-center">
            <AppText className="text-base text-neutral-400">
              No orders here yet.
            </AppText>
          </View>
        }
      />
    </Screen>
  );
}
