import Instrumento from "./Instrumento";
import Pedido from "./Pedido";

export default class PedidoDetalle{
    id:number=0;    
    cantidad:number=1;
    instrumento:Instrumento = new Instrumento();
    pedido:Pedido = new Pedido();
}