import {HashRouter,Routes,Route} from"react-router-dom";
import './App.scss';
import MainPage from "./components/MainPage/MainPage";

function App() {
  return (

  <HashRouter>
  {/* <ScrollToTop /> */}
  <Routes>
    <Route path="/" element={<MainPage/>}/>
  </Routes>
  </HashRouter>
  );
}

export default App;
