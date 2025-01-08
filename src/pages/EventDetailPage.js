import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Table from "../components/Table";
import axios from "axios";
import styles from "../styles/EventDetailPage.module.scss";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/get-event/${eventId}`
        );
        const attendeeResponse = await axios.get(
          `http://localhost:8080/api/attendees/${eventId}`
        );
        const data = response.data;

        setEvent(data);
        setAttendees(attendeeResponse.data);
      } catch (err) {
        setError("Failed to fetch event details. Please try again.");
      }
    };

    fetchData();
  }, [eventId]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!event) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.eventDetailPage}>
      <div className={styles.detailCard}>
        <h1>{event.name}</h1>
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Created By:</strong> {event.createdBy}
        </p>
        <p>
          <strong>Capacity:</strong> {event.remaining_capacity}/{event.capacity}
        </p>
        <button
          className={styles.updateButton}
          onClick={() => navigate(`/update/${eventId}`)}
        >
          Update Event
        </button>
        <button
          className={styles.addAttendeeButton}
          onClick={() => navigate(`/add-attendee/${eventId}`)}
        >
          Add Attendee
        </button>
      </div>

      <h2>Registered Attendees</h2>
      {attendees.length > 0 ? (
        <Table
          headers={["Name", "Email"]}
          data={attendees}
          renderRow={(attendee) => (
            <tr key={attendee.id}>
              <td>{attendee.name}</td>
              <td>{attendee.email}</td>
            </tr>
          )}
        />
      ) : (
        <p>No attendees have registered for this event yet.</p>
      )}
    </div>
  );
};

export default EventDetailPage;
