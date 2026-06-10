import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { ShareIcon } from "@/components/icons/ShareIcon";
import { StarIcon } from "@/components/icons/StarIcon";
import { BagIcon } from "@/components/icons/header/BagIcon";
import { ChatIcon } from "@/components/icons/header/ChatIcon";
import { Screen } from "@/components/layout/Screen";
import { PressableScale } from "@/components/ui/PressableScale";
import { Chips } from "@/components/ui/Chips";
import { IconButton } from "@/components/ui/IconButton";
import { Reviews } from "@/components/product/Reviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { BuySheet } from "@/components/product/BuySheet";
import { ProductGallery } from "@/components/product/ProductGallery";
import { CartBadge } from "@/components/cart/CartBadge";
import { PRODUCTS } from "@/data/products";
import { REVIEWS } from "@/data/reviews";
import { useCart } from "@/lib/cart";
import { colors } from "@/theme/colors";

const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

const DEFAULT_DESCRIPTION =
  "Experience premium comfort with our signature soft cotton blend. " +
  "This piece features a modern design that fits perfectly for a casual " +
  "day out or a relaxed weekend. Durable stitching, breathable fabric, " +
  "and a true-to-size cut make it an everyday essential.";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const cart = useCart();

  const product = PRODUCTS.find((item) => item.id === id);

  const [favorite, setFavorite] = useState(false);
  const [size, setSize] = useState<(typeof SIZES)[number]>("S");
  const [expanded, setExpanded] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);

  if (!product) {
    return (
      <Screen edges={["top"]}>
        <View className="flex-1 items-center justify-center px-6">
          <AppText className="text-base text-neutral-400">
            Product not found.
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

  const description = product.description ?? DEFAULT_DESCRIPTION;

  // Suggest products from the same category (fall back to any others).
  const related = PRODUCTS.filter(
    (item) => item.id !== product.id && item.category === product.category,
  );
  const suggestions = (related.length ? related : PRODUCTS).filter(
    (item) => item.id !== product.id,
  );

  return (
    <Screen edges={["top"]}>
      {/* Header */}
      <View className="h-12 flex-row items-center justify-between px-4 pb-2">
        <IconButton accessibilityLabel="Go back" onPress={() => router.back()}>
          <ArrowLeftIcon color={colors.neutral[0]} />
        </IconButton>

        <View
          pointerEvents="none"
          className="absolute inset-x-0 items-center justify-center"
        >
          <AppText className="text-xl font-semibold text-neutral-0 mb-2">
            Detail Product
          </AppText>
        </View>

        <View className="flex-row items-center gap-3">
          <IconButton accessibilityLabel="Share">
            <ShareIcon color={colors.neutral[0]} />
          </IconButton>
          <View className="relative">
            <IconButton
              accessibilityLabel="Cart"
              onPress={() => router.push("/cart")}
            >
              <BagIcon color={colors.neutral[0]} />
            </IconButton>
            <CartBadge />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          // clear the sticky bottom action bar
          paddingBottom: insets.bottom + 96,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Image card */}
        <ProductGallery
          product={product}
          favorite={favorite}
          onToggleFavorite={() => setFavorite((prev) => !prev)}
        />

        {/* Title + rating + price */}
        <AppText className="mt-6 text-lg font-semibold text-neutral-0">
          {product.name}
        </AppText>

        <View className="mt-2 flex-row items-center gap-1.5">
          <StarIcon size={18} />
          <AppText className="text-base font-semibold text-neutral-0">
            {product.rating.toFixed(1)}
          </AppText>
          <AppText className="text-base text-neutral-400">
            ({product.reviews} Reviews)
          </AppText>
        </View>

        <AppText className="mt-3 text-lg font-bold text-neutral-0">
          ${product.price}
        </AppText>

        {/* Size selector */}
        <AppText className="mt-6 text-lg font-semibold text-neutral-0">
          Size
        </AppText>
        <View className="mt-3">
          <Chips
            options={SIZES.map((s) => ({ key: s, label: s, value: s }))}
            isActive={(s) => s === size}
            onSelect={setSize}
            scrollable={false}
            size="sm"
          />
        </View>

        {/* About */}
        <AppText className="mt-6 text-lg font-semibold text-neutral-0">
          About
        </AppText>
        <AppText
          className="mt-2 text-sm leading-normal text-neutral-400"
          numberOfLines={expanded ? undefined : 3}
        >
          {description}
        </AppText>
        <PressableScale onPress={() => setExpanded((prev) => !prev)} hitSlop={8}>
          <AppText className="mt-1 text-base font-semibold text-primary">
            {expanded ? "Read Less" : "Read More"}
          </AppText>
        </PressableScale>

        {/* Reviews */}
        <View className="mt-8">
          <Reviews
            reviews={REVIEWS.slice(0, 5)}
            count={product.reviews}
            onSeeMore={() => router.push("/reviews")}
          />
        </View>

        {/* You Might Also Like */}
        <View className="mt-8">
          <RelatedProducts products={suggestions} />
        </View>
      </ScrollView>

      {/* Sticky bottom action bar */}
      <View
        className="absolute inset-x-0 bottom-0 flex-row items-center gap-3 border-t border-neutral-800 bg-neutral-950 px-4 pt-3"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <PressableScale
          accessibilityLabel="Message seller"
          onPress={() => router.push(`/chat?productId=${product.id}`)}
          className="h-14 w-14 items-center justify-center rounded-2xl border border-neutral-700 active:bg-neutral-800"
        >
          <ChatIcon color={colors.neutral[0]} />
        </PressableScale>
        <PressableScale
          accessibilityLabel="Add to bag"
          onPress={() => cart.add(product, size)}
          className="h-14 w-14 items-center justify-center rounded-2xl border border-neutral-700 active:bg-neutral-800"
        >
          <BagIcon color={colors.neutral[0]} />
        </PressableScale>
        <PressableScale
          onPress={() => setBuyOpen(true)}
          className="h-14 flex-1 items-center justify-center rounded-[18px] bg-primary active:opacity-90"
        >
          <AppText className="text-base font-semibold text-neutral-950">
            Buy Now
          </AppText>
        </PressableScale>
      </View>

      <BuySheet
        product={buyOpen ? product : null}
        initialSize={size}
        onClose={() => setBuyOpen(false)}
        onAddToCart={({ product, size }) => cart.add(product, size)}
      />
    </Screen>
  );
}
