// src/store/cartSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Instrumento from '../entities/Instrumento'; // Asegúrate de que la ruta sea correcta
import Pedido from '../entities/Pedido';
import FuncionesApi from '../services/FuncionesApi';
import { RootState } from './store';
import PedidoDetalle from '../entities/PedidoDetalle';

interface CartItem {
  instrumento: Instrumento;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<Instrumento>) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.instrumento.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ instrumento: newItem, quantity: 1 });
      }

      state.totalAmount += parseFloat(newItem.precio);
      console.log(newItem.instrumento)
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.instrumento.id === id);

      if (existingItem) {
        state.items = state.items.filter(item => item.instrumento.id !== id);
        state.totalAmount -= parseFloat(existingItem.instrumento.precio) * existingItem.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    }
  }
});


export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
