export type Review = {
  id: string;
  name: string;
  rating: number;
  time: string;
  comment: string;
  /** Optional photos attached to the review (require()'d image modules). */
  media?: number[];
};

// Placeholder reviews. Replace with a real source when available.
export const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    rating: 5,
    time: "2 hours ago",
    comment:
      "Absolutely love the fabric! It feels premium and very soft against the skin. The size S fits me perfectly. Highly recommended!",
  },
  {
    id: "2",
    name: "Michael Tan",
    rating: 4,
    time: "Yesterday",
    comment:
      "Great quality for the price. The colors are vibrant just like in the photos. Shipping was a bit slow, but the product is worth the wait.",
  },
  {
    id: "3",
    name: "Dave Wijaya",
    rating: 5,
    time: "3 days ago",
    comment:
      "Super comfortable and fits true to size. Definitely buying another color.",
  },
  {
    id: "4",
    name: "Jessica Lee",
    rating: 5,
    time: "1 week ago",
    comment:
      "Bought this for my husband and he loves it. It doesn't shrink after washing and looks great with jeans or shorts.",
  },
  {
    id: "5",
    name: "Michael Chen",
    rating: 4,
    time: "5 days ago",
    comment:
      "The color blocking looks even better in person! The fabric texture is premium and the stitching is very neat. Uploaded some close-up shots for reference.",
    media: [
      require("../../assets/images/products/tshirt1.png"),
      require("../../assets/images/products/tshirt2.png"),
      require("../../assets/images/products/tshirt3.png"),
    ],
  },
  {
    id: "6",
    name: "Alex Thorne",
    rating: 4,
    time: "1 week ago",
    comment:
      "Finally found a V-neck that isn't too deep. The cut is modern and looks sharp. Will definitely order the black one next!",
  },
  {
    id: "7",
    name: "John Martinez",
    rating: 4,
    time: "1 week ago",
    comment:
      "Solid quality for the price. The fit is true to size, just slightly loose around the sleeves which I actually prefer.",
    media: [require("../../assets/images/products/tshirt4.png")],
  },
  {
    id: "8",
    name: "Sarah Jenkins",
    rating: 5,
    time: "2 weeks ago",
    comment:
      "Bought this for my husband and he loves it. It doesn't shrink after washing and looks great with jeans or shorts.",
    media: [
      require("../../assets/images/products/tshirt1.png"),
      require("../../assets/images/products/tshirt5.png"),
      require("../../assets/images/products/tshirt6.png"),
      require("../../assets/images/products/tshirt2.png"),
    ],
  },
];
