import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Files
import './App.scss';
import Api from './components/Api/Api';

// Components
import MainPage from './components/MainPage/MainPage';
import BlogPage from './components/BlogPage/BlogPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import ConfirmationEmailPage from './components/RegistrationPage/Confirmation/ConfirmationEmailPage';
import ConfirmationPhonePage from './components/RegistrationPage/Confirmation/СonfirmationPhonePage';
import PasswordEmailRecoveryPage from './components/RegistrationPage/PasswodrRecoveryPage/PasswordEmailRecoveryPage';
import PasswordEmailRecoveryTwoPage from './components/RegistrationPage/PasswodrRecoveryPage/PasswordEmailRecoveryTwoPage';
import StaticPage from './components/StaticPage/StaticPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import GymPage from './pages/GymPage/GymPage';

function App() {
  const [menu, setMenu] = useState([]);
  const [icon, setIcon] = useState([]);

  //главная страница

  useEffect(() => {
    Api.get('api/v1/menu/').then((response) => setMenu(response.data));
  }, []); //для меню

  useEffect(() => {
    Api.get('api/v1/social/').then((response) => setIcon(response.data));
  }, []); //для иконок соц.сетей

  return (
    <HashRouter>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<MainPage menu={menu} icon={icon} />} />
        <Route path="/blog/" element={<BlogPage menu={menu} icon={icon} />} />
        <Route path="/training/" element={<TrainingPage menu={menu} icon={icon} />} />
        <Route path="/gym/" element={<GymPage menu={menu} icon={icon} />} />
        <Route path="/registration/" element={<RegistrationPage menu={menu} icon={icon} />} />
        <Route path="/confirmation-email/" element={<ConfirmationEmailPage menu={menu} icon={icon} />} />
        <Route path="/confirmation-phone/" element={<ConfirmationPhonePage menu={menu} icon={icon} />} />
        <Route path="/recovery-password-email/" element={<PasswordEmailRecoveryPage menu={menu} icon={icon} />} />
        <Route
          path="/recovery-password-email/newpassword/"
          element={<PasswordEmailRecoveryTwoPage menu={menu} icon={icon} />}
        />
        <Route path="/page/:slug" element={<StaticPage menu={menu} icon={icon} />} />
        <Route path="*" element={<ErrorPage menu={menu} icon={icon} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
