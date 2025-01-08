import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Modal";
import styles from "../styles/EventCreatePage.module.scss";

const EventCreatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    createdBy: "",
    capacity: "",
    tags: "",
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    if (!e?.target) {
      console.error("handleInputChange: event target is undefined", e);
      return;
    }
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transformedData = {
      ...formData,
      capacity: parseInt(formData.capacity, 10),
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
    };

    try {
      console.log("Submitting transformed data:", transformedData);
      const response = await axios.post(
        "http://localhost:8080/api/create-event",
        transformedData
      );
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error ||
          "An error occurred while creating the event."
      );
      setModalOpen(true);
    }
  };

  return (
    <div className={styles.eventCreatePage}>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Event Name"
          name="name"
          type="textarea"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter event name"
          required
        />
        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter event description"
          required
          type="textarea"
        />
        <Input
          label="Date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          placeholder="YYYY-MM-DD"
          required
          type="date"
        />
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Enter event location"
          required
        />
        <Input
          label="Capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleInputChange}
          placeholder="Enter maximum capacity"
          required
          type="number"
          min="1"
        />
        <Input
          label="Created by"
          name="createdBy"
          value={formData.createdBy}
          onChange={handleInputChange}
          placeholder="Enter the name"
          required
        />
        <Input
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          placeholder="e.g., Tech, Conference"
        />
        <Button type="submit">Submit</Button>
      </form>

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h2>Error</h2>
          <p>{errorMessage}</p>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>
      )}
    </div>
  );
};

export default EventCreatePage;
