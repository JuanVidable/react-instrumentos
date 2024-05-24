import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeItemFromCart, clearCart } from '../redux/carritoSlice';
import { realizarCompra, realizarDetallesCompra } from '../redux/compraSlice';
import Pedido from '../entities/Pedido';
import PedidoDetalle from '../entities/PedidoDetalle';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRealizarCompra = async () => {
    try {
      const pedido: Pedido = {
          fecha_pedido: new Date().toLocaleDateString(), // Convertir la fecha a formato ISO string
          total_pedido: cart.totalAmount,
          
      };
      const detallesPedido: PedidoDetalle[] = cart.items.map(item => ({
        cantidad: item.quantity,
        instrumento: item.instrumento,
        pedido: pedido
      }));

      const pedidoId = await dispatch(realizarCompra(pedido));
      const detallesConPedidoId = detallesPedido.map(detalle => ({ ...detalle, pedido: { ...pedido, id: pedidoId } }));
      await dispatch(realizarDetallesCompra(detallesConPedidoId));
      dispatch(clearCart());
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.items.length === 0 && <p>No hay productos en el carrito.</p>}
      <ul>
        {cart.items.map(item => (
          <li key={item.instrumento.id}>
            {item.instrumento.instrumento} - {item.quantity} x {item.instrumento.precio}
            <button onClick={() => dispatch(removeItemFromCart(item.instrumento.id))}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Total: ${cart.totalAmount.toFixed(2)}</p>
      {cart.items.length > 0 && <button onClick={handleRealizarCompra}>Realizar Compra</button>}
    </div>
  );
};

export default Cart;
