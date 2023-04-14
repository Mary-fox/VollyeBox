import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative,Navigation } from 'swiper';
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative"; 
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

      effect: "creative",
    loop: true,
    loopedSlides: 4,
    centeredSlides: true,
    slidesPerView: "auto",
    creativeEffect: {
      indexModifier: false,
        limitProgress: 2,
        prev: {
            translate: ["-50%", 0, 0],
            scale: 0.777,
            transform: 'translateX(-50%)',
            opacity: 1
        },
        next: {
            translate: ["50%", 0, 0],
            scale: 0.777,
            transform: 'translateX(50%) ',
        }
    },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    pagination:{  
      pagination: '.swiper-pagination',       
    },

};

      
  return (
    <>
        <Swiper {...options}    
        modules={[EffectCreative, Pagination,Navigation]}>
            <SwiperSlide><img src={slide1} alt="slide9" /></SwiperSlide>
            <SwiperSlide><img src={slide2} alt="slide4" /></SwiperSlide>
            <SwiperSlide><img src={slide3} alt="slide2" /></SwiperSlide>
            <SwiperSlide><img src={slide4} alt="slide5" /></SwiperSlide> 
            <SwiperSlide><img src={slide1} alt="slide9" /></SwiperSlide>
            <SwiperSlide><img src={slide2} alt="slide4" /></SwiperSlide>
            <SwiperSlide><img src={slide3} alt="slide2" /></SwiperSlide>
            <SwiperSlide><img src={slide4} alt="slide5" /></SwiperSlide> 
            <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </>
  );
}
