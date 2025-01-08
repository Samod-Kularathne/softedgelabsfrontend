import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Modal";
import axios from "axios";
import styles from "../styles/EventUpdatePage.module.scss";

const EventUpdatePage = () => {
  const { eventId } = useParams();
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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/get-event/${eventId}`
        );
        const event = response.data;
        setFormData({
          name: event.name,
          description: event.description,
          date: event.date,
          location: event.location,
          createdBy: event.createdBy,
          capacity: event.capacity.toString(),
          tags: event.tags ? event.tags.join(", ") : "",
        });
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Failed to fetch event details.");
        setModalOpen(true);
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleInputChange = (e) => {
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
      const response = await axios.put(
        `http://localhost:8080/api/events/${eventId}`,
        transformedData
      );

      if (response.status !== 200) {
        setErrorMessage(response.data.error || "Failed to update event.");
        setModalOpen(true);
      } else {
        navigate(`/detail/${eventId}`);
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the event.");
      setModalOpen(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.eventUpdatePage}>
      <h1>Update Event</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Event Name"
          name="name"
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
        <Button type="submit">Update Event</Button>
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

export default EventUpdatePage;
