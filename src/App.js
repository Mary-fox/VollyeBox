import React, {useState, useEffect} from 'react';
import {HashRouter,Routes,Route} from"react-router-dom";
import './App.scss';
import MainPage from "./components/MainPage/MainPage";
import BlogPage from "./components/BlogPage/BlogPage";
import Api from "./components/Api/Api";
function App() {
  const [menu, setMenu] = useState([]);
  const [icon, setIcon] = useState([]);
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
    <Route path="/" element={<MainPage menu={menu} icon={icon}/> }/>
    <Route path="/blog/" element={<BlogPage menu={menu} icon={icon}/>}/>
  </Routes>
  </HashRouter>
  );
}

export default App;
