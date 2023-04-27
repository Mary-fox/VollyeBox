// import { MapContainer, TileLayer, Marker, ZoomControl} from 'react-leaflet';
import './MyMap.scss';
import React, { useState } from 'react';
import { YMaps, Map, Clusterer, Placemark} from '@pbe/react-yandex-maps';
// import 'leaflet/dist/leaflet.css';
// import { Icon } from 'leaflet';
// import marker from '../../assets/icon/map-marker.svg';
import  {useEffect}   from 'react';
import mapIcon from "../../assets/icon/map-address.svg"
import { Link } from 'react-router-dom';
import Api from '../Api/Api';

function MyMap() {
  const [selectedPoint, setSelectedPoint] = useState("");
  // const [activeMarker, setActiveMarker] = useState(null);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    Api.get('api/v1/get_gym_coord/')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);
   const handleMarkerClick = (point) => {
    setSelectedPoint(point);
 };

 return (
  <YMaps>
    <Map defaultState={{ center: [55.751574, 37.573856], zoom: 11 }}>
      <Clusterer>
        {data.map((item) => (
          <Placemark key={item.id} geometry={[item.lat, item.lng]} onClick={() => handleMarkerClick(item)} />
        ))}
      </Clusterer>
      {selectedPoint && (
        <div className="popup">
          <h3 className='popup__title'>Адрес</h3>
          <div className="popup__address-block">
            <img src={mapIcon} alt="icon" />
            <p className='popup__text'>{selectedPoint.name}</p>
          </div>
          <p className="popup__address">{selectedPoint.description}</p>
          <Link to="#!" className="popup__btn">Подробнее</Link>
        </div>
      )}
    </Map>
  </YMaps>
);
};

export default MyMap;

// // function MyMap() {
// //   const [selectedPoint, setSelectedPoint] = useState("");
// //   const [data, setData] = useState([]);

// //   // useEffect(() => {
// //   //   axios.get('https://merlinsbeard.ru/api/v1/get_gym_coord/')
// //   //     .then(response => setData(response.data))
// //   //     .catch(error => console.error(error));
// //   // }, []);

// //   useEffect(() => {
// //     Api.get('api/v1/get_gym_coord/')
// //       .then(response => setData(response.data))
// //       .catch(error => console.error(error));
// //   }, []);

// //   // Api.get(`curl --location --request GET 'api/v1/get_gym_coord/'`)
// //   // .then(response => setData(response.data))

// //   const customIcon = new Icon({
// //     iconUrl: marker,
// //     iconSize: [20, 20],
// //   });


// //   const handleMarkerClick = (point) => {
// //     setSelectedPoint(point);
// //   };

// //   return (
// //     <>
// //       {selectedPoint && (
// //         <div className="popup">
// //           <h3 className='popup__title'>Адрес</h3>
// //           <div className="popup__address-block">
// //             <img src={mapIcon} alt="icon" />
// //             <p className='popup__text'>{selectedPoint.name}</p>
// //           </div>
// //           <p className="popup__address">{selectedPoint.description}</p>
// //           <Link to="#!" className="popup__btn">Подробнее</Link>
// //         </div>
// //       )}
// //       <MapContainer center={[55.714369, 37.673421]} zoom={11} scrollWheelZoom={false}>
// //       <ZoomControl position="bottomright" />
// //         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
// //         {data.map((item) => (
// //          <Marker key={item.id} position={[item.lat, item.lng]} icon={customIcon} eventHandlers={{ click: () => handleMarkerClick(item) }} defaultVisible={true}/>
// //         ))}

// //       </MapContainer>
// //     </>
// //   );
// // }


// export default MyMap;







