import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventCreatePage from "./pages/EventCreationPage";
import EventDetailPage from "./pages/EventDetailPage";
import EventListPage from "./pages/EventListPage";
import EventUpdatePage from "./pages/EventUpdatePage";
import AttendeeAddPage from "./pages/AttendeeAddPage";

import styles from "./styles/App.module.scss";

const App = () => {
  return (
    <Router>
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <h1>Event Management System</h1>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<EventListPage />} />
            <Route path="/create" element={<EventCreatePage />} />
            <Route path="/detail/:eventId" element={<EventDetailPage />} />
            <Route path="/update/:eventId" element={<EventUpdatePage />} />
            <Route path="/add-attendee/:eventId" element={<AttendeeAddPage />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2025 Event Management System</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
