import Categoria from "../entities/Categoria";
import Instrumento from "../entities/Instrumento";
import Pedido from "../entities/Pedido";
import PedidoDetalle from "../entities/PedidoDetalle";

const BASE_URL = "http://localhost:9000/api/";

export const FuncionesApi={
	getAll:async ():Promise<Instrumento[]>=>{
		const response = await fetch(`${BASE_URL}`+'instrumentos')
		const data =await response.json();
		return data;
	},

    getAllCategoria:async ():Promise<Categoria[]>=>{
		const response = await fetch(`${BASE_URL}`+'categorias')
		const data =await response.json();
		return data;
	},

	getById:async (id:number):Promise<Instrumento>=>{
		const response=await fetch(`${BASE_URL}instrumentos/${id}`);
        const data=await response.json();
        return data;
	},

    deleteInstrumento:async (id:number):Promise<void>=>{
		await fetch(`${BASE_URL}instrumentos/${id}`,{
            method:"DELETE",
        })
            
        },

	createInstrumento:async (instrumento:Instrumento):Promise<Instrumento>=>{
        const response=await fetch(`${BASE_URL}instrumentos`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(instrumento)
        });
        const data=await response.json();
        return data;
    },

    createPedido: async(pedido:Pedido):Promise<Pedido> => {
        const response = await fetch(`${BASE_URL}pedidos`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(pedido)
        });
        const data = await response.json();
        return data;
    },

    createPedidoDetalle: async(pedidoDetalle:PedidoDetalle):Promise<PedidoDetalle> => {
        const response = await fetch(`${BASE_URL}detalles`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(pedidoDetalle)
        });
        const data = await response.json();
        return data;
    },


    searchInstrumento:async(palabra:String):Promise<Instrumento[]> =>{
        const response=await fetch(`${BASE_URL}instrumentos/search?palabra=${palabra}`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            

        });
        const data = await response.json();
        return data;
    },
	
	updateInstrumento:async (id:number, instrumento:Instrumento):Promise<Instrumento>=>{
		const response=await fetch(`${BASE_URL}instrumentos/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(instrumento)
        });
        const data=await response.json();
        return data;
	}

   

	
}

export default FuncionesApi;
