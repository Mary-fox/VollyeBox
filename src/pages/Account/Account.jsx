import React, { createContext, useEffect, useState } from 'react';

// Files
import './Account-grid.scss';
import './Account.scss';
import UserAvatar from './avatar.png';
import { api, apiHostName, formatDate, toggleBodyScrollHandler } from '../../constants/constants';

// Components
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';

// Context
export const EditProfilePopupContext = createContext({}); // Edit profile popup state context

const Account = () => {
  const mobScreen = window.matchMedia('(max-width: 743px)'); // Mobile media query
  const [isMobScreen, setIsMobScreen] = useState(mobScreen.matches); // State for mobile screen

  const [userAccountData, setUserAccountData] = useState({}); // User account data
  const [selectedTab, setSelectedTab] = useState('about'); // Selected tab in user info

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // Edit popup state
  const [isEditProfileForm, setIsEditProfileForm] = useState(true); // Edit form state in popup

  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Get token from local storage
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // Send request for user account data
    api
      .get('profile/', config)
      .then(({ data }) => setUserAccountData(data))
      .catch((error) => console.log(error, 'error'));

    // Check screen width for mobile
    const handleScreenChange = (event) => setIsMobScreen(event.matches);
    mobScreen.addEventListener('change', handleScreenChange);
    return () => mobScreen.removeEventListener('change', handleScreenChange);
  }, []);

  const isUserAccountData = Object.keys(userAccountData).length !== 0; // Check if user account data
  const {
    about,
    achievements,
    avatar,
    balance,
    birthday,
    email,
    experience,
    first_name,
    height,
    last_name,
    level_id,
    near_klass,
    phone,
    role,
    telegram,
    username,
  } = userAccountData;

  // Format user image path
  const userAvatar = avatar ? `${apiHostName}${avatar}` : UserAvatar;

  // Switch user info tabs
  const activeTabContentClass = selectedTab === 'about' ? 'about' : 'contacts';
  const selectedTabNavHandler = (tab) => (selectedTab === tab ? 'selected' : '');

  return (
    <EditProfilePopupContext.Provider
      value={{
        userAvatar,
        setUserAccountData,
        isEditProfilePopupOpen,
        setIsEditProfilePopupOpen,
        isEditProfileForm,
        setIsEditProfileForm,
      }}
    >
      <div className="container">
        <h1 className="page-title page-title--account">Личный кабинет</h1>

        {isUserAccountData && (
          <>
            <div className="account">
              {/*** Edit profile button for table and desktop ***/}
              {!isMobScreen && (
                <div className="btn-edit-profile-wrapper">
                  <button
                    className="btn btn--edit-profile"
                    onClick={() => {
                      setIsEditProfileForm(true);
                      setIsEditProfilePopupOpen(true);
                      toggleBodyScrollHandler();
                    }}
                  >
                    редактировать профиль
                  </button>
                </div>
              )}

              <section className="account__info">
                <div className="user-preview">
                  <div className="user-preview__image account-block-border">
                    <img src={userAvatar} alt="user-avatar" title="user-avatar" />
                  </div>

                  <div className="user-preview__role account-block-border account-block-border--mob">
                    <h3>Ампула</h3>

                    {role.map(({ id, name }, index) => {
                      const isComma = role.length - 1 !== index ? ', ' : '';

                      return (
                        <span key={id}>
                          {name}
                          {isComma}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/*** Edit profile button for mobile ***/}
                {isMobScreen && (
                  <button
                    className="btn btn--edit-profile"
                    onClick={() => {
                      setIsEditProfileForm(true);
                      setIsEditProfilePopupOpen(true);
                      toggleBodyScrollHandler();
                    }}
                  >
                    редактировать профиль
                  </button>
                )}

                <div className="user-info">
                  <div className={`user-info__tabs-nav ${activeTabContentClass}-nav`}>
                    <span
                      className={`tabs-title tabs-title--about ${selectedTabNavHandler('about')}`}
                      onClick={() => setSelectedTab('about')}
                    >
                      о себе
                    </span>
                    <span
                      className={`tabs-title tabs-title--contacts ${selectedTabNavHandler('contacts')}`}
                      onClick={() => setSelectedTab('contacts')}
                    >
                      контакты
                    </span>
                  </div>

                  <div className={`user-info__tabs-content ${activeTabContentClass} account-block-border`}>
                    <div className="user-info__content">
                      {selectedTab === 'about' ? (
                        <>
                          <div className="user-info__content-item user-info__item--email">
                            <span className="account-description-title">Логин</span>
                            <span className="account-description-text">{username}</span>
                          </div>

                          <div className="user-info__content-item user-info__content-item--birthday">
                            <span className="account-description-title">Дата рождения</span>
                            <span className="account-description-text">{formatDate(birthday)}</span>
                          </div>

                          <div className="user-info__content-item user-info__content-item--height">
                            <span className="account-description-title">Рост</span>
                            <span className="account-description-text">{height} см</span>
                          </div>

                          <div className="user-info__content-item user-info__content-item--password">
                            <span className="account-description-title">Пароль</span>
                            <span className="account-description-text">***************</span>
                          </div>

                          <div className="user-info__content-item user-info__item--description">
                            <div className="shape-float" />
                            <div className="text-float">
                              <span className="account-description-title">Опыт</span>
                              <p className="account-description-text">{about}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="user-info__content-item user-info__content-item--password">
                            <span className="account-description-title">Имя и фамилия</span>
                            <span className="account-description-text">{`${last_name} ${first_name}`}</span>
                          </div>

                          <div className="user-info__content-item user-info__content-item--password">
                            <span className="account-description-title">Телефон</span>
                            <span className="account-description-text">{phone}</span>
                          </div>

                          <div className="user-info__content-item user-info__content-item--password">
                            <span className="account-description-title">Почта</span>
                            <span className="account-description-text">{email}</span>
                          </div>

                          <div className="user-info__content-item user-info__content-item--password">
                            <span className="account-description-title">Telegram</span>
                            <span className="account-description-text">{telegram.replace('https://t.me/', '@')}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="account__level">
                <div className="user-level account-block-border">
                  <h3>уровень</h3>

                  <div className="user-level__content">
                    <div className="user-level__content-image">
                      <img src={`${apiHostName}${level_id.image}`} alt={level_id.title} title={level_id.title} />
                    </div>

                    <span className="user-level__content-title">{level_id.title}</span>

                    <div className="user-level__content-text">
                      <span className="account-description-title">Стаж</span>
                      <span className="account-description-text">{experience} лет</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="account__informers">
                <div className="achievements account-block-border">
                  <h3>Достижения</h3>

                  <div className="achievements__images-wrapper">
                    {achievements.map(({ id, is_published, logo, title }) => {
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
                      <p className="account-description-text">
                        {near_klass?.date ? formatDate(near_klass.date) : 'Ближайших тренировок нет'}
                      </p>
                    </div>

                    {/* Временно скрыто */}
                    {/*<div className="trainings__item trainings__item--subscription">*/}
                    {/*  <span className="account-description-title ">Абонемент</span>*/}
                    {/*  <p className="account-description-text">до 12.06.2023</p>*/}
                    {/*</div>*/}

                    <div className="trainings__item trainings__item--rest">
                      <span className="account-description-title">Остаток тренировок</span>
                      {balance.map(({ id, product, balance }) => {
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

            <EditProfilePopup userAccountData={userAccountData} />
          </>
        )}
      </div>
    </EditProfilePopupContext.Provider>
  );
};

export default Account;
