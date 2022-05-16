import { createSlice } from '@reduxjs/toolkit'
import { AppStateType, CartItem, Category, GoogleSheetProduct } from 'types'
import { toast } from "react-toastify";
const initialState: AppStateType = {
  products: [],
  categories: [],
  cartItems: [],
  cartTotalQty: 0,
  cartTotalAmount: 0,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // setProducts: (state, { payload }: { payload: GoogleSheetProduct[] }) => {
    //   state.products = payload
    // },
    setCategories(state, { payload }: { payload: Category[] }) {
      state.categories = payload
    },
    setCart(state, { payload }: { payload: CartItem[] }) {
      state.cartItems = payload
    },
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQty += 1
       
      } else {
        const tempProduct = { ...action.payload, cartQty: 1 }
    
        state.cartItems.push(tempProduct)

      }
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
      state.cartItems = nextCartItems;
    },
    updateCartQty(state, { payload }: any) {
      const itemToUpdate = state.cartItems.find((item) => item.id === payload.id)
      if (itemToUpdate) {
        itemToUpdate.cartQty = payload.value
      }
    },
    getTotal(state, action) {
    let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem) => {
        const { price, cartQty } = cartItem;
        const itemTotal = +price * cartQty
        cartTotal.total += itemTotal
        cartTotal.quantity += cartQty
        return cartTotal
        
      }, {
        total: 0,
        quantity:0 
    })
      state.cartTotalQty = quantity;
      state.cartTotalAmount = total;

    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },


  },
  
  
})

export const { setCategories, addToCart , setCart ,removeFromCart, updateCartQty, getTotal , clearCart} = appSlice.actions

export default appSlice.reducer
