// MapFormModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import "./Modal.css";

const RequestForm = ({ isOpen, onRequestClose, handleRequest }) => {
  const [formData, setFormData] = useState({
    address: "",
    name: "",
  });

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitRequest = () => {
    handleRequest();
    // Close the modal
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Marker Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          width: "50%",
          height: "50%",
          margin: "auto",
        },
      }}
    >
      <div className="modal">
        <span className="close" onClick={onRequestClose}>
          &times;
        </span>
        <h2>Replenishment Request</h2>
        <form>
          <div className="wrapper">
            <label>
              Request amount:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={{ marginLeft: "10px" }}
              />
            </label>
          </div>
          <div className="wrapper">
            <p>... More questions ...</p>
          </div>
          <div className="wrapper">
            <p>
              If we are able to provide your organization with product, are you
              able to pick up the product from a United Way distribution
              center? 
            </p>
            <label>
              <input
                type="radio"
                value="yes"
                checked={selectedAnswer === "yes"}
                onChange={handleAnswerChange}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                value="no"
                checked={selectedAnswer === "no"}
                onChange={handleAnswerChange}
              />
              No
            </label>
          </div>
          <button type="button" onClick={submitRequest}>
            Submit Request
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default RequestForm;
