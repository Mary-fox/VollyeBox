import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./MainSlider.scss";
// import required modules
import { Pagination } from "swiper";
import slide1 from '../../assets/images/slide3.png';
import slide2 from '../../assets/images/slide2.png';
import slide3 from '../../assets/images/slide3.png';
import slide4 from '../../assets/images/slide4.png';

export default function MainSlider() {
    const options = {
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 3,
      };
      
  return (
    <>
        <Swiper {...options}    
        pagination={{
          clickable: true,
            }}
        modules={[Pagination]}>
            <SwiperSlide><img src={slide4} alt="slide4" /></SwiperSlide>       
            <SwiperSlide><img src={slide2} alt="slide4" /></SwiperSlide>
            <SwiperSlide><img src={slide4} alt="slide4" /></SwiperSlide>
            <SwiperSlide><img src={slide3} alt="slide3" /></SwiperSlide>
            <SwiperSlide><img src={slide2} alt="slide2" /></SwiperSlide>
            <SwiperSlide><img src={slide1} alt="slide1" /></SwiperSlide>
      </Swiper>
    </>
  );
}
