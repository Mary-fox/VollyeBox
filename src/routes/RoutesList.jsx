import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import MainPage from '../components/MainPage/MainPage';
import BlogPage from '../components/BlogPage/BlogPage';
import TrainingPage from '../pages/TrainingPage/TrainingPage';
import GymPage from '../pages/GymPage/GymPage';
import TrainersPage from '../pages/TrainersPage/TrainersPage';
import PlayerLevelPage from '../pages/PlayerLevelPage/PlayerLevelPage';
import PaymentPage from '../pages/PaymentPage/PaymentPage';
import RegistrationPage from '../components/RegistrationPage/RegistrationPage';
import ConfirmationEmailPage from '../components/RegistrationPage/Confirmation/ConfirmationEmailPage';
import ConfirmationPhonePage from '../components/RegistrationPage/Confirmation/СonfirmationPhonePage';
import PasswordEmailRecoveryPage from '../components/RegistrationPage/PasswodrRecoveryPage/PasswordEmailRecoveryPage';
import PasswordEmailRecoveryTwoPage from '../components/RegistrationPage/PasswodrRecoveryPage/PasswordEmailRecoveryTwoPage';
import StaticPage from '../components/StaticPage/StaticPage';
import ErrorPage from '../components/ErrorPage/ErrorPage';

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/blog/" element={<BlogPage />} />
      <Route path="/training/" element={<TrainingPage />} />
      <Route path="/gym/" element={<GymPage />} />
      <Route path="/trainers/" element={<TrainersPage />} />
      <Route path="/player-level/" element={<PlayerLevelPage />} />
      <Route path="/payment/" element={<PaymentPage />} />
      <Route path="/registration/" element={<RegistrationPage />} />
      <Route path="/confirmation-email/" element={<ConfirmationEmailPage />} />
      <Route path="/confirmation-phone/" element={<ConfirmationPhonePage />} />
      <Route path="/recovery-password-email/" element={<PasswordEmailRecoveryPage />} />
      <Route path="/recovery-password-email/newpassword/" element={<PasswordEmailRecoveryTwoPage />} />
      <Route path="/page/:slug/" element={<StaticPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesList;
