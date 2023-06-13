import React, { useState, useEffect, createContext } from 'react';

// Files
import './App.scss';
import { api } from '../../constants/constants';

// Components
import AppPageTopDecor from '../IconComponents/AppPageTopDecor/AppPageTopDecor';
import Header from '../Header/Header';
import RoutesList from '../../routes/RoutesList';
import Footer from '../Footer/Footer';
import AppPageBottomDecor from '../IconComponents/AppPageBottomDecor/AppPageBottomDecor';

// Context
export const IsLoggedInContext = createContext({}); // User logged state context
export const MenuAndIconsContext = createContext({}); // Menu and icons context

function App() {
  const [menu, setMenu] = useState([]);
  const [icon, setIcon] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Logged user state for app

  // Главная страница
  useEffect(() => {
    const userAccessToken = localStorage.getItem('access_token');

    setIsLoggedIn(!!userAccessToken);

    // Для меню
    api.get('menu/').then(({ data }) => setMenu(data));

    // Для иконок соц.сетей
    api.get('social/').then(({ data }) => setIcon(data));
  }, []);

  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <MenuAndIconsContext.Provider value={{ menu, icon }}>
        <AppPageTopDecor />

        <Header />

        <main>
          <RoutesList />
        </main>

        <Footer />

        <AppPageBottomDecor />
      </MenuAndIconsContext.Provider>
    </IsLoggedInContext.Provider>
  );
}

export default App;
