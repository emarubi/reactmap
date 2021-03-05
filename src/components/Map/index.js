import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import "./map.css";
import icon from "./constants";

const zoom = 5;

function Map({ regionCoord, regionName }) {
    const [map, setMap] = useState(null);
    const [position, setPosition] = useState()
    
    function FlyToButton() {
        const onClick = () => {
            map.locate().on("locationfound", function (e) {
                setPosition(e.latlng);
                map.flyTo(e.latlng, 13);
            });
        }
            // map.flyTo(regionCoord, zoom);
        return <button className="button" onClick={onClick}>Locate on click</button>;
    }

    function LeafletgeoSearch() {
        // const map = useMap() // only if you dont have already an instance of map
        useEffect(() => {
          const provider = new OpenStreetMapProvider();
      
          const searchControl = new GeoSearchControl({
            style: 'bar',
            position: 'topleft',
            zoomLevel: 12,
            provider,
            marker: {
              icon
            }
          });
      
          map.addControl(searchControl);
      
          return () => map.removeControl(searchControl);
          // eslint-disable-next-line
        }, []);
      
        return null;
      }
    
    return (
        <div className="mapContainer">
          {/* create the button to geolocate */}
          {map && <FlyToButton /> }  
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
              {/* add geosearch if a map instance exists */}
              {map && <LeafletgeoSearch />}   
              {/* add a placeholder on the default position defined by regionCoord*/}
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

        </div>
    );
}

export default Map;