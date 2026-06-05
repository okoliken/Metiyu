import type { ImageSourcePropType } from "react-native";

export type CategoryImageLayout = {
  width: number;
  height: number;
  right?: number;
  /** Vertical anchor inside the card. */
  align?: "center" | "bottom";
  /** Fine-tune vertical position (positive moves down). */
  offsetY?: number;
  contentPosition?: "center" | "right" | "top right" | "bottom right";
};

export type Category = {
  id: string;
  name: string;
  description: string;
  productCount: number;
  image: ImageSourcePropType;
  imageLayout: CategoryImageLayout;
  /** Extra space below when the image bleeds past the card. */
  spacingBottom?: number;
};

export const CATEGORY_CARD_HEIGHT = 136;

export const CATEGORIES: Category[] = [
  {
    id: "jackets",
    name: "Jackets",
    description: "Elevate your style with our premium outerwear.",
    productCount: 736,
    image: require("../../assets/images/categories/jackets.png"),
    imageLayout: {
      width: 190,
      height: 160,
      right: 0,
      align: "center",
      contentPosition: "right",
    },
  },
  {
    id: "t-shirts",
    name: "T-Shirts",
    description: "Soft, breathable cotton for your everyday look.",
    productCount: 1200,
    image: require("../../assets/images/categories/t-shirts.png"),
    imageLayout: {
      width: 190,
      height: 160,
      right: 0,
      align: "center",
      contentPosition: "right",
    },
  },
  {
    id: "shoes",
    name: "Shoes",
    description: "Walk with confidence in trendy and durable sneakers.",
    productCount: 585,
    image: require("../../assets/images/categories/shoes.png"),
    imageLayout: {
      width: 190,
      height: 150,
      right: 10,
      align: "center",
      offsetY: 0,
      contentPosition: "right",
    },
  },
  {
    id: "bags",
    name: "Bags",
    description: "Carry your essentials in style, anywhere you go.",
    productCount: 190,
    image: require("../../assets/images/categories/bags.png"),
    imageLayout: {
      width: 175,
      height: 128,
      right: 12,
      align: "bottom",
      offsetY: 0,
      contentPosition: "bottom right",
    },
  },
];
