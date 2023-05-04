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
import PasswodrRecoveryPage from './components/RegistrationPage/PasswodrRecoveryPage/PasswodrRecoveryPage';
import TrainingPage from './pages/TrainingPage/TrainingPage';

function App() {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [icon, setIcon] = useState([]);

  useEffect(() => {
    Api.get('/api/v1/dynamic-page/?slug=main')
      .then((response) => setData(response.data[0]))
      .catch((error) => console.error(error));
  }, []); //главная страница

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
        <Route path="/" element={<MainPage data={data} menu={menu} icon={icon} />} />
        <Route path="/blog/" element={<BlogPage menu={menu} icon={icon} />} />
        <Route path="/training" element={<TrainingPage menu={menu} icon={icon} />} />
        <Route path="/registration/" element={<RegistrationPage menu={menu} icon={icon} />} />
        <Route path="/confirmation-email/" element={<ConfirmationEmailPage menu={menu} icon={icon} />} />
        <Route path="/confirmation-phone/" element={<ConfirmationPhonePage menu={menu} icon={icon} />} />
        <Route path="/recovery-password/" element={<PasswodrRecoveryPage menu={menu} icon={icon} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
