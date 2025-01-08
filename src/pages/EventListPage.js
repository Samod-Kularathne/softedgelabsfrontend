import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import Input from "../components/Input";
import Button from "../components/Button";
import styles from "../styles/EventListPage.module.scss";

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    date: "",
    location: "",
    tags: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/api/get-events"
        );
        setEvents(response.data);
        setFilteredEvents(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = events;

      if (filters.name.trim()) {
        filtered = filtered.filter((event) =>
          event.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }

      if (filters.date.trim()) {
        filtered = filtered.filter(
          (event) => event.date.split("T")[0] === filters.date
        );
      }

      if (filters.location.trim()) {
        filtered = filtered.filter((event) =>
          event.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.tags.trim()) {
        filtered = filtered.filter((event) =>
          event.tags.some((tag) =>
            tag.toLowerCase().includes(filters.tags.toLowerCase())
          )
        );
      }

      setFilteredEvents(filtered);
      setCurrentPage(1);
    };

    applyFilters();
  }, [filters, events]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      date: "",
      location: "",
      tags: "",
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className={styles.eventListPage}>
      <h1>Event List</h1>
      <div className={styles.filterContainer}>
        <Input
          label="Name"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Search by name"
        />
        <Input
          label="Date"
          name="date"
          type="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
        <Input
          label="Location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Search by location"
        />
        <Input
          label="Tags"
          name="tags"
          value={filters.tags}
          onChange={handleFilterChange}
          placeholder="Search by tags"
        />
        <Button onClick={handleClearFilters}>Clear Filters</Button>
      </div>
      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : filteredEvents.length === 0 ? (
        <div>No events found for the selected filters.</div>
      ) : (
        <div>
          <Table
            headers={[
              "Date",
              "Name",
              "Location",
              "Capacity",
              "Tags",
              "Actions",
            ]}
            data={currentData}
            renderRow={(event) => (
              <tr key={event.id}>
                <td>
                  {new Date(event.date).toLocaleDateString()} -{" "}
                  {new Date(event.date).toLocaleTimeString()}
                </td>
                <td>{event.name}</td>
                <td>{event.location}</td>
                <td>
                  {event.remaining_capacity}/{event.capacity}
                </td>
                <td>{event.tags.join(", ")}</td>
                <td>
                  <Button onClick={() => navigate(`/detail/${event.id}`)}>
                    View Details
                  </Button>
                </td>
              </tr>
            )}
          />
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={
                  currentPage === index + 1
                    ? styles.activePageButton
                    : styles.pageButton
                }
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        className={styles.createEventButton}
        onClick={() => navigate("/create")}
      >
        Create Event
      </button>
    </div>
  );
};

export default EventListPage;
