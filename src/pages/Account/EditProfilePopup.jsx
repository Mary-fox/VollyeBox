import React, { useContext } from 'react';
import { Field, Form, Formik } from 'formik';

// Files
import './EditProfilePopup.scss';
import popupClose from '../../assets/icon/close-popup.svg';

// Context
import { EditProfilePopupContext } from './Account';
import { toggleBodyScrollHandler } from '../../constants/constants';

const EditProfilePopup = ({ userAccountData }) => {
  // console.log(userAccountData, 'userAccountData');

  const userEditProfileData = {
    // avatar: userAccountData.avatar,
    username: userAccountData.username,
    first_name: userAccountData.first_name,
    last_name: userAccountData.last_name,
    birthday: userAccountData.birthday,
    height: userAccountData.height,
    experience: userAccountData.experience,
    telegram: userAccountData.telegram,
    phone: userAccountData.phone,
    role: userAccountData.role,
    about: userAccountData.about,
  };

  // console.log(userEditProfileData, 'userEditProfileData');

  // Use user edit profile state context
  const { userAvatar, isEditProfilePopupOpen, setIsEditProfilePopupOpen, isEditProfileForm, setIsEditProfileForm } =
    useContext(EditProfilePopupContext);

  // console.log(userAvatar, 'userAvatar');

  // Close popup
  const closePopupHandler = () => {
    setIsEditProfilePopupOpen(false);

    toggleBodyScrollHandler();

    setTimeout(() => setIsEditProfileForm(false), 250);
  };

  return (
    <div className={`popup-wrapper edit-profile-popup-wrapper ${isEditProfilePopupOpen ? 'open' : ''}`}>
      <div className="popup edit-profile-popup">
        <h3 className="popup__title">Личные данные</h3>
        <div className="popup__content">
          {isEditProfileForm && (
            <Formik
              initialValues={userEditProfileData}
              onSubmit={(values, actions) => {
                // console.log(userDataInitial, 'userDataInitial');
                // console.log(values, 'values submit');
                // console.log(actions, 'actions submit');
                actions.resetForm();
              }}
            >
              <Form className="form edit-profile-form">
                <div className="form__body">
                  <div className="form__group form__group--avatar">
                    <div className="avatar">
                      <img src={userAvatar} alt="avatar" title="avatar" />
                    </div>

                    <span className="form__label-name">Фото профиля</span>

                    <div className="form-file">
                      <button className="btn btn--bg form-file__btn">
                        <span className="form-file__title">загрузить</span>
                      </button>

                      <Field id="avatar" type="file" name="avatar" className="form-file__input" placeholder="avatar" />
                    </div>
                  </div>

                  <div className="form__group form__group--login">
                    <label className="form__label">
                      <Field
                        id="username"
                        type="text"
                        name="username"
                        className="form__input"
                        placeholder="Введите логин"
                      />
                      <span className="form__label-name">Логин</span>
                    </label>
                  </div>

                  <div className="form__group form__group--name">
                    <label className="form__label">
                      <Field
                        id="first_name"
                        type="text"
                        name="first_name"
                        className="form__input"
                        placeholder="Введите имя"
                      />
                      <span className="form__label-name">Имя</span>
                    </label>
                  </div>

                  <div className="form__group form__group--surname">
                    <label className="form__label">
                      <Field
                        id="last_name"
                        type="text"
                        name="last_name"
                        className="form__input"
                        placeholder="Введите фамилию"
                      />
                      <span className="form__label-name">Фамилию</span>
                    </label>
                  </div>

                  <div className="form__group form__group--birthday">
                    <label className="form__label">
                      <Field
                        id="birthday"
                        type="text"
                        name="birthday"
                        className="form__input"
                        placeholder="Дата рождения цифрами"
                      />
                      <span className="form__label-name">Дата рождения</span>
                    </label>
                  </div>

                  <div className="form__group form__group--height">
                    <label className="form__label">
                      <Field id="height" type="text" name="height" className="form__input" placeholder="Рост" />
                      <span className="form__label-name">Рост</span>
                    </label>
                  </div>

                  <div className="form__group form__group--experience">
                    <label className="form__label">
                      <Field id="experience" type="text" name="experience" className="form__input" placeholder="Опыт" />
                      <span className="form__label-name">Опыт</span>
                    </label>
                  </div>

                  <div className="form__group form__group--telegram">
                    <label className="form__label">
                      <Field
                        id="telegram"
                        type="text"
                        name="telegram"
                        className="form__input"
                        placeholder="https://t.me/User или @User"
                      />
                      <span className="form__label-name">Телеграмм</span>
                    </label>
                  </div>

                  <div className="form__group form__group--phone">
                    <label className="form__label">
                      <Field id="phone" name="phone" className="form__input" placeholder="Телефон" />
                      <span className="form__label-name">Телефон</span>
                    </label>
                  </div>

                  {/*<div className="form__group">*/}
                  {/*  <label className="form__label">*/}
                  {/*    <Field id="role" name="role" component="textarea" placeholder="Роль" />*/}
                  {/*    <span className="form__label-name">Роль</span>*/}
                  {/*  </label>*/}
                  {/*</div>*/}

                  <div className="form__group form__group--about">
                    <label className="form__label">
                      <Field
                        id="about"
                        name="about"
                        component="textarea"
                        className="form__textarea"
                        placeholder="О себе"
                      />
                      <span className="form__label-name">О себе</span>
                    </label>
                  </div>
                </div>

                <div className="form__footer">
                  <button type="submit" className="btn btn--bg form__submit">
                    Сохранить
                  </button>
                </div>
              </Form>
            </Formik>
          )}
        </div>

        <button className="popup__close" onClick={closePopupHandler}>
          <img src={popupClose} alt="popup-close" title="popup-close" />
        </button>
      </div>
    </div>
  );
};

export default EditProfilePopup;
