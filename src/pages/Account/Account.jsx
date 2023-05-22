import React, { useEffect, useState } from 'react';

// Files
import './Account-grid.scss';
import './Account.scss';
import UserAvatar from './avatar.png';
import { api, apiHostName } from '../../constants/constants';

const Account = () => {
  const [userAccountData, setUserAccountData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Get token from local storage
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // Send request for user account data
    api
      .get(`profile/`, config)
      .then(({ data }) => setUserAccountData(data))
      .catch((error) => console.log(error, 'error'));
  }, []);

  const isUserAccountData = Object.keys(userAccountData).length !== 0;

  // Format review date
  const reviewDate = new Date(userAccountData?.near_klass?.date);
  const day = reviewDate.getDate() < 10 ? `0${reviewDate.getDate()}` : reviewDate.getDate();
  const month = reviewDate.getMonth() < 10 ? `0${reviewDate.getMonth()}` : reviewDate.getMonth();
  const year = reviewDate.getFullYear();
  const formattedReviewDate = `${day}.${month}.${year}`;

  // Format user image path
  const userAvatar = userAccountData.avatar ? `${apiHostName}${userAccountData.avatar}` : UserAvatar;

  return (
    <div className="container">
      <h1 className="page-title">Личный кабинет</h1>

      <div className="account">
        <section className="account__info">
          <div className="user-preview">
            <div className="user-preview__image account-block-border">
              <img src={isUserAccountData ? userAvatar : ''} alt="user-avatar" title="user-avatar" />
            </div>

            <div className="user-preview__role account-block-border account-block-border--mob">
              <h3>Ампула</h3>

              {isUserAccountData &&
                userAccountData.role.map(({ id, name }, index) => {
                  return (
                    <span key={id}>
                      {name}
                      {userAccountData.role.length - 1 !== index && ', '}
                    </span>
                  );
                })}
            </div>
          </div>

          <div className="user-info">
            <div className="user-info__about account-block-border">
              <span className="user-info__title">о себе</span>

              <div className="user-info__content">
                <div className="user-info__content-item user-info__item--email">
                  <span className="account-description-title">Логин</span>
                  <span className="account-description-text">{isUserAccountData && userAccountData.username}</span>
                </div>

                <div className="user-info__content-item user-info__content-item--birthday">
                  <span className="account-description-title">Дата рождения</span>
                  <span className="account-description-text">{isUserAccountData && userAccountData.birthday}</span>
                </div>

                <div className="user-info__content-item user-info__content-item--height">
                  <span className="account-description-title">Рост</span>
                  <span className="account-description-text">{isUserAccountData && userAccountData.height} см</span>
                </div>

                <div className="user-info__content-item user-info__content-item--password">
                  <span className="account-description-title">Пароль</span>
                  <span className="account-description-text">***************</span>
                </div>

                <div className="user-info__content-item user-info__item--description">
                  <div className="shape-float" />
                  <div className="text-float">
                    <span className="account-description-title">Опыт</span>
                    <p className="account-description-text">{isUserAccountData && userAccountData.about}</p>
                  </div>
                </div>
              </div>
            </div>

            {/*<div className="user-info__contacts">Контактные данные</div>*/}
          </div>
        </section>

        <section className="account__level">
          <div className="user-level account-block-border">
            <h3>уровень</h3>

            <div className="user-level__content">
              {isUserAccountData && (
                <>
                  <div className="user-level__content-image">
                    <img
                      src={`${apiHostName}${userAccountData.level_id.image}`}
                      alt={userAccountData.level_id.title}
                      title={userAccountData.level_id.title}
                    />
                  </div>

                  <span className="user-level__content-title">{userAccountData.level_id.title}</span>

                  <div className="user-level__content-text">
                    <span className="account-description-title">Стаж</span>
                    <span className="account-description-text">{userAccountData.experience} лет</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="account__informers">
          <div className="achievements account-block-border">
            <h3>Достижения</h3>

            <div className="achievements__images-wrapper">
              {isUserAccountData &&
                userAccountData.achievements.map(({ id, is_published, logo, title }) => {
                  if (is_published) {
                    return (
                      <div className="achievements__image" key={id}>
                        <img src={`${apiHostName}${logo}`} alt={title} title={title} />
                      </div>
                    );
                  }
                })}
            </div>

            <span className="achievements__bottom-decor" />
          </div>

          <div className="trainings account-block-border">
            <div className="trainings__item-wrapper">
              <h3>Тренировки</h3>

              <div className="trainings__item trainings__item--nearest">
                <span className="account-description-title">Ближайшая</span>
                {isUserAccountData && formattedReviewDate ? (
                  <p className="account-description-text">{formattedReviewDate}</p>
                ) : (
                  <p className="account-description-text">Ближайших тренировок нет</p>
                )}
              </div>

              {/* Временно скрыто */}
              {/*<div className="trainings__item trainings__item--subscription">*/}
              {/*  <span className="account-description-title ">Абонемент</span>*/}
              {/*  <p className="account-description-text">до 12.06.2023</p>*/}
              {/*</div>*/}

              <div className="trainings__item trainings__item--rest">
                <span className="account-description-title">Остаток тренировок</span>
                {isUserAccountData &&
                  userAccountData.balance.map(({ id, product, balance }) => {
                    return (
                      <p className="account-description-text" key={id}>
                        <span>{product} - </span>
                        <span>{balance}</span>
                      </p>
                    );
                  })}
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
