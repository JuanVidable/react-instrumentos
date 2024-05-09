import { Link } from 'react-router-dom'
import './css/InstrumentoCard.css'

function InstrumentoCard({id=0,titulo='', precio='', envio='', cantidadVendida='', imagen=''}) {
  
  return (
    
    <>  
        <div className="content_div">
            <div className='imagen_div'><img src={`/public/img/${imagen}`} alt="" /></div>
            <div className='detalles_div'>
                <h3>{titulo}</h3>
                <p style={{fontWeight:"bold", fontSize:"24px"}} className='titulo'>$ {precio}</p>
                {envio === "G" ? <p style={{color: "green"}}>Envío gratis</p> : <p style={{color: "orange"}}>Costo de envío: ${envio}</p>}
                <p>Cantidad vendidas: {cantidadVendida}</p>
                <Link to={`/detalles/${id}`}>Ver detalles</Link>
            </div>
        </div>
    </>
  )
}

export default InstrumentoCard


