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
}

export const products: Product[] = [
  {
    id: "1",
    name: "Linen Oversized Shirt",
    price: 4950,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    isNew: true,
    sizes: [
      "L",
      "M",
      "S",
      "XXL"
    ],
    colors: [
      "#000000",
      "#b71c1c",
      "#388e3c"
    ],
    gender: "Women"
  },
  {
    id: "2",
    name: "Floral Maxi Dress",
    price: 6050,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    rating: 4.8,
    reviews: 12,
    sizes: [
      "L",
      "XL",
      "M"
    ],
    colors: [
      "#ffffff",
      "#b71c1c"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "3",
    name: "Casual Cotton T-Shirt",
    price: 2450,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "T-Shirts",
    sizes: [
      "S",
      "XS",
      "M",
      "XL"
    ],
    colors: [
      "#388e3c",
      "#ffffff",
      "#b71c1c"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "4",
    name: "High Waist Jeans",
    price: 5450,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jeans",
    sizes: [
      "XXL",
      "S",
      "XL",
      "XS"
    ],
    colors: [
      "#000000",
      "#388e3c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "5",
    name: "Oversized Blazer",
    price: 7950,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jackets",
    isNew: true,
    sizes: [
      "S",
      "XXL"
    ],
    colors: [
      "#ffffff",
      "#546e7a",
      "#000000"
    ],
    gender: "Women"
  },
  {
    id: "6",
    name: "Striped Long Sleeve",
    price: 3450,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    sizes: [
      "S",
      "L"
    ],
    colors: [
      "#388e3c",
      "#000000",
      "#e0d8d0"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "7",
    name: "Mini Summer Dress",
    price: 5050,
    originalPrice: 7450,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    isOnSale: true,
    sizes: [
      "M",
      "L",
      "XXL",
      "XL"
    ],
    colors: [
      "#b71c1c",
      "#ffffff",
      "#e0d8d0"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "8",
    name: "Denim Jacket",
    price: 6950,
    originalPrice: 9500,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jackets",
    isOnSale: true,
    rating: 4.6,
    reviews: 34,
    sizes: [
      "XXL",
      "XL",
      "L",
      "M"
    ],
    colors: [
      "#b71c1c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "9",
    name: "Classic White Shirt",
    price: 4450,
    originalPrice: 5900,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    isOnSale: true,
    rating: 4.8,
    reviews: 56,
    sizes: [
      "XL",
      "L"
    ],
    colors: [
      "#ffffff",
      "#000000",
      "#546e7a"
    ],
    gender: "Women",
    isNew: true
  },
  {
    id: "10",
    name: "Black Slim Fit Jeans",
    price: 5950,
    originalPrice: 8080,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jeans",
    isOnSale: true,
    rating: 4.5,
    reviews: 42,
    sizes: [
      "XS",
      "XXL"
    ],
    colors: [
      "#e0d8d0",
      "#388e3c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "11",
    name: "Printed Summer Dress",
    price: 6450,
    originalPrice: 8500,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    isOnSale: true,
    rating: 4.9,
    reviews: 89,
    sizes: [
      "L",
      "M"
    ],
    colors: [
      "#b71c1c",
      "#546e7a"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "12",
    name: "Basic Crew Neck Tee",
    price: 2250,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "T-Shirts",
    isOnSale: true,
    rating: 4.7,
    reviews: 120,
    sizes: [
      "XS",
      "S"
    ],
    colors: [
      "#ffffff"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "13",
    name: "Linen Oversized Shirt - Variant 2",
    price: 4950,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    isNew: true,
    sizes: [
      "XS",
      "S",
      "L"
    ],
    colors: [
      "#e0d8d0",
      "#000000",
      "#388e3c"
    ],
    gender: "Women"
  },
  {
    id: "14",
    name: "Floral Maxi Dress - Variant 2",
    price: 6050,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    rating: 4.8,
    reviews: 12,
    sizes: [
      "S",
      "XS",
      "M"
    ],
    colors: [
      "#388e3c",
      "#b71c1c"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "15",
    name: "Casual Cotton T-Shirt - Variant 2",
    price: 2450,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "T-Shirts",
    sizes: [
      "XS",
      "XXL",
      "L"
    ],
    colors: [
      "#b71c1c",
      "#388e3c",
      "#ffffff"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "16",
    name: "High Waist Jeans - Variant 2",
    price: 5450,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jeans",
    sizes: [
      "XS",
      "XXL"
    ],
    colors: [
      "#000000",
      "#ffffff"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "17",
    name: "Oversized Blazer - Variant 2",
    price: 7950,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jackets",
    isNew: true,
    sizes: [
      "XL",
      "XS",
      "XXL"
    ],
    colors: [
      "#b71c1c"
    ],
    gender: "Women"
  },
  {
    id: "18",
    name: "Striped Long Sleeve - Variant 2",
    price: 3450,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    sizes: [
      "XS",
      "S"
    ],
    colors: [
      "#388e3c",
      "#b71c1c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "19",
    name: "Mini Summer Dress - Variant 2",
    price: 5050,
    originalPrice: 7450,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    isOnSale: true,
    sizes: [
      "XS",
      "L",
      "M",
      "XL"
    ],
    colors: [
      "#ffffff",
      "#546e7a"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "20",
    name: "Denim Jacket - Variant 2",
    price: 6950,
    originalPrice: 9500,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jackets",
    isOnSale: true,
    rating: 4.6,
    reviews: 34,
    sizes: [
      "XXL",
      "XS"
    ],
    colors: [
      "#388e3c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "21",
    name: "Classic White Shirt - Variant 2",
    price: 4450,
    originalPrice: 5900,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    isOnSale: true,
    rating: 4.8,
    reviews: 56,
    sizes: [
      "S",
      "L",
      "XS",
      "XL"
    ],
    colors: [
      "#b71c1c",
      "#ffffff",
      "#000000"
    ],
    gender: "Women",
    isNew: true
  },
  {
    id: "22",
    name: "Black Slim Fit Jeans - Variant 2",
    price: 5950,
    originalPrice: 8080,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jeans",
    isOnSale: true,
    rating: 4.5,
    reviews: 42,
    sizes: [
      "L",
      "M",
      "XXL",
      "S"
    ],
    colors: [
      "#546e7a",
      "#e0d8d0",
      "#ffffff"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "23",
    name: "Printed Summer Dress - Variant 2",
    price: 6450,
    originalPrice: 8500,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    isOnSale: true,
    rating: 4.9,
    reviews: 89,
    sizes: [
      "L",
      "XS",
      "M",
      "S"
    ],
    colors: [
      "#546e7a",
      "#b71c1c",
      "#e0d8d0"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "24",
    name: "Basic Crew Neck Tee - Variant 2",
    price: 2250,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "T-Shirts",
    isOnSale: true,
    rating: 4.7,
    reviews: 120,
    sizes: [
      "S",
      "XS",
      "L"
    ],
    colors: [
      "#e0d8d0",
      "#546e7a",
      "#388e3c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "25",
    name: "Linen Oversized Shirt - Variant 3",
    price: 4950,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    isNew: true,
    sizes: [
      "XXL",
      "XL",
      "L"
    ],
    colors: [
      "#000000"
    ],
    gender: "Women"
  },
  {
    id: "26",
    name: "Floral Maxi Dress - Variant 3",
    price: 6050,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    rating: 4.8,
    reviews: 12,
    sizes: [
      "L",
      "XS",
      "XXL",
      "S"
    ],
    colors: [
      "#388e3c"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "27",
    name: "Casual Cotton T-Shirt - Variant 3",
    price: 2450,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "T-Shirts",
    sizes: [
      "XXL",
      "XS",
      "S",
      "XL"
    ],
    colors: [
      "#546e7a"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "28",
    name: "High Waist Jeans - Variant 3",
    price: 5450,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jeans",
    sizes: [
      "XS",
      "XXL",
      "M",
      "S"
    ],
    colors: [
      "#e0d8d0"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "29",
    name: "Oversized Blazer - Variant 3",
    price: 7950,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jackets",
    isNew: true,
    sizes: [
      "XS",
      "S"
    ],
    colors: [
      "#e0d8d0",
      "#ffffff",
      "#546e7a"
    ],
    gender: "Women"
  },
  {
    id: "30",
    name: "Striped Long Sleeve - Variant 3",
    price: 3450,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    sizes: [
      "XXL",
      "L",
      "M"
    ],
    colors: [
      "#546e7a",
      "#e0d8d0",
      "#388e3c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "31",
    name: "Mini Summer Dress - Variant 3",
    price: 5050,
    originalPrice: 7450,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    isOnSale: true,
    sizes: [
      "M",
      "S",
      "XS"
    ],
    colors: [
      "#000000",
      "#ffffff"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "32",
    name: "Denim Jacket - Variant 3",
    price: 6950,
    originalPrice: 9500,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jackets",
    isOnSale: true,
    rating: 4.6,
    reviews: 34,
    sizes: [
      "M",
      "XXL",
      "L"
    ],
    colors: [
      "#388e3c",
      "#b71c1c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "33",
    name: "Classic White Shirt - Variant 3",
    price: 4450,
    originalPrice: 5900,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    isOnSale: true,
    rating: 4.8,
    reviews: 56,
    sizes: [
      "L",
      "XXL"
    ],
    colors: [
      "#e0d8d0"
    ],
    gender: "Women",
    isNew: true
  },
  {
    id: "34",
    name: "Black Slim Fit Jeans - Variant 3",
    price: 5950,
    originalPrice: 8080,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jeans",
    isOnSale: true,
    rating: 4.5,
    reviews: 42,
    sizes: [
      "M",
      "S",
      "L",
      "XS"
    ],
    colors: [
      "#000000",
      "#388e3c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "35",
    name: "Printed Summer Dress - Variant 3",
    price: 6450,
    originalPrice: 8500,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    isOnSale: true,
    rating: 4.9,
    reviews: 89,
    sizes: [
      "XXL",
      "XL"
    ],
    colors: [
      "#000000"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "36",
    name: "Basic Crew Neck Tee - Variant 3",
    price: 2250,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "T-Shirts",
    isOnSale: true,
    rating: 4.7,
    reviews: 120,
    sizes: [
      "XS",
      "XL"
    ],
    colors: [
      "#546e7a"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "37",
    name: "Linen Oversized Shirt - Variant 4",
    price: 4950,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    isNew: true,
    sizes: [
      "S",
      "L",
      "XXL"
    ],
    colors: [
      "#e0d8d0",
      "#ffffff",
      "#b71c1c"
    ],
    gender: "Women"
  },
  {
    id: "38",
    name: "Floral Maxi Dress - Variant 4",
    price: 6050,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    rating: 4.8,
    reviews: 12,
    sizes: [
      "XXL",
      "XL"
    ],
    colors: [
      "#546e7a"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "39",
    name: "Casual Cotton T-Shirt - Variant 4",
    price: 2450,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "T-Shirts",
    sizes: [
      "XXL",
      "XL"
    ],
    colors: [
      "#b71c1c",
      "#546e7a"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "40",
    name: "High Waist Jeans - Variant 4",
    price: 5450,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jeans",
    sizes: [
      "XXL",
      "XL",
      "L"
    ],
    colors: [
      "#000000"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "41",
    name: "Oversized Blazer - Variant 4",
    price: 7950,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jackets",
    isNew: true,
    sizes: [
      "M",
      "XL",
      "L"
    ],
    colors: [
      "#000000",
      "#ffffff",
      "#b71c1c"
    ],
    gender: "Women"
  },
  {
    id: "42",
    name: "Striped Long Sleeve - Variant 4",
    price: 3450,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    sizes: [
      "L",
      "M",
      "XL",
      "S"
    ],
    colors: [
      "#546e7a",
      "#ffffff",
      "#388e3c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "43",
    name: "Mini Summer Dress - Variant 4",
    price: 5050,
    originalPrice: 7450,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    isOnSale: true,
    sizes: [
      "XS",
      "XXL"
    ],
    colors: [
      "#388e3c"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "44",
    name: "Denim Jacket - Variant 4",
    price: 6950,
    originalPrice: 9500,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jackets",
    isOnSale: true,
    rating: 4.6,
    reviews: 34,
    sizes: [
      "M",
      "XL",
      "S",
      "XXL"
    ],
    colors: [
      "#546e7a"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "45",
    name: "Classic White Shirt - Variant 4",
    price: 4450,
    originalPrice: 5900,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Shirts",
    isOnSale: true,
    rating: 4.8,
    reviews: 56,
    sizes: [
      "XXL",
      "XS",
      "L",
      "XL"
    ],
    colors: [
      "#546e7a",
      "#000000",
      "#ffffff"
    ],
    gender: "Women",
    isNew: true
  },
  {
    id: "46",
    name: "Black Slim Fit Jeans - Variant 4",
    price: 5950,
    originalPrice: 8080,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Jeans",
    isOnSale: true,
    rating: 4.5,
    reviews: 42,
    sizes: [
      "L",
      "M"
    ],
    colors: [
      "#000000",
      "#ffffff",
      "#e0d8d0"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "47",
    name: "Printed Summer Dress - Variant 4",
    price: 6450,
    originalPrice: 8500,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Dresses",
    isOnSale: true,
    rating: 4.9,
    reviews: 89,
    sizes: [
      "XS",
      "L"
    ],
    colors: [
      "#e0d8d0",
      "#546e7a"
    ],
    gender: "Women",
    isNew: false
  },
  {
    id: "48",
    name: "Basic Crew Neck Tee - Variant 4",
    price: 2250,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "T-Shirts",
    isOnSale: true,
    rating: 4.7,
    reviews: 120,
    sizes: [
      "XXL",
      "XL",
      "L"
    ],
    colors: [
      "#388e3c",
      "#b71c1c"
    ],
    gender: "Men",
    isNew: false
  },
  {
    id: "49",
    name: "Summer Mini Frock - Blue",
    price: 3450,
    image: "/images/products/mini-frock-blue.png",
    category: "Dresses",
    isOnSale: false,
    rating: 4.8,
    reviews: 24,
    sizes: ["XS", "S", "M"],
    colors: ["#546e7a", "#ffffff"],
    gender: "Women",
    isNew: true
  },
  {
    id: "50",
    name: "Smocked Mini Dress - Green",
    price: 3950,
    image: "/images/products/mini-frock-green.jpg",
    category: "Dresses",
    isOnSale: false,
    rating: 4.9,
    reviews: 31,
    sizes: ["S", "M", "L"],
    colors: ["#388e3c", "#e0d8d0"],
    gender: "Women",
    isNew: true
  },
  {
    id: "51",
    name: "Wrap Mini Dress - White",
    price: 4250,
    image: "/images/products/mini-frock-white.jpg",
    category: "Dresses",
    isOnSale: false,
    rating: 4.7,
    reviews: 18,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#ffffff"],
    gender: "Women",
    isNew: true
  },
  {
    id: "52",
    name: "One Shoulder Resort Dress",
    price: 4500,
    image: "/images/products/one-shoulder-dress.jpg",
    category: "Dresses",
    isOnSale: false,
    rating: 5.0,
    reviews: 12,
    sizes: ["S", "M"],
    colors: ["#546e7a", "#ffffff"],
    gender: "Women",
    isNew: true
  },
  {
    id: "53",
    name: "Floral Print Mini Dress",
    price: 3800,
    image: "/images/products/mini-frock-floral.jpg",
    category: "Dresses",
    isOnSale: false,
    rating: 4.8,
    reviews: 45,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#b71c1c", "#000000"],
    gender: "Women",
    isNew: true
  },
  {
    id: "54",
    name: "Classic Black Flare Dress",
    price: 3600,
    image: "/images/products/new-dress-black.png",
    category: "Dresses",
    isOnSale: false,
    rating: 4.9,
    reviews: 67,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#000000"],
    gender: "Women",
    isBestSeller: true,
    isNew: false
  },
  {
    id: "55",
    name: "Monochrome Floral Tunic",
    price: 4100,
    image: "/images/products/new-dress-bw-floral.png",
    category: "Dresses",
    isOnSale: false,
    rating: 4.8,
    reviews: 82,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#ffffff"],
    gender: "Women",
    isBestSeller: true,
    isNew: false
  },
  {
    id: "56",
    name: "Spring Bloom Flowy Dress",
    price: 4800,
    image: "/images/products/new-dress-pink-floral.jpg",
    category: "Dresses",
    isOnSale: false,
    rating: 4.9,
    reviews: 55,
    sizes: ["XS", "S", "M"],
    colors: ["#e0d8d0"],
    gender: "Women",
    isBestSeller: true,
    isNew: false
  },
  {
    id: "57",
    name: "Olive Green Shift Dress",
    price: 3950,
    image: "/images/products/new-dress-olive.png",
    category: "Dresses",
    isOnSale: false,
    rating: 4.7,
    reviews: 40,
    sizes: ["S", "M", "L"],
    colors: ["#546e7a"],
    gender: "Women",
    isBestSeller: true,
    isNew: false
  },
  {
    id: "58",
    name: "Azure Twist Front Dress",
    price: 4400,
    image: "/images/products/new-dress-blue.jpg",
    category: "Dresses",
    isOnSale: false,
    rating: 5.0,
    reviews: 95,
    sizes: ["XS", "S", "M"],
    colors: ["#546e7a"],
    gender: "Women",
    isBestSeller: true,
    isNew: false
  }
];
