import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Files
import './App.scss';
import { api } from '../../constants/constants';

// Components
import MainPage from '../MainPage/MainPage';
import BlogPage from '../BlogPage/BlogPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import ConfirmationEmailPage from '../RegistrationPage/Confirmation/ConfirmationEmailPage';
import ConfirmationPhonePage from '../RegistrationPage/Confirmation/СonfirmationPhonePage';
import PasswordEmailRecoveryPage from '../RegistrationPage/PasswodrRecoveryPage/PasswordEmailRecoveryPage';
import PasswordEmailRecoveryTwoPage from '../RegistrationPage/PasswodrRecoveryPage/PasswordEmailRecoveryTwoPage';
import StaticPage from '../StaticPage/StaticPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import TrainingPage from '../../pages/TrainingPage/TrainingPage';
import GymPage from '../../pages/GymPage/GymPage';
import TrainersPage from '../../pages/TrainersPage/TrainersPage';

function App() {
  const [menu, setMenu] = useState([]);
  const [icon, setIcon] = useState([]);

  // Главная страница
  useEffect(() => {
    // Для меню
    api.get('menu/').then((response) => setMenu(response.data));

    // Для иконок соц.сетей
    api.get('social/').then((response) => setIcon(response.data));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage menu={menu} icon={icon} />} />
        <Route path="/blog/" element={<BlogPage menu={menu} icon={icon} />} />
        <Route path="/training/" element={<TrainingPage menu={menu} icon={icon} />} />
        <Route path="/gym/" element={<GymPage menu={menu} icon={icon} />} />
        <Route path="/trainers/" element={<TrainersPage menu={menu} icon={icon} />} />
        <Route path="/registration/" element={<RegistrationPage menu={menu} icon={icon} />} />
        <Route path="/confirmation-email/" element={<ConfirmationEmailPage menu={menu} icon={icon} />} />
        <Route path="/confirmation-phone/" element={<ConfirmationPhonePage menu={menu} icon={icon} />} />
        <Route path="/recovery-password-email/" element={<PasswordEmailRecoveryPage menu={menu} icon={icon} />} />
        <Route
          path="/recovery-password-email/newpassword/"
          element={<PasswordEmailRecoveryTwoPage menu={menu} icon={icon} />}
        />
        <Route path="/page/:slug/" element={<StaticPage menu={menu} icon={icon} />} />
        <Route path="*" element={<ErrorPage menu={menu} icon={icon} />} />
      </Routes>
    </>
  );
}

export default App;
