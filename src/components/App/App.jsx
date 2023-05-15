import React, { useState, useEffect } from 'react';

// Files
import './App.scss';
import { api } from '../../constants/constants';

// Components
import Header from '../Header/Header';
import RoutesList from '../../routes/RoutesList';
import Footer from '../Footer/Footer';

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
    <div className="background">
      <Header menu={menu} icon={icon} />

      <main>
        <RoutesList />
      </main>

      <Footer menu={menu} icon={icon} />
    </div>
  );
}

export default App;
