import React from 'react';
import L from 'leaflet';
import { plane, tower } from '../../assets';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { data } from '../../constants';

const CustomMap = ({ selectedPlaneId }) => {
  const selectedPlane = data.find(plane => plane.Id === selectedPlaneId);

  const towerLat = -6.8961484062892975;
  const towerLong = 107.57571995302902;

  const planeIcon = L.divIcon({
    html: `<div style="transform: rotate(${selectedPlane.Trak}deg);">
             <img src="${plane}" style="width: 64px; height: 64px;" />
           </div>`,
    iconSize: [64, 64],
    className: 'plane-icon'
  });

  const towerMarker = new L.Icon({
    iconUrl: tower,
    iconSize: [80, 80],
    iconAnchor: [40, 40],
    popupAnchor: [0, -16],
  });

  const polylinePositions = [
    [selectedPlane.Lat, selectedPlane.Long],
    [towerLat, towerLong]
  ];

  return (
    <MapContainer center={[selectedPlane.Lat, selectedPlane.Long]} zoom={8} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

        // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[selectedPlane.Lat, selectedPlane.Long]} icon={planeIcon}>
        <Popup>
          {selectedPlane.Op} {selectedPlane.Reg} - {selectedPlane.Icao} <br /> Latitude: {selectedPlane.Lat} <br /> Longitude: {selectedPlane.Long} <br /> Heading: {selectedPlane.Trak}
        </Popup>
      </Marker>

      <Marker position={[towerLat, towerLong]} icon={towerMarker}>
        <Popup>
           Menara Pusat Pengendalian Uji Terbang <br /> Latitude: {towerLat} <br /> Longitude: {towerLong}
        </Popup>
      </Marker>

      <Polyline positions={polylinePositions} color="blue">
        <Popup>
           Distance: {selectedPlane.Dst} NM
        </Popup>
      </Polyline>

      <style jsx>{`
        .leaflet-container {
          background-color: black;
        }
      `}</style>
    </MapContainer>
  );
}

export default CustomMap;
