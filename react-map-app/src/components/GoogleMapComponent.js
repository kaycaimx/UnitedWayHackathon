// GoogleMapComponent.js
import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import "./GoogleMapComponent.css";

const containerStyle = {
  width: "90%",
  height: "600px",
  justifyItem: "center",
  marginLeft: "50px",
};

const GoogleMapComponent = ({
  agencies,
  UWBCOffices,
  showRequestHandler,
  confirmedDelivery,
}) => {
  const center = {
    lat: 49.255,
    lng: -123,
  };

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    if (selectedMarker === marker) {
      return;
    }
    setSelectedMarker(marker);
  };

  const markerIcons = {
    UWMarker: {
      url: require("../assets/UWBClogo.png"),
      scaledSize: { width: 30, height: 30 },
    },
    redMarker: {
      url: require("../assets/redDot.png"),
      scaledSize: { width: 30, height: 30 },
    },
    greenMarker: {
      url: require("../assets/greenDot.png"),
      scaledSize: { width: 30, height: 30 },
    },
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onClick={() => setSelectedMarker(null)}
      >
        {UWBCOffices.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={markerIcons.UWMarker}
            onClick={() => handleMarkerClick(marker)}
          >
            {selectedMarker === marker ? (
              <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                <div>
                  <h2>{marker.name}</h2>
                  <div className="buttonsWrapper">
                    <button
                      onClick={() =>
                        window.open(
                          "https://secure.qgiv.com/event/periodpromise2023/",
                          "_blank"
                        )
                      }
                    >
                      Donate
                    </button>
                    <button
                      onClick={() =>
                        window.open(
                          "https://uwbc.ca/you-can-help/#volunteer",
                          "_blank"
                        )
                      }
                    >
                      Join us
                    </button>
                  </div>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
        {agencies.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={
              marker.isRequesting
                ? markerIcons.redMarker
                : markerIcons.greenMarker
            }
            onClick={() => handleMarkerClick(marker)}
          >
            {selectedMarker === marker ? (
              <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                <div>
                  <h3>{marker.name}</h3>
                  <p>{marker.address}</p>
                  {marker.isRequesting ? (
                    <>
                      <p className="criticalText">Critical</p>
                      <button
                        className="deliveredButton"
                        onClick={() => confirmedDelivery(marker.name)}
                      >
                        Delivered
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="goodText">All Good</p>
                      <button
                        className="requestButton"
                        onClick={() => showRequestHandler(marker.name)}
                      >
                        Request
                      </button>
                    </>
                  )}
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
