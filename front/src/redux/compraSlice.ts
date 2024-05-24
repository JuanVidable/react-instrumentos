import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuncionesApi from '../services/FuncionesApi';
import Pedido from '../entities/Pedido';
import PedidoDetalle from '../entities/PedidoDetalle';

export const realizarCompra = createAsyncThunk(
    'compra/realizarCompra',
    async (pedido: Pedido) => {
      console.log("PEDIDO:", pedido);
      const pedidoId = await FuncionesApi.createPedido(pedido);
      const pedidoConId = { ...pedido, id: pedidoId };
      await realizarDetallesCompra(pedidoConId.detallesPedido);
    }
  );
  
  export const realizarDetallesCompra = createAsyncThunk(
    'compra/realizarDetallesCompra',
    async (detallesPedido: PedidoDetalle[]) => {
        // Enviar detalles del pedido en lotes
        const promises = detallesPedido.map(detalle => {
          console.log("Detalle:", detalle);
          return FuncionesApi.createPedidoDetalle(detalle);
        });
        await Promise.all(promises);
      }
  );
  

const compraSlice = createSlice({
  name: 'compra',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(realizarCompra.fulfilled, (state, action) => {
        // Manejar el caso exitoso de realizarCompra
      })
      .addCase(realizarDetallesCompra.fulfilled, (state, action) => {
        // Manejar el caso exitoso de realizarDetallesCompra
      });
  },
});

export default compraSlice.reducer;
