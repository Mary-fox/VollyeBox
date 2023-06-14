import React, { useContext } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Files
import './TabNavigationSlider.scss';
import 'swiper/css/navigation';
import { tabNavigationSliderOptions } from './tabNavigationSliderOptions';
import { SetSwitchTabNavigationContext } from '../../pages/GymPage/GymPage';

const TabNavigationSlider = ({ data, options = tabNavigationSliderOptions }) => {
  // Use set state for switch tab navigation
  const { detailsNavigationId, setDetailsNavigationId } = useContext(SetSwitchTabNavigationContext);

  return (
    <Swiper className="tab-navigations" {...options} modules={[Navigation]} navigation>
      {data.map(({ id, title }) => {
        return (
          <SwiperSlide key={id}>
            <p
              className={`tab-navigation ${detailsNavigationId === id ? 'tab-navigation--active' : ''}`}
              onClick={() => setDetailsNavigationId(id)}
            >
              {title}
            </p>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TabNavigationSlider;
