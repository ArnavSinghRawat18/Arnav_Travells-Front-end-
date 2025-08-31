import "./HotelImages.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './hotel-swiper.css';

export const HotelImages = ({ singleHotel }) => {
  const { image, imageArr = [] } = singleHotel || {};
  const slides = [image, ...imageArr].filter(Boolean);

  return (
    <div className="hotel-image-swiper">
      <Swiper spaceBetween={10} slidesPerView={1}>
        {slides.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="kenburns-wrap">
              <img className="kenburns" src={src} alt={`slide-${idx}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotelImages;
