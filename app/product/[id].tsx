import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { ShareIcon } from "@/components/icons/ShareIcon";
import { StarIcon } from "@/components/icons/StarIcon";
import { BagIcon } from "@/components/icons/header/BagIcon";
import { ChatIcon } from "@/components/icons/header/ChatIcon";
import { Screen } from "@/components/layout/Screen";
import { AppImage } from "@/components/ui/AppImage";
import { PressableScale } from "@/components/ui/PressableScale";
import { Chips } from "@/components/ui/Chips";
import { IconButton } from "@/components/ui/IconButton";
import { Reviews } from "@/components/product/Reviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { PRODUCTS } from "@/data/products";
import { REVIEWS } from "@/data/reviews";
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

  const product = PRODUCTS.find((item) => item.id === id);

  const [favorite, setFavorite] = useState(false);
  const [size, setSize] = useState<(typeof SIZES)[number]>("S");
  const [selectedImage, setSelectedImage] = useState(0);
  const [expanded, setExpanded] = useState(false);

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

  // Real angle images when available; otherwise repeat the single image so the
  // thumbnail strip still shows four selectable slots.
  const gallery = product.images?.length
    ? product.images
    : [product.image, product.image, product.image, product.image];
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
          <IconButton accessibilityLabel="Bag">
            <BagIcon color={colors.neutral[0]} />
          </IconButton>
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
        <View className="overflow-hidden rounded-3xl bg-neutral-800 p-4">
          <View className="aspect-[1.15] w-full">
            <AppImage
              source={gallery[selectedImage]}
              className="size-full"
              contentFit="contain"
            />
          </View>

          <PressableScale
            onPress={() => setFavorite((prev) => !prev)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
              favorite ? "Remove from favorites" : "Add to favorites"
            }
            className="absolute right-4 top-4 h-10 w-10 items-center justify-center rounded-full bg-neutral-700 active:opacity-80"
          >
            <HeartIcon filled={favorite} size={20} />
          </PressableScale>

          {/* Thumbnails — only when there are multiple angles */}
          {gallery.length > 1 ? (
            <View className="-mt-2 flex-row gap-3">
              {gallery.map((image, index) => {
                const active = index === selectedImage;
                return (
                  <PressableScale
                    key={index}
                    onPress={() => setSelectedImage(index)}
                    className={`h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 ${
                      active ? "border-2 border-primary" : ""
                    }`}
                  >
                    <AppImage
                      source={image}
                      className="size-full"
                      contentFit="contain"
                    />
                  </PressableScale>
                );
              })}
            </View>
          ) : null}
        </View>

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
          className="h-14 w-14 items-center justify-center rounded-2xl border border-neutral-700 active:bg-neutral-800"
        >
          <BagIcon color={colors.neutral[0]} />
        </PressableScale>
        <PressableScale className="h-14 flex-1 items-center justify-center rounded-[18px] bg-primary active:opacity-90">
          <AppText className="text-base font-semibold text-neutral-950">
            Buy Now
          </AppText>
        </PressableScale>
      </View>
    </Screen>
  );
}
