import { MapContainer, TileLayer, Marker, ZoomControl} from 'react-leaflet';
import './MyMap.scss';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import marker from '../../assets/icon/map-marker.svg';
import { useState } from 'react';
import mapIcon from "../../assets/icon/map-address.svg"


function MyMap() {
  const [selectedPoint, setSelectedPoint] = useState("");
  const points = [
    { id: 1, lat: 55.714369, lng: 37.673421, name: 'Дубровка', description: 'ст.м. Дубровка, 1-я улица Машиностроения, 16' },
    { id: 2, lat: 55.611145, lng: 37.722386, name: 'Домодедовская', description: 'станция метро Домодедовская' },
    { id: 3, lat: 55.608465, lng: 37.716612, name: 'Домодедовская', description: 'станция метро Домодедовская' },
  ];
  const customIcon = new Icon({
    iconUrl: marker,
    iconSize: [20, 20],
  });

  const handleMarkerClick = (point) => {
    setSelectedPoint(point);
  };

  return (
    <>
      {selectedPoint && (
        <div className="popup">
          <h3 className='popup__title'>Контакты</h3>
          <div className="popup__address-block">
            <img src={mapIcon} alt="icon" />
            <p className='popup__text'>Адрес</p>
          </div>
          <p className="popup__address">{selectedPoint.description}</p>
        </div>
      )}
      <MapContainer center={[55.714369, 37.673421]} zoom={11} scrollWheelZoom={false}>
      <ZoomControl position="bottomright" />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map((point) => (
         <Marker key={point.id} position={[point.lat, point.lng]} icon={customIcon} eventHandlers={{ click: () => handleMarkerClick(point) }} defaultVisible={true}/>
        ))}

      </MapContainer>
    </>
  );
}


export default MyMap;
