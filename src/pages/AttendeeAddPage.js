import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Modal from "../components/Modal";
import axios from "axios";
import styles from "../styles/AttendeeAddPage.module.scss";

const AttendeeAddPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [attendeeData, setAttendeeData] = useState({
    name: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAttendeeChange = (e) => {
    const { name, value } = e.target;
    setAttendeeData({ ...attendeeData, [name]: value });
  };

  const addAttendee = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/attendees/${eventId}`,
        attendeeData
      );
      alert("Attendee added successfully!");
      setAttendeeData({ name: "", email: "" });
      navigate(`../`);
    } catch (error) {
      setErrorMessage("Failed to add attendee.");
      setModalOpen(true);
    }
  };

  return (
    <div className={styles.attendeeAddPage}>
      <h1>Add Attendee</h1>
      <div className={styles.attendeeForm}>
        <Input
          label="Attendee Name"
          name="name"
          value={attendeeData.name}
          onChange={handleAttendeeChange}
          placeholder="Enter attendee name"
          required
        />
        <Input
          label="Attendee Email"
          name="email"
          value={attendeeData.email}
          onChange={handleAttendeeChange}
          placeholder="Enter attendee email"
          required
        />
        <Button onClick={addAttendee}>Add Attendee</Button>
      </div>

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

export default AttendeeAddPage;
