import React, {useState, useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative,Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/effect-creative"; 
import "swiper/css/pagination";
import "./MainSlider.scss";
import { Pagination } from "swiper";
import Api from '../Api/Api';


export default function MainSlider() {
  const [data, setData] = useState([]);
  useEffect(() => {
    Api.get('api/v1/home-slider/')
      .then(response => setData(response.data));
  }, []);
  


    const options = {
    effect: "creative",
    loop: true,
    // loopedSlides: 4,
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
    // navigation: {
    //   prevEl: ".swiper-button-prev",
    //   nextEl: ".swiper-button-next",
    // },
    pagination:{  
      pagination: '.swiper-pagination'     
    },

};

      
  return (
    <> 
      {data.map((item) => (
        <Swiper {...options}  key={item.id}  
          modules={[EffectCreative, Pagination,Navigation]}>
            {item.slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <img src={`https://merlinsbeard.ru/${slide.image}`} alt={slide.title} />
              </SwiperSlide>
            ))}
        </Swiper>
      ))}
    </>
  );
}
