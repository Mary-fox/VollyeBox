import React from 'react';

// Files
import './ScheduleClass.scss';
import { api, apiHostName, hexToRGB } from '../../../constants/constants';

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

    // api.post(`make_as_training/${id}`).then(({ data }) => {
    //   console.log(data);
    //   // setTrainers(data)
    // });
  };

  return (
    <div
      className="class"
      style={{ borderColor: level.color, boxShadow: `inset 3px -3px 23px ${hexToRGB(level.color, 0.7)}` }}
    >
      <div className="class__item class__time">{classTime}</div>
      <div className="class__item class__training-type">{type}</div>

      <div className="class__item class__image">
        <img src={`${apiHostName}${trainer.avatar}`} alt="trainer_avatar" title="trainer_avatar" />
      </div>

      <div className="class__item class__trainer-name">Юлия Иванова</div>

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

      <button
        className="class__item class__join"
        style={{ backgroundColor: level.color }}
        onClick={() => handleJoinClass(id)}
      >
        записаться
      </button>
    </div>
  );
};

export default ScheduleClass;
