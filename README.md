# Frontend for Event Manager

This repository contains the frontend code for the Event Manager application. It is built using **React.js** to provide a user-friendly interface for creating, updating, and managing events.

## Features

- View events
- Create new events
- Update existing events
- Delete events

## Prerequisites

- Node.js and npm installed on your system

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Samod-Kularathne/softedgelabsfrontend.git
   ```
2. Navigate to the project directory:
   ```bash
    cd frontend-repo
   ```
3. Install dependencies:
   ```bash
    npm install
   ```
4. Start the development server:
   ```bash
    npm start
   ```
5. Open your browser and go to http://localhost:3000.

# API Documentation Links

Refer to the backend repository's documentation for detailed API information:  
[Backend Repository](https://github.com/Samod-Kularathne/softedgelabsbackend)

### Example API Endpoints:

- **GET /api/get-events** - Fetch all events.
- **GET /api/get-event/{id}** - Fetch details of a single event.
- **POST /api/create-event** - Create a new event.
- **PUT /api/events/{id}** - Update an event.
- **DELETE /api/events/{id}** - Delete an event.

---

# Project Structure

```
src/
├── components/        # Reusable components like Input, Button, Modal
├── pages/             # Main pages like EventUpdatePage
├── styles/            # SCSS files for styling
├── App.js             # Main app component
├── index.js           # Entry point for React
```

# Design Decisions

### Component-Based Architecture

The frontend uses a component-based architecture to ensure reusability and maintainability. Shared UI components like forms and buttons are abstracted into the `components/` directory.

### State Management

State is managed using React's `useState` and `useEffect` hooks. This simplifies the logic for fetching and updating event details.

### Styling

SCSS is used for modular and maintainable styling. Each component has its own scoped styles for better separation of concerns.

### API Interaction

Axios is used for handling API requests, which provides cleaner syntax and built-in error handling.

### Responsive Design

The application is styled to be responsive, ensuring it works on various devices.

## Notes

- Ensure the backend is running before testing the frontend.
- Update the API base URL in the code if your backend is not hosted on `http://localhost:8080`.

## Technologies Used

- **React.js**
- **Axios**
- **SCSS** for styling

## Directory Structure

- `src/components/` - Reusable components like Input, Button, Modal.
- `src/pages/` - Pages like EventUpdatePage.
- `src/styles/` - SCSS files for styling.

Enjoy using the Event Manager frontend!
