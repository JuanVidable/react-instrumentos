import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeItemFromCart, clearCart } from '../redux/carritoSlice';
import { realizarCompra } from '../redux/compraSlice';
import Pedido from '../entities/Pedido';
import PedidoDetalle from '../entities/PedidoDetalle';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, Menu, MenuItem, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={cart.items.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>
          <Typography variant="h6">Carrito de Compras</Typography>
        </MenuItem>
        <Divider />
        {cart.items.length === 0 ? (
          <MenuItem>No hay productos en el carrito.</MenuItem>
        ) : (
          <List>
            {cart.items.map(item => (
              <ListItem key={item.instrumento.id}>
                <ListItemText
                  primary={`${item.instrumento.instrumento} - ${item.quantity} x $${item.instrumento.precio}`}
                />
                <Button onClick={() => dispatch(removeItemFromCart(item.instrumento.id))}>Eliminar</Button>
              </ListItem>
            ))}
            <Divider />
            <ListItem>
              <Typography variant="body1">Total: ${cart.totalAmount.toFixed(2)}</Typography>
            </ListItem>
            <ListItem>
              <Button variant="contained" color="primary" onClick={handleRealizarCompra}>Generar Pedido</Button>
            </ListItem>
          </List>
        )}
      </Menu>
    </div>
  );
};

export default Cart;
