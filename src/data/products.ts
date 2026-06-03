// Single source of truth for products. Screens import this and
// filter / sort / slice it as needed (home grid, search results, etc.).
// Add a product by appending here with the right `category`.

export type Product = {
  id: string;
  name: string;
  category: string;
  image: number;
  rating: number;
  reviews: number;
  price: number;
};

export const PRODUCTS: Product[] = [
  // T-Shirts
  {
    id: "1",
    name: "Striped Polo Shirt",
    category: "T-Shirts",
    image: require("../../assets/images/products/tshirt1.png"),
    rating: 4.8,
    reviews: 412,
    price: 42,
  },
  {
    id: "2",
    name: "Color Block V-Neck Tee",
    category: "T-Shirts",
    image: require("../../assets/images/products/tshirt2.png"),
    rating: 4.9,
    reviews: 562,
    price: 45,
  },
  {
    id: "3",
    name: "Classic Cotton T-Shirt",
    category: "T-Shirts",
    image: require("../../assets/images/products/tshirt3.png"),
    rating: 4.7,
    reviews: 318,
    price: 38,
  },
  {
    id: "4",
    name: "Graphic Street Tee",
    category: "T-Shirts",
    image: require("../../assets/images/products/tshirt4.png"),
    rating: 4.6,
    reviews: 204,
    price: 40,
  },
  {
    id: "5",
    name: "Midnight Block T-Shirt",
    category: "T-Shirts",
    image: require("../../assets/images/products/tshirt5.png"),
    rating: 4.6,
    reviews: 318,
    price: 48,
  },
  {
    id: "6",
    name: "Essential Yellow Tee",
    category: "T-Shirts",
    image: require("../../assets/images/products/tshirt6.png"),
    rating: 4.9,
    reviews: 740,
    price: 35,
  },
  // Shorts
  {
    id: "7",
    name: "Athletic Running Shorts",
    category: "Shorts",
    image: require("../../assets/images/products/shorts1.png"),
    rating: 4.5,
    reviews: 210,
    price: 28,
  },
  {
    id: "8",
    name: "Cargo Utility Shorts",
    category: "Shorts",
    image: require("../../assets/images/products/shorts2.png"),
    rating: 4.7,
    reviews: 156,
    price: 34,
  },
  {
    id: "9",
    name: "Classic Chino Shorts",
    category: "Shorts",
    image: require("../../assets/images/products/shorts4.png"),
    rating: 4.6,
    reviews: 189,
    price: 32,
  },
  // Hats
  {
    id: "10",
    name: "Beanie Hat",
    category: "Hats",
    image: require("../../assets/images/products/hat.png"),
    rating: 4.8,
    reviews: 240,
    price: 22,
  },
  // Shoes
  {
    id: "11",
    name: "Runner Low Sneaker",
    category: "Shoes",
    image: require("../../assets/images/products/shoe1.png"),
    rating: 4.7,
    reviews: 489,
    price: 89,
  },
  {
    id: "12",
    name: "Court Classic Trainer",
    category: "Shoes",
    image: require("../../assets/images/products/shoe2.png"),
    rating: 4.8,
    reviews: 612,
    price: 95,
  },
  {
    id: "13",
    name: "Trail Sport Shoe",
    category: "Shoes",
    image: require("../../assets/images/products/shoe3.png"),
    rating: 4.6,
    reviews: 274,
    price: 110,
  },
  {
    id: "14",
    name: "Street Canvas Sneaker",
    category: "Shoes",
    image: require("../../assets/images/products/shoe4.png"),
    rating: 4.9,
    reviews: 831,
    price: 79,
  },
  {
    id: "15",
    name: "Retro High Top",
    category: "Shoes",
    image: require("../../assets/images/products/shoe5.png"),
    rating: 4.5,
    reviews: 198,
    price: 102,
  },
  // Bags
  {
    id: "16",
    name: "Everyday Tote Bag",
    category: "Bags",
    image: require("../../assets/images/products/bag.png"),
    rating: 4.7,
    reviews: 320,
    price: 55,
  },
  {
    id: "17",
    name: "Canvas Shopper Bag",
    category: "Bags",
    image: require("../../assets/images/products/bag2.png"),
    rating: 4.6,
    reviews: 210,
    price: 48,
  },
];
