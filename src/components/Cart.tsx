// src/components/Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeItemFromCart, clearCart } from '../redux/carritoSlice'; // Asegúrate de que la ruta sea correcta
import { realizarCompra } from '../redux/compraSlice'; // Importar la función realizarCompra
import Pedido from '../entities/Pedido';
import PedidoDetalle from '../entities/PedidoDetalle';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRealizarCompra = async () => {
    try {
      const pedido: Pedido = {
        fecha_pedido: new Date().toISOString(), // Convertir a string
        total_pedido: cart.totalAmount,
        id: 0 // Asegúrate de que este ID se inicialice adecuadamente
      };
      
      const detallesPedido: PedidoDetalle[] = cart.items.map(item => ({
        cantidad: item.quantity,
        instrumento: item.instrumento,
        pedido: pedido,
        id: 0 // Asegúrate de que este ID se inicialice adecuadamente
      }));

      await dispatch(realizarCompra({ pedido, detallesPedido }));
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
