import React, {useState, useEffect} from 'react';
import {HashRouter,Routes,Route} from"react-router-dom";
import './App.scss';
import MainPage from "./components/MainPage/MainPage";
import BlogPage from "./components/BlogPage/BlogPage";
import TrainingPage from './components/TrainingPage/TrainingPage';
import Api from "./components/Api/Api";
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import ConfirmationEmailPage from './components/RegistrationPage/Confirmation/ConfirmationEmailPage';
import ConfirmationPhonePage from './components/RegistrationPage/Confirmation/СonfirmationPhonePage';
import PasswordEmailRecoveryPage from './components/RegistrationPage/PasswodrRecoveryPage/PasswordEmailRecoveryPage';
import PasswordEmailRecoveryTwoPage from './components/RegistrationPage/PasswodrRecoveryPage/PasswordEmailRecoveryTwoPage'
import PrivacyPolicyPage from './components/PrivacyPolicyPage/PrivacyPolicyPage';

function App() {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [icon, setIcon] = useState([]);
  
  useEffect(() => {
    Api.get('/api/v1/dynamic-page/?slug=main')
    .then(response => setData(response.data[0]))
      .catch(error => console.error(error));
  }, []); //главная страница
 
  useEffect(() => {
    Api.get('api/v1/menu/')
      .then(response => setMenu(response.data));
  }, []);  //для меню
  
  useEffect(() => {
    Api.get('api/v1/social/')
      .then(response => setIcon(response.data));
  }, []);  //для иконок соц.сетей
  const [isAuthenticated, setIsAuthenticated] = useState( ); 


  return (

  <HashRouter>
  {/* <ScrollToTop /> */}
  <Routes>
    <Route path="/" element={<MainPage data={data} menu={menu} icon={icon} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/> }/>
    <Route path="/blog/" element={<BlogPage menu={menu} icon={icon} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}/>
    <Route path="/type-training/" element={<TrainingPage menu={menu} icon={icon} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
    <Route path="/registration/" element={<RegistrationPage menu={menu} icon={icon} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
    <Route path="/confirmation-email/" element={<ConfirmationEmailPage menu={menu} icon={icon} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
    <Route path="/confirmation-phone/" element={<ConfirmationPhonePage menu={menu} icon={icon} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
    <Route path="/recovery-password-email/" element={<PasswordEmailRecoveryPage menu={menu} icon={icon} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
    <Route path="/recovery-password-email/newpassword/" element={<PasswordEmailRecoveryTwoPage menu={menu} icon={icon} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
    <Route path="/privacy-policy/" element={<PrivacyPolicyPage menu={menu} icon={icon} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
  </Routes>
  </HashRouter>
  );
}

export default App;
