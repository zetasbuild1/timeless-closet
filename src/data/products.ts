export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
  rating?: number;
  reviews?: number;
  sizes?: string[];
  colors?: string[];
  gender?: 'Women' | 'Men' | 'Unisex';
  isBestSeller?: boolean;
  hoverImage?: string;
  images?: string[];
  description?: string;
  details?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "The Evergreen Shirt",
    price: 3750,
    image: "/images/products/evergreen-shirt1.webp", 
    hoverImage: "/images/products/evergreen-shirt2.webp",
    images: [
      "/images/products/evergreen-shirt1.webp",
      "/images/products/evergreen-shirt2.webp",
      "/images/products/evergreen-shirt3.webp"
    ],
    category: "Shirts",
    sizes: ["S", "M", "L"],
    colors: ["#89ac8c"], // Sage green
    gender: "Men",
    isNew: true,
    description: "Timeless. Easy. Made to wear for years. Perfect for everyday wear.",
    details: [
      "Premium handpicked quality",
      "WhatsApp to order: 0768 678 104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "2",
    name: "Floral Peplum Top",
    price: 2900,
    image: "/images/products/floral-peplum-top1.webp",
    hoverImage: "/images/products/floral-peplum-top2.webp",
    images: [
      "/images/products/floral-peplum-top1.webp",
      "/images/products/floral-peplum-top2.webp",
      "/images/products/floral-peplum-top3.webp"
    ],
    category: "Tops",
    sizes: ["S", "M", "L"],
    colors: ["#ffffff", "#ffc0cb"], // assuming light/floral colors
    gender: "Women",
    isNew: true,
    description: "Timeless. Effortless. Always in style. Perfect for everyday looks",
    details: [
      "WhatsApp to order: 0768 678 104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "3",
    name: "Men's Blue Printed Shirt",
    price: 3750,
    image: "/images/products/blue-printed-shirt1.webp",
    hoverImage: "/images/products/blue-printed-shirt2.webp",
    images: [
      "/images/products/blue-printed-shirt1.webp",
      "/images/products/blue-printed-shirt2.webp",
      "/images/products/blue-printed-shirt3.webp"
    ],
    category: "Shirts",
    sizes: ["S", "M", "L"],
    colors: ["#1e3a8a"], // assuming dark blue
    gender: "Men",
    isNew: true,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: 0768 678 104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "4",
    name: "Purple Cutwork Top",
    price: 3500,
    image: "/images/products/purple-cutwork-top1.webp",
    hoverImage: "/images/products/purple-cutwork-top2.webp",
    images: [
      "/images/products/purple-cutwork-top1.webp",
      "/images/products/purple-cutwork-top2.webp",
      "/images/products/purple-cutwork-top3.webp",
      "/images/products/purple-cutwork-top4.webp"
    ],
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#800080"], // purple
    gender: "Women",
    isNew: true,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: 0768 678 104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "5",
    name: "Floral Print Mini Dress",
    price: 3850,
    image: "/images/products/floral-print-mini-dress1.webp",
    hoverImage: "/images/products/floral-print-mini-dress2.webp",
    images: [
      "/images/products/floral-print-mini-dress1.webp",
      "/images/products/floral-print-mini-dress2.webp",
      "/images/products/floral-print-mini-dress3.webp",
      "/images/products/floral-print-mini-dress4.webp",
      "/images/products/floral-print-mini-dress5.webp"
    ],
    category: "Dresses",
    sizes: ["XS", "M", "L"],
    colors: ["#ffffff", "#ffc0cb"], // assuming floral colors
    gender: "Women",
    isNew: true,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: 0768 678 104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "6",
    name: "Mens Olive Stripe Short Sleeve Shirt",
    price: 3750,
    image: "/images/products/mens-olive-stripe-short-sleeve-shirt1.webp",
    hoverImage: "/images/products/mens-olive-stripe-short-sleeve-shirt2.webp",
    images: [
      "/images/products/mens-olive-stripe-short-sleeve-shirt1.webp",
      "/images/products/mens-olive-stripe-short-sleeve-shirt2.webp",
      "/images/products/mens-olive-stripe-short-sleeve-shirt3.webp"
    ],
    category: "Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#556b2f"], // olive green
    gender: "Men",
    isNew: true,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: 0768 678 104",
      "Cash on Delivery | Bank Deposits"
    ]
  }
];
