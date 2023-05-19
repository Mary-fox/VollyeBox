import React, { useState, useEffect, createContext } from 'react';

// Files
import './App.scss';
import { api } from '../../constants/constants';

// Components
import Header from '../Header/Header';
import RoutesList from '../../routes/RoutesList';
import Footer from '../Footer/Footer';

// Context
export const IsLoggedInContext = createContext({}); // User logged state context

function App() {
  const [menu, setMenu] = useState([]);
  const [icon, setIcon] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Logged user state for app

  // Главная страница
  useEffect(() => {
    const userAccessToken = localStorage.getItem('access_token');

    setIsLoggedIn(!!userAccessToken);

    // Для меню
    api.get('menu/').then((response) => setMenu(response.data));

    // Для иконок соц.сетей
    api.get('social/').then((response) => setIcon(response.data));
  }, []);

  return (
    <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="background">
        <Header menu={menu} icon={icon} />

        <main>
          <RoutesList />
        </main>

        <Footer menu={menu} icon={icon} />
      </div>
    </IsLoggedInContext.Provider>
  );
}

export default App;
