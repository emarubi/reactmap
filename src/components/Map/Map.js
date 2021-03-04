import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "./map.css";
import icon from "./constants";

const zoom = 14;

function Map({ regionCoord, regionName }) {
    const [map, setMap] = useState(null);
    const [position, setPosition] = useState()
    
    function FlyToButton() {
        const onClick = () => {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, map.getZoom());
            });
        }
            // map.flyTo(regionCoord, zoom);
        return <button className="button" onClick={onClick}>Locate on click</button>;
    }
    
    return (
        <>
        {/* create the button to geolocate */}
        <FlyToButton />
        {/* create a map with coordinates from props */}
        {regionCoord && (
            <MapContainer
            center={regionCoord}
              zoom={zoom}
              style={{ height: "90vh" }}
              whenCreated={setMap}
            >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={regionCoord} icon={icon}>
                <Popup>{regionName}</Popup>
              </Marker>
            {/* if position is located put a marker on new coordinates */}
              {position && (
                <Marker position={position} icon={icon}>
                    <Popup>Vous êtes ici</Popup>
                </Marker>
                )}
            </MapContainer>
            )}

        </>
    );
}

export default Map;