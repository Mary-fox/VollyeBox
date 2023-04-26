import React, {useState, useEffect} from 'react';
import {HashRouter,Routes,Route} from"react-router-dom";
import './App.scss';
import MainPage from "./components/MainPage/MainPage";
import BlogPage from "./components/BlogPage/BlogPage";
import TrainingPage from './components/TrainingPage/TrainingPage';
import Api from "./components/Api/Api";
import RegistrationPage from './components/RegistrationPage/RegistrationPage';

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


  return (

  <HashRouter>
  {/* <ScrollToTop /> */}
  <Routes>
    <Route path="/" element={<MainPage data={data} menu={menu} icon={icon}/> }/>
    <Route path="/blog/" element={<BlogPage menu={menu} icon={icon}/>}/>
    <Route path="/type-training/" element={<TrainingPage menu={menu} icon={icon}/>}/>
    <Route path="/registration/" element={<RegistrationPage menu={menu} icon={icon}/>}/>
  </Routes>
  </HashRouter>
  );
}

export default App;
