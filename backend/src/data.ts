import { Product } from "./models/ProductModel";
import { User } from "./models/UserModels";
import bcrypt from 'bcryptjs'

export const sampleProducts: Product[] = [
  {
    name: "Nike Slim shirt",
    slug: "nike-slim-shirt",
    category: "Shirts",
    image: "../images/p1.jpg",
    price: 120,
    countInStock: 20,
    brand: "Nike",
    rating: 4.5,
    numReviews: 10,
    description: "High quality shirt.",
  },
  {
    name: "Adidas Fit shirt",
    slug: "adidas-fit-shirt",
    category: "Shirts",
    image: "../images/p2.jpg",
    price: 100,
    countInStock: 10,
    brand: "Adidas",
    rating: 4.0,
    numReviews: 10,
    description: "High quality product.",
  },
  {
    name: "Locoste Free pants",
    slug: "locoste-free-pants",
    category: "Pants",
    image: "../images/p3.jpg",
    price: 220,
    countInStock: 1,
    brand: "Locoste",
    rating: 4.8,
    numReviews: 17,
    description: "High quality product.",
  },
  {
    name: "Nike Slim pants",
    slug: "nike-slim-pants",
    category: "Pants",
    image: "../images/p4.jpg",
    price: 78,
    countInStock: 15,
    brand: "Nike",
    rating: 4.5,
    numReviews: 14,
    description: "High quality product.",
  },
];

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('Abcd@1234'),
    isAdmin: true
  },
  {
    name: 'john',
    email: 'user@gmail.com',
    password: bcrypt.hashSync('Abcd@1234'),
    isAdmin: false
  },
]