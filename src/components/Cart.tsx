import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeItemFromCart, clearCart } from '../redux/carritoSlice';
import { realizarCompra } from '../redux/compraSlice';
import Pedido from '../entities/Pedido';
import PedidoDetalle from '../entities/PedidoDetalle';
import { useNavigate } from 'react-router-dom';

import { Button, Modal, Badge, ListGroup } from 'react-bootstrap';
import { Cart as CartIcon } from 'react-bootstrap-icons';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleRealizarCompra = async () => {
    try {
      const pedido: Pedido = {
        fecha_pedido: new Date().toISOString(),
        total_pedido: cart.totalAmount,
        id: 0
      };
      
      const detallesPedido: PedidoDetalle[] = cart.items.map(item => ({
        cantidad: item.quantity,
        instrumento: item.instrumento,
        pedido: pedido,
        id: 0
      }));

      const resultAction = await dispatch(realizarCompra({ pedido, detallesPedido }));
      if (realizarCompra.fulfilled.match(resultAction)) {
        const pedidoCreado = resultAction.payload;
        navigate("/pagar", { state: { pedidoCreado } });
      }
      //dispatch(clearCart());
      handleClose();
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="link" onClick={handleShow} style={{ position: 'relative', color: 'inherit' }}>
        <Badge bg="secondary" pill style={{ position: 'absolute', right:70 }}>
          {cart.items.length}
        </Badge>
        <CartIcon size={24} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.items.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <ListGroup>
              {cart.items.map(item => (
                <ListGroup.Item key={item.instrumento.id} className="d-flex justify-content-between align-items-center">
                  <span>{`${item.instrumento.instrumento} - ${item.quantity} x $${item.instrumento.precio}`}</span>
                  <Button variant="danger" size="sm" onClick={() => dispatch(removeItemFromCart(item.instrumento.id))}>
                    Eliminar
                  </Button>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <strong>Total: ${cart.totalAmount.toFixed(2)}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary" onClick={handleRealizarCompra} className="w-100">
                  Generar Pedido
                </Button>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Cart;
