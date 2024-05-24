import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuncionesApi from '../services/FuncionesApi';
import Pedido from '../entities/Pedido';
import PedidoDetalle from '../entities/PedidoDetalle';

export const realizarCompra = createAsyncThunk(
    'compra/realizarCompra',
    async ({ pedido, detallesPedido }: { pedido: Pedido, detallesPedido: PedidoDetalle[] }) => {
      console.log("PEDIDO:", pedido);
      const pedidoCreado = await FuncionesApi.createPedido(pedido);
      const detallesConPedidoId = detallesPedido.map(detalle => ({
        ...detalle,
        pedido: { ...detalle.pedido, id: pedidoCreado.id }
      }));
      const promises = detallesConPedidoId.map(detalle => {
        console.log("Detalle:", detalle);
        return FuncionesApi.createPedidoDetalle(detalle);
      });
  
      await Promise.all(promises);
    }
  );
  
//   export const realizarDetallesCompra = createAsyncThunk(
//     'compra/realizarDetallesCompra',
//     async (detallesPedido: PedidoDetalle[]) => {
//         // Enviar detalles del pedido en lotes
//         const promises = detallesPedido.map(detalle => {
//           console.log("Detalle:", detalle);
//           return FuncionesApi.createPedidoDetalle(detalle);
//         });
//         await Promise.all(promises);
//       }
//   );
  

const compraSlice = createSlice({
  name: 'compra',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(realizarCompra.fulfilled, (state, action) => {
        // Manejar el caso exitoso de realizarCompra
      })
      
  },
});

export default compraSlice.reducer;
