import React, { useEffect } from 'react';

// Files
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

            <div className="user-preview__role account-block-border account-block-border--mob">Ампула доигровщик</div>
          </div>

          <div className="user-info">
            <div className="user-info__about account-block-border">о себе</div>
            {/*<div className="user-info__contacts">Контактные данные</div>*/}
          </div>
        </section>

        <section className="account__level">
          <div className="account-block-border">Игровая статистика, уровень</div>
        </section>

        <section className="account__informers">
          <div className="achievements account-block-border">
            <img src={UserAchievement} alt="" />
          </div>

          <div className="trainings account-block-border">история тренировок</div>
        </section>
      </div>
    </div>
  );
};

export default Account;
