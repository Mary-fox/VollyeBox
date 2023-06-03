/*** Получение диапазона дней в неделе ***/
// Неделя с индексом смещения дней относительно середины недели
const week = [
  ['Понедельник', 'Пн', -3],
  ['Вторник', 'Вт', -2],
  ['Среда', 'Ср', -1],
  ['Четверг', 'Чт', 0],
  ['Пятница', 'Пт', 1],
  ['Суббота', 'Cб', 2],
  ['Воскресенье', 'Вс', 3],
];

const date = new Date();
const convertDayToMilliSec = 24 * 60 * 60 * 1000; // день в милисек
const now = Date.now(); // сегодняшний день в милисек
let dayNumb = date.getDay(); // индекс сегодняшнего дня 0-6

dayNumb === 0 ? (dayNumb = 7) : dayNumb--; // Поменять индекс дня недели, чтоб начинался с Пн

const today = week[dayNumb]; // сегодняшний день достаем из week по новому индексу

// Функция определения диапазона недели
export const weekRange = (dayRange = 0) => {
  // середина текущей недели в милисек. Вычесть индекс смещения для текущего дня и добавить смещение (dayRange)
  const middleWeek = now - today[2] * convertDayToMilliSec + dayRange * convertDayToMilliSec;

  // результат недели
  return week.map(([dayName, dayNameShort, shift], index) => {
    const dayInWeek = new Date(middleWeek + shift * convertDayToMilliSec); // дни недели в милисек
    const day = dayInWeek.getDate() < 10 ? `0${dayInWeek.getDate()}` : dayInWeek.getDate();
    const month = dayInWeek.getMonth() + 1 < 10 ? `0${dayInWeek.getMonth() + 1}` : dayInWeek.getMonth() + 1;
    const year = dayInWeek.getFullYear();

    return {
      id: index + 1,
      dayName: dayName,
      dayNameShort: dayNameShort,
      day: day,
      month: month,
      year: year,
    };
  });
};
