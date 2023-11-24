import "./App.css";
import GoogleMapComponent from "./components/GoogleMapComponent";
import MapFormModal from "./components/MapFormModal";
import RequestForm from "./components/RequestForm";
import React, { useState } from "react";
import Modal from "react-modal";

import StackBarChart from "./components/StackBarChart";

Modal.setAppElement("#root");

function App() {
  const UWBCOffices = [
    {
      lat: 49.25522,
      lng: -123.00044,
      name: "United Way - Lower Mainland",
      popUpText: "United Way BC Burnaby Office",
    },
    {
      lat: 49.05273,
      lng: -122.32523,
      name: "United Way - Fraser Valley",
      popUpText: "United Way BC Fraser Valley",
    },
    {
      lat: 49.88573,
      lng: -119.47691,
      name: "United Way - Southern Interior",
      popUpText: "United Way BC Southern Interior",
    },
    {
      lat: 49.16349,
      lng: -123.94343,
      name: "United Way - Central & Northern Vancouver Island",
      popUpText: "United Way BC Central & Northern Vancouver Island",
    },
    {
      lat: 53.90966,
      lng: -122.75852,
      name: "United Way - Northern BC",
      popUpText: "United Way BC Northern BC",
    },
  ];

  const [agencies, setAgencies] = useState([
    {
      lat: 49.14439,
      lng: -122.85361,
      isRequesting: true,
      name: "Lower Mainland Down Syndrome Society",
      address: "481-13320 78 Ave",
    },
    {
      lat: 49.13136,
      lng: -123.09553,
      isRequesting: true,
      name: "Mamas for Mamas",
      address: "unit 123-11121 Horseshoe Way",
    },
    {
      lat: 49.25275,
      lng: -121.79178,
      isRequesting: true,
      name: "Project AIM Community Association",
      address: "2614 Else Road",
    },
    {
      lat: 49.2775646,
      lng: -123.123913,
      isRequesting: false,
      name: "Vancouver AIDS Society",
      address: "1101 Seymour Street",
    },
    {
      lat: 49.2611064,
      lng: -123.0654178,
      isRequesting: true,
      name: "Immigrant Services Society of BC",
      address: "2610 Victoria Dr",
    },
    {
      lat: 49.3119626,
      lng: -123.0767484,
      isRequesting: true,
      name: "North Shore Women's Centre",
      address: "131 East 2nd Street",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestingAgency, setRequestingAgency] = useState(null);

  const handleAddMarker = (newMarker) => {
    console.log(newMarker);
    setShowAddModal(false);
  };

  const handleRequest = () => {
    console.log(requestingAgency);
    let newAgencies = agencies.map((agency) => {
      if (agency.name === requestingAgency) {
        agency.isRequesting = true;
      }
      return agency;
    });
    setAgencies(newAgencies);
    setShowRequestModal(false);
  };

  const handleDelivered = (agencyName) => {
    console.log(agencyName);
    let newAgencies = agencies.map((agency) => {
      if (agency.name === agencyName) {
        agency.isRequesting = false;
      }
      return agency;
    });
    setAgencies(newAgencies);
  };

  const showRequestHandler = (agencyName) => {
    setShowRequestModal(true);
    setRequestingAgency(agencyName);
  };

  return (
    <div className="App">
      <div className="header">
        <img
          src={require("./headerLogo.png")}
          alt="UWBC Logo"
          style={{ height: "100px" }}
        />
      </div>
      <main>
        {/* <MapComponent markers={markers} /> */}
        <GoogleMapComponent
          agencies={agencies}
          UWBCOffices={UWBCOffices}
          showRequestHandler={showRequestHandler}
          confirmedDelivery={handleDelivered}
        />
      </main>
      {/* <button className="addMarkerButton" onClick={() => setShowAddModal(true)}>
        Add Marker
      </button>
      <MapFormModal
        isOpen={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
        onAddMarker={handleAddMarker}
      /> */}
      <RequestForm
        isOpen={showRequestModal}
        onRequestClose={() => setShowRequestModal(false)}
        handleRequest={handleRequest}
      />
      {/* <StackBarChart /> */}
    </div>
  );
}

export default App;
