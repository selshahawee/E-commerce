import { string } from 'yup'

export interface DummyProduct {
  id: number
  name: string
  href: string
  color: string
  price: number
  availableQty: number
  imageSrc: string
  imageAlt: string
}

export interface CartItem extends Product{
  
  cartQty: number
  color: string
  size: string
  price: number,


 
}

export type DummyCategory = {
  name: string
  featured: DummyProduct[]
}
export type AppStateType = {
  products: DummyProduct[]
  categories: Category[]
  cartItems: CartItem[]
  cartTotalQty: number
  cartTotalAmount: number
}

export type Page = {
  name: string
  href: string
}
export type Navigation = {
  categories: Category[]
  pages: Page[]
}

export interface GoogleSheetProduct {
  id: string | number
  name: string
  slug: string
  categoriesId: string
  price: number
  description: string
  details: string
}
export type Category = {
  id: string | number
  name: string
  featured : Product[]
}
export type Variant = {
  id: string
  color: string
  size: string
  trending: string
  featured: string
  productId: string
  availableQty: string
  price:number
}
export type Image = {
  id: string
  productId: string
  imageSrc: string
  imageAlt: string
}

export type GoogleSheetsDataRes = {
  Products: GoogleSheetProduct[]
  Categories: Category[]
  Images: Image[]
  Variants: Variant[]
}

export interface Product extends GoogleSheetProduct {
  images: Image[]
  variants: Variant[]
  category: Category[]
}

export type ProductsApiRes = {
  products: Product[]
}

export type ProductApiRes = Product

export type OrderSubmit = {
  id : number | string ,
  firstName: string,
      email: string,
      lastName: string,
      company: string,
      address: string,
      apartment: string,
      city: string,
      postalCode: string,
      region: string,
      phone: number,
      country: string,
      nameOnCard: string,
      expiryDate: number,
      cvc: number,
      paymentType: string,
      cardNumber: number,
      
      items: CartItem[],
}