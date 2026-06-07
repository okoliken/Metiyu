// Mock orders for the Orders tab + Detail Order screen. Each order groups one
// or more line items (a product, a size, a quantity) plus fulfilment and
// payment metadata. Products come from the single product source.
import { PRODUCTS, type Product } from "./products";

export const ORDER_STATUSES = [
  "Waiting for Payment",
  "Packing",
  "Delivered",
  "Give Review",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export type OrderItem = {
  product: Product;
  size: string;
  quantity: number;
};

export type Order = {
  id: string;
  status: OrderStatus;
  /** Banner headline on the detail screen, e.g. "On Delivery". */
  statusLabel: string;
  /** Banner subtitle, e.g. "Estimated received at 30th December, 2025". */
  etaLabel: string;
  items: OrderItem[];
  paymentMethod: string;
  shipment: string;
  deliveryAddress: string;
  dateLabel: string;
  transactionId: string;
  paymentStatus: string;
};

const product = (id: string): Product => {
  const found = PRODUCTS.find((item) => item.id === id);
  if (!found) throw new Error(`orders.ts: unknown product id "${id}"`);
  return found;
};

/** Sum of every line (price × quantity). Pass live quantities to override. */
export function orderTotal(order: Order, quantities?: number[]): number {
  return order.items.reduce((sum, item, index) => {
    const qty = quantities ? quantities[index] : item.quantity;
    return sum + item.product.price * qty;
  }, 0);
}

export const ORDERS: Order[] = [
  {
    id: "ORD-1024",
    status: "Delivered",
    statusLabel: "On Delivery",
    etaLabel: "Estimated received at 30th December, 2025",
    items: [
      { product: product("2"), size: "M", quantity: 1 },
      { product: product("7"), size: "M", quantity: 1 },
    ],
    paymentMethod: "Mastercard",
    shipment: "JNE Express",
    deliveryAddress: "Home",
    dateLabel: "30th Dec, 2025 | 11.00 AM",
    transactionId: "SPYIYTEGKKH76735",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-1023",
    status: "Delivered",
    statusLabel: "On Delivery",
    etaLabel: "Estimated received at 2nd January, 2026",
    items: [{ product: product("6"), size: "L", quantity: 2 }],
    paymentMethod: "Visa",
    shipment: "JNE Express",
    deliveryAddress: "Office",
    dateLabel: "28th Dec, 2025 | 09.30 AM",
    transactionId: "SPYIYTEGKKH76512",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-1022",
    status: "Waiting for Payment",
    statusLabel: "Waiting for Payment",
    etaLabel: "Complete payment before 31st December, 2025",
    items: [{ product: product("11"), size: "42", quantity: 1 }],
    paymentMethod: "Bank Transfer",
    shipment: "SiCepat",
    deliveryAddress: "Home",
    dateLabel: "29th Dec, 2025 | 02.15 PM",
    transactionId: "SPYIYTEGKKH76488",
    paymentStatus: "Unpaid",
  },
  {
    id: "ORD-1021",
    status: "Waiting for Payment",
    statusLabel: "Waiting for Payment",
    etaLabel: "Complete payment before 1st January, 2026",
    items: [{ product: product("16"), size: "One Size", quantity: 1 }],
    paymentMethod: "Bank Transfer",
    shipment: "JNE Express",
    deliveryAddress: "Home",
    dateLabel: "29th Dec, 2025 | 05.40 PM",
    transactionId: "SPYIYTEGKKH76470",
    paymentStatus: "Unpaid",
  },
  {
    id: "ORD-1020",
    status: "Packing",
    statusLabel: "Packing Your Order",
    etaLabel: "Estimated received at 3rd January, 2026",
    items: [{ product: product("1"), size: "M", quantity: 1 }],
    paymentMethod: "Mastercard",
    shipment: "JNE Express",
    deliveryAddress: "Home",
    dateLabel: "30th Dec, 2025 | 10.05 AM",
    transactionId: "SPYIYTEGKKH76455",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-1019",
    status: "Packing",
    statusLabel: "Packing Your Order",
    etaLabel: "Estimated received at 4th January, 2026",
    items: [{ product: product("13"), size: "43", quantity: 1 }],
    paymentMethod: "GoPay",
    shipment: "SiCepat",
    deliveryAddress: "Office",
    dateLabel: "30th Dec, 2025 | 12.20 PM",
    transactionId: "SPYIYTEGKKH76441",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-1018",
    status: "Give Review",
    statusLabel: "Delivered",
    etaLabel: "Received on 26th December, 2025",
    items: [{ product: product("3"), size: "S", quantity: 1 }],
    paymentMethod: "Mastercard",
    shipment: "JNE Express",
    deliveryAddress: "Home",
    dateLabel: "24th Dec, 2025 | 08.00 AM",
    transactionId: "SPYIYTEGKKH76399",
    paymentStatus: "Paid",
  },
  {
    id: "ORD-1017",
    status: "Give Review",
    statusLabel: "Delivered",
    etaLabel: "Received on 25th December, 2025",
    items: [{ product: product("12"), size: "41", quantity: 1 }],
    paymentMethod: "Visa",
    shipment: "JNE Express",
    deliveryAddress: "Home",
    dateLabel: "23rd Dec, 2025 | 04.45 PM",
    transactionId: "SPYIYTEGKKH76382",
    paymentStatus: "Paid",
  },
];
