import React, { useEffect, useState } from 'react';

// Files
import './ScheduleClass.scss';
import { api, apiHostName, hexToRGB } from '../../../constants/constants';
import { config } from '../../Account/EditProfilePopup';
import popupClose from '../../../assets/icon/close-popup.svg';

const ScheduleClass = ({ classData }) => {
  const { id, date, level, limit, players, trainer, type } = classData;
  const classId = id; // Id занятия для запроса при выборе абонемента

  // State
  const [joined, setJoined] = useState(false);
  const [isJoinClassPopupOpen, setIsJoinClassPopupOpen] = useState(false); // Join class popup state
  const [classAbonement, setClassAbonement] = useState([]); // Список абонементов в занятии

  const classTime = date.split(/[T+]/)[1].slice(0, -3); // Найти подстроку со временем в date (часы и минуты)
  const filledProgress = []; // массив закрашенных кубиков для заполненности занятия
  const filledItem = Math.round((players.length / limit) * 6); // Количество закрашенных кубиков с округлением
  let i = 1;

  // заполнить массив закрашенных кубиков
  while (i <= 6) {
    i <= filledItem ? filledProgress.push('filled') : filledProgress.push('');
    i++;
  }

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).id;

    if (players.includes(userId)) {
      setJoined(true);
    }
  }, []);

  /*** Handlers ***/
  const handleJoinClass = (classId) => {
    // Get token from local storage
    const token = localStorage.getItem('access_token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    api.post(`make_as_training/${classId}/`, {}, config).then(({ data }) => {
      if (data.length === 1) {
        api.post(`make_as_training/${classId}/${data[0].id}/`, {}, config).then(() => setJoined(true));
      } else {
        setClassAbonement(data);
        setIsJoinClassPopupOpen(true);
      }
    });
  };

  const handleLeaveClass = (classId) => {
    // Get token from local storage
    const token = localStorage.getItem('access_token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    api.post(`remove_as_training/${classId}/`, {}, config).then(() => setJoined(false));
  };

  return (
    <div
      className={`class ${joined ? 'joined' : ''}`}
      style={{ borderColor: level.color, boxShadow: `inset 3px -3px 23px ${hexToRGB(level.color, 0.7)}` }}
    >
      <div className="class__item class__time">{classTime}</div>
      <div className="class__item class__training-type">{type}</div>

      <div className="class__item class__image">
        <img src={`${apiHostName}${trainer.avatar}`} alt="trainer_avatar" title="trainer_avatar" />
      </div>

      <div className="class__item class__trainer-name">{`${trainer.first_name} ${trainer.last_name}`}</div>

      <div className="class__item class__filled">
        {filledProgress.map((item, index) => {
          const filledItemBg = item !== '' ? level.color : '';

          return (
            <span
              className="class__filled-item"
              style={{ borderColor: level.color, backgroundColor: filledItemBg }}
              key={index}
            />
          );
        })}
      </div>

      {joined ? (
        <button className="class__item class__join" onClick={() => handleLeaveClass(classId)}>
          отменить запись
        </button>
      ) : (
        <button
          className="class__item class__join"
          style={{ backgroundColor: level.color }}
          onClick={() => handleJoinClass(classId)}
        >
          записаться
        </button>
      )}

      <div className={`popup-wrapper select-abonement-popup-wrapper ${isJoinClassPopupOpen ? 'open' : ''}`}>
        <div className="popup select-abonement-popup">
          <h3 className="popup__title">Выберете абонемент</h3>
          <div className="popup__content">
            <div className="abonement-list">
              {isJoinClassPopupOpen &&
                classAbonement.map(({ id, product }) => {
                  return (
                    <button
                      key={id}
                      className="abonement-list__item btn btn--bg"
                      onClick={() => {
                        api.post(`make_as_training/${classId}/${id}/`, {}, config).then(() => setJoined(true));
                        setIsJoinClassPopupOpen(false);
                      }}
                    >
                      {product}
                    </button>
                  );
                })}
            </div>
          </div>

          <button className="popup__close" onClick={() => setIsJoinClassPopupOpen(false)}>
            <img src={popupClose} alt="popup-close" title="popup-close" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleClass;
