import React from 'react';

// Files
import './ScheduleClass.scss';
import { apiHostName } from '../../../constants/constants';

const ScheduleClass = ({ classData }) => {
  const { id, date, level, limit, players, trainer, type } = classData;

  const classTime = date.split(/[T+]/)[1].slice(0, -3); // Найти подстроку со временем в date (часы и минуты)
  const filledProgress = []; // массив закрашенных кубиков для заполненности занятия
  const filledItem = Math.round((players.length / limit) * 6); // Количество закрашенных кубиков с округлением
  let i = 1;

  // заполнить массив закрашенных кубиков
  while (i <= 6) {
    i <= filledItem ? filledProgress.push('filled') : filledProgress.push('');
    i++;
  }

  const handleJoinClass = (id) => {
    console.log(`join to ${id} class`);
  };

  return (
    <div className={`class class--${level.slug}`}>
      <div className="class__item class__time">{classTime}</div>
      <div className="class__item class__training-type">{type}</div>

      <div className="class__item class__image">
        <img src={`${apiHostName}${trainer.avatar}`} alt="trainer_avatar" title="trainer_avatar" />
      </div>

      <div className="class__item class__trainer-name">Юлия Иванова</div>

      <div className="class__item class__filled">
        {filledProgress.map((item, index) => {
          const filledItemClassName = item !== '' ? 'class__filled-item--bg' : '';

          return <span className={`class__filled-item ${filledItemClassName}`} key={index} />;
        })}
      </div>

      <button className="class__item class__join" onClick={() => handleJoinClass(id)}>
        записаться
      </button>
    </div>
  );
};

export default ScheduleClass;
