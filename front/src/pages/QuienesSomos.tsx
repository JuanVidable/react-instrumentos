import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import CarouselInstrumentos from '../components/CarouselInstrumentos';
import { Container } from 'react-bootstrap';
import Home from './Home';
import './css/about.css'


const QuienesSomos = () => {
  return (
    <div>
      <h1 className='text_title'>Musical Hendrix</h1>
      <CarouselInstrumentos></CarouselInstrumentos>
      <Container><p className='text_descripcion'>Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
      experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
      mejores elecciones para tu compra musical.</p></Container>
      
      <Container>
        <div className="where_container">
          <h3>Dónde estamos</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4480686362303!2d-68.83827769999999!3d-32.8863197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1713195289713!5m2!1ses!2sar" width="600" height="450"  loading="lazy"></iframe>
        </div>
      </Container>
      <Container>
        <div className="products_container">
          <h3 className='nuestros_productos'>Nuestros productos</h3>
          <Home></Home>
        </div>
      </Container>
      
    </div>
  )
}

export default QuienesSomos