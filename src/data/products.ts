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
    rating: 4.8,
    reviews: 16,
    description: "Timeless. Easy. Made to wear for years. Perfect for everyday wear.",
    details: [
      "Premium handpicked quality",
      "WhatsApp to order: +94 76 867 8104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "2",
    name: "Floral Peplum Top",
    price: 1950,
    originalPrice: 2900,
    image: "/images/products/floral-peplum-top1.webp",
    hoverImage: "/images/products/floral-peplum-top2.webp",
    images: [
      "/images/products/floral-peplum-top1.webp",
      "/images/products/floral-peplum-top2.webp",
      "/images/products/floral-peplum-top3.webp"
    ],
    category: "Tops",
    sizes: ["S", "M", "L"],
    colors: ["#b71c1c"], // red
    gender: "Women",
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviews: 101,
    description: "Timeless. Effortless. Always in style. Perfect for everyday looks",
    details: [
      "WhatsApp to order: +94 76 867 8104",
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
    rating: 4.8,
    reviews: 91,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "4",
    name: "Purple Cutwork Top",
    price: 2250,
    originalPrice: 3500,
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
    colors: ["#800080"], // little purple
    gender: "Women",
    isNew: true,
    isBestSeller: true,
    rating: 4.6,
    reviews: 21,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
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
    colors: ["#ffffff"], // white
    gender: "Women",
    isNew: true,
    rating: 4.6,
    reviews: 58,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
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
    colors: ["#ffffff"], // white
    gender: "Men",
    isNew: true,
    isBestSeller: true,
    rating: 4.7,
    reviews: 46,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "7",
    name: "Mens Navy Printed Short Sleeve Shirt",
    price: 3750,
    image: "/images/products/mens-navy-printed-short-sleeve-shirt1.webp",
    hoverImage: "/images/products/mens-navy-printed-short-sleeve-shirt2.webp",
    images: [
      "/images/products/mens-navy-printed-short-sleeve-shirt1.webp",
      "/images/products/mens-navy-printed-short-sleeve-shirt2.webp",
      "/images/products/mens-navy-printed-short-sleeve-shirt3.webp"
    ],
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000080"], 
    gender: "Men",
    isNew: true,
    rating: 4.2,
    reviews: 67,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "8",
    name: "Pink Stripe Ladies Oversized Shirt",
    price: 2300,
    originalPrice: 3500,
    image: "/images/products/pink-stripe-ladies-oversized-shirt1.webp",
    hoverImage: "/images/products/pink-stripe-ladies-oversized-shirt2.webp",
    images: [
      "/images/products/pink-stripe-ladies-oversized-shirt1.webp",
      "/images/products/pink-stripe-ladies-oversized-shirt2.webp",
      "/images/products/pink-stripe-ladies-oversized-shirt3.webp"
    ],
    category: "Shirts",
    sizes: ["S", "M", "L"],
    colors: ["#ffc0cb"], 
    gender: "Women",
    isNew: true,
    isBestSeller: true,
    rating: 4.3,
    reviews: 43,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "9",
    name: "Green Leaf Printed Cuban Collar Shirt",
    price: 3750,
    image: "/images/products/green-leaf-printed-cuban-collar-shirt1.webp",
    hoverImage: "/images/products/green-leaf-printed-cuban-collar-shirt2.webp",
    images: [
      "/images/products/green-leaf-printed-cuban-collar-shirt1.webp",
      "/images/products/green-leaf-printed-cuban-collar-shirt2.webp",
      "/images/products/green-leaf-printed-cuban-collar-shirt3.webp"
    ],
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#388e3c"], 
    gender: "Men",
    isNew: true,
    rating: 4.7,
    reviews: 72,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "10",
    name: "Khaki Short Sleeve Shirt",
    price: 3750,
    image: "/images/products/khaki-short-sleeve-shirt1.webp",
    hoverImage: "/images/products/khaki-short-sleeve-shirt2.webp",
    images: [
      "/images/products/khaki-short-sleeve-shirt1.webp",
      "/images/products/khaki-short-sleeve-shirt2.webp",
      "/images/products/khaki-short-sleeve-shirt3.webp"
    ],
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#c3b091"], 
    gender: "Men",
    isNew: true,
    rating: 4.8,
    reviews: 41,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "11",
    name: "Peacock stripe Long Dress",
    price: 4500,
    image: "/images/products/peacock-stripe-long-dress1.webp",
    hoverImage: "/images/products/peacock-stripe-long-dress2.webp",
    images: [
      "/images/products/peacock-stripe-long-dress1.webp",
      "/images/products/peacock-stripe-long-dress2.webp",
      "/images/products/peacock-stripe-long-dress3.webp"
    ],
    category: "Dresses",
    sizes: ["UK8", "UK10", "UK12"],
    colors: ["#000000", "#ffffff"], // mix black & white
    gender: "Women",
    isNew: true,
    rating: 5.0,
    reviews: 109,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "12",
    name: "Navy and Green Stripe T-shirt",
    price: 3250,
    image: "/images/products/navy-and-green-stripe-t-shirt1.webp",
    hoverImage: "/images/products/navy-and-green-stripe-t-shirt2.webp",
    images: [
      "/images/products/navy-and-green-stripe-t-shirt1.webp",
      "/images/products/navy-and-green-stripe-t-shirt2.webp",
      "/images/products/navy-and-green-stripe-t-shirt3.webp"
    ],
    category: "T-Shirts",
    sizes: ["UK8", "UK10", "UK12"],
    colors: ["#000080", "#008000"], // mix blue and green
    gender: "Men",
    isNew: true,
    rating: 4.6,
    reviews: 46,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
      "Cash on Delivery | Bank Deposits"
    ]
  },
  {
    id: "13",
    name: "The Outline Pant",
    price: 4200,
    image: "/images/products/the-outline-pant1.webp",
    hoverImage: "/images/products/the-outline-pant2.webp",
    images: [
      "/images/products/the-outline-pant1.webp",
      "/images/products/the-outline-pant2.webp",
      "/images/products/the-outline-pant3.webp"
    ],
    category: "Pants",
    sizes: ["2", "4", "6"],
    colors: ["#ffffff"], // white
    gender: "Men",
    isNew: true,
    rating: 4.8,
    reviews: 42,
    description: "Timeless. Effortless. Always in style.",
    details: [
      "WhatsApp to order: +94 76 867 8104",
      "Cash on Delivery | Bank Deposits"
    ]
  }
];
