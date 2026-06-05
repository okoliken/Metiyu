import { ScrollView, View } from "react-native";
import { AppText } from "@/components/ui/AppText";

import { ProductCard } from "@/components/product/ProductCard";
import { type Product } from "@/data/products";

type RelatedProductsProps = {
  products: Product[];
  title?: string;
};

export function RelatedProducts({
  products,
  title = "You Might Also Like",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <View>
      <View className="border-t border-neutral-800 pt-6">
        <AppText className="text-lg font-semibold text-neutral-0">
          {title}
        </AppText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingTop: 16 }}
      >
        {products.map((item) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            rating={item.rating}
            reviews={item.reviews}
            price={item.price}
            widthClassName="w-44"
          />
        ))}
      </ScrollView>
    </View>
  );
}
