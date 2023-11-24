// MapFormModal.js
import React, { useState } from "react";
import Modal from "react-modal";

const MapFormModal = ({ isOpen, onRequestClose, onAddMarker }) => {
  const [formData, setFormData] = useState({
    address: "",
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddMarker = () => {
    // Validate form data if needed
    const newMarker = {
      lat: 49,
      lng: -123,
      isRequesting: false,
    };

    // Pass the new marker data to the parent component
    onAddMarker(newMarker);

    // Close the modal
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Marker Modal"
    >
      <div className="modal">
        <span className="close" onClick={onRequestClose}>
          &times;
        </span>
        <h2>Add Marker</h2>
        <form>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <button type="button" onClick={handleAddMarker}>
            Add Marker
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default MapFormModal;
