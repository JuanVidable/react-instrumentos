import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../pages/css/about.css'

const CarouselInstrumentos = () => {
  return (
    <Carousel>
    <Carousel.Item>
      <img src="/public/img/tienda.jpg" className="img_carousel" alt="" />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img src="/public/img/tienda2.jpeg" className="img_carousel" alt="" />
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
    <img src="/public/img/tienda3.jpeg" className="img_carousel" alt="" />
      
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
}

export default CarouselInstrumentos;