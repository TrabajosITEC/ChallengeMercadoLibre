import MainLayout from "../layouts/MainLayout";
import { Carousel } from 'primereact/carousel';
import '../pages/Home.css'
import image1 from '../img/carousel1.jpg';
import image2 from '../img/carousel2.jpg';
import image3 from '../img/carousel3.jpg'

const carouselImages = [
  { id: 1, image: image1, alt: 'Imagen 1' },
  { id: 2, image: image2, alt: 'Imagen 2' },
  { id: 3, image: image3, alt: 'Imagen 3' }
];

const itemTemplate = (item) => {
  return (
    <div className="carousel-item" key={item.id}>
      <img src={item.image} alt={item.alt} className="carousel-image" />
    </div>
  );
};

export default function Home() {
  return (
    <MainLayout>
      <Carousel className="custom-carousel" value={carouselImages} itemTemplate={itemTemplate} numVisible={1} numScroll={1} circular/>
      <h2>ACA COMPONENTES CARDS O ALGO ASI</h2>
    </MainLayout>
  );
}
