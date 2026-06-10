import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { type Product } from "@/data/products";

export type CartItem = {
  /** Unique per product + size combination. */
  key: string;
  product: Product;
  size?: string;
  qty: number;
  /** Checked in the cart list (counts toward totals). */
  selected: boolean;
};

// Demo totals — fixed delivery + a promo discount, like the design.
export const DELIVERY_FEE = 4.9;
export const PROMO_CODE = "YellowChick";
export const DISCOUNT_RATE = 0.2;

type CartContextValue = {
  items: CartItem[];
  /** Total quantity across all items (for badges). */
  count: number;
  allSelected: boolean;
  subtotal: number;
  discount: number;
  total: number;
  add: (product: Product, size?: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  toggle: (key: string) => void;
  toggleAll: () => void;
  clear: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

const keyFor = (product: Product, size?: string) =>
  `${product.id}::${size ?? "default"}`;

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (product: Product, size?: string) => {
    const key = keyFor(product, size);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { key, product, size, qty: 1, selected: true }];
    });
  }

  const setQty = (key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
    );
  }

  const remove = (key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }

  const toggle = (key: string) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, selected: !i.selected } : i)),
    );
  }

  const toggleAll = () => {
    setItems((prev) => {
      const next = !prev.every((i) => i.selected);
      return prev.map((i) => ({ ...i, selected: next }));
    });
  }

  const clear = () => setItems([]);

  const value = {
    items,
    count: items.reduce((sum, i) => sum + i.qty, 0),
    allSelected: items.length > 0 && items.every((i) => i.selected),
    subtotal: items.filter((i) => i.selected).reduce((sum, i) => sum + i.product.price * i.qty, 0),
    discount: items.filter((i) => i.selected).reduce((sum, i) => sum + i.product.price * i.qty, 0) * DISCOUNT_RATE,
    total: items.filter((i) => i.selected).reduce((sum, i) => sum + i.product.price * i.qty, 0) > 0 ? items.filter((i) => i.selected).reduce((sum, i) => sum + i.product.price * i.qty, 0) - items.filter((i) => i.selected).reduce((sum, i) => sum + i.product.price * i.qty, 0) * DISCOUNT_RATE + DELIVERY_FEE : 0,
    add,
      setQty,
      remove,
      toggle,
      toggleAll,
      clear,
    };


  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
