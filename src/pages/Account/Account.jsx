import React, { useEffect } from 'react';

// Files
import './Account-grid.scss';
import './Account.scss';
import UserAvatar from './avatar.png';
import UserAchievement from './achievement.svg';
import { api } from '../../constants/constants';

const Account = () => {
  useEffect(() => {
    // api.get(`profile/`).then((response) => {
    //   console.log(response, 'resp');
    // });

    const token = localStorage.getItem('access_token');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    api
      .get(`profile/`, config)
      .then(({ data }) => {
        console.log(data, 'data');
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Личный кабинет</h1>

      <div className="account">
        <section className="account__info">
          <div className="user-preview">
            <div className="user-preview__image account-block-border">
              <img src={UserAvatar} alt="user-avatar" title="user-avatar" />
            </div>

            <div className="user-preview__role account-block-border account-block-border--mob">
              <h3>Ампула</h3>
              <span>доигровщик</span>
            </div>
          </div>

          <div className="user-info">
            <div className="user-info__about account-block-border">
              <span>о себе</span>

              <div>
                <span className="account-description-title">Логин</span>
                <span className="account-description-text">crazygrig@gmail.com</span>
              </div>

              <div>
                <span className="account-description-title">Дата рождения</span>
                <span className="account-description-text">19.12.1997</span>
              </div>

              <div>
                <span className="account-description-title">Рост</span>
                <span className="account-description-text">181 см</span>
              </div>

              <div>
                <span className="account-description-title">Пароль</span>
                <span className="account-description-text">***************</span>
              </div>

              <div>
                <span className="account-description-title">Опыт</span>
                <p className="account-description-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi, aspernatur cupiditate esse est,
                  eveniet facilis, illo impedit ipsum laborum maxime perferendis qui quo saepe sunt vitae voluptatibus.
                  Doloribus, voluptate.
                </p>
              </div>
            </div>
            {/*<div className="user-info__contacts">Контактные данные</div>*/}
          </div>
        </section>

        <section className="account__level">
          <div className="user-level account-block-border">
            <h3>уровень</h3>

            <div className="user-level__content">
              <div className="user-level__content-image">
                <img
                  src="https://merlinsbeard.ru/media/filer_public/12/dc/12dc93b8-f950-49ee-8026-4dc10a66b7f7/property_1default_1.png"
                  alt="Легкий"
                  title="Легкий"
                />
              </div>

              <span className="user-level__content-title">слабый</span>

              <div className="user-level__content-text">
                <span className="account-description-title">Стаж</span>
                <span className="account-description-text">5 лет</span>
              </div>
            </div>
          </div>
        </section>

        <section className="account__informers">
          <div className="achievements account-block-border">
            <h3>Достижения</h3>

            <div className="achievements__images-wrapper">
              <div className="achievements__image">
                <img src={UserAchievement} alt="" />
              </div>

              <div className="achievements__image">
                <img src={UserAchievement} alt="" />
              </div>

              <div className="achievements__image">
                <img src={UserAchievement} alt="" />
              </div>

              <div className="achievements__image">
                <img src={UserAchievement} alt="" />
              </div>

              <div className="achievements__image">
                <img src={UserAchievement} alt="" />
              </div>

              <div className="achievements__image">
                <img src={UserAchievement} alt="" />
              </div>

              <div className="achievements__image">
                <img src={UserAchievement} alt="" />
              </div>

              <div className="achievements__image">
                <img src={UserAchievement} alt="" />
              </div>

              <div className="achievements__image">
                <img src={UserAchievement} alt="" />
              </div>

              <div className="achievements__image">
                <img src={UserAchievement} alt="" />
              </div>
            </div>

            <span className="achievements__bottom-decor" />
          </div>

          <div className="trainings account-block-border">
            <div className="trainings__item-wrapper">
              <h3>Тренировки</h3>

              <div className="trainings__item trainings__item--nearest">
                <span className="account-description-title">Ближайшая</span>
                <p className="account-description-text">02.04.2023</p>
              </div>

              <div className="trainings__item trainings__item--subscription">
                <span className="account-description-title ">Абонемент</span>
                <p className="account-description-text">до 12.06.2023</p>
              </div>

              <div className="trainings__item trainings__item--rest">
                <span className="account-description-title">Остаток тренировок</span>
                <p className="account-description-text">8</p>
              </div>
            </div>

            <span className="trainings__bottom-decor" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Account;
