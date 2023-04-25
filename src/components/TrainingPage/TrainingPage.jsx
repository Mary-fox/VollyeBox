import React, {useState, useEffect} from 'react';
import './TrainingPage.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Api from "../Api/Api";

function TrainingPage ({menu, icon} ) {

 
    const [training, setTraining] = useState([]);

    useEffect(() => {
      Api.get('api/v1/type-training/')
        .then(response => setTraining(response.data));
    }, []);  
    let Bla = {};
    if (training.length > 0 && training[1] && training[1].description && training[1].description.text) {
        try {
            Bla = JSON.parse(training[1].description);
        } catch (error) {
            console.log('Ошибка:', error.message);
        }
    }
    console.log(Bla);
  
  return (
    <div className='training-page background'>
    <Header menu={menu} icon={icon}/>

    <main className='wrapper'>

    </main>
    <Footer menu={menu} icon={icon}/>
    </div>
  );
};

export default TrainingPage;