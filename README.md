# Calendo- Notion Calendar Clone

## Description
We are building a Calendar Application similar to Notion, which allows users to manage their events efficiently. The application includes features like user authentication, multiple calendar views (Day, Week, Month), event creation by dragging over dates, and live updates for events (instant reflection on the screen). Users can also manage event details, such as start and end dates, using a sidebar and a popup calendar. The goal is to provide a seamless and interactive user experience for managing personal or professional schedules.

## Features and Functionalities
### User Authentication
- **Sign Up:** Users can create a new account by providing a username and password. Passwords are securely hashed before being stored in the database.
- **Login:** Users can log in using their credentials. Upon successful authentication, a session cookie is set, allowing the user to remain logged in.
- **Session-based Authentication:** The application uses cookies to manage user sessions. Each session is securely stored on the server, and users must be authenticated to access protected routes.
- **Protected Routes:** Routes related to viewing or editing events are protected and accessible only to authenticated users. Unauthorized users will be redirected to the login page.

### Calendar Functionality
- Build a calendar that displays dates for the current month and year, with today's date highlighted.
- Allow users to switch between different views: **Day, Week, or Month**.
- Add a **"Today"** button that takes users directly to the current date for easy navigation.

### Event Management
1. **Creating Events**
   - Users can create events by dragging over a date range on the calendar.
   - While dragging, the selected date range (start date to end date) is displayed in a sidebar.
2. **Event Display**
   - When users drag over a date range, an event line is instantly displayed on the calendar for the selected range.
   - Changes made to the event title in the sidebar should reflect instantly on the calendar.
   - Events should visually span the selected date range (e.g., if the event spans from the 6th to the 8th, display it as a line from the 6th to the 8th, with the event name inside).
3. **Drag and Drop**
   - After creating an event, users can drag and drop the event to a different date range.
   - The updated date range should immediately reflect in the sidebar.

### Sidebar Details
- The sidebar is used to display more information about an event or a selected event.
- The sidebar should contain multiple fields, such as the name of the event (e.g., birthday, interview, or other events).
- It should include a field for the event title and the range of selected event dates, including the start date and end date.
- When clicking on either the start date or the end date, a **calendar popup** should appear, showing the currently selected date.
- The selected date should be editable through this calendar, and any changes should instantly reflect on the main calendar as a **live preview**.

### Start and End Date Management
- Users can manage the event's start and end dates in the sidebar after dragging.
- Clicking on the start or end date opens a **popup calendar** for selecting the respective date.

## Technologies to Use
### Frontend
- **Framework:** Next.js with TypeScript
- **State Management:** React Context API
- **UI Library:** React FullCalendar
- **Real-time Updates:** Socket.io for live event changes

### Backend
- **Server:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Prisma ORM
- **GraphQL API:** Apollo Server with TypeGraphQL
- **Authentication:** Session-based authentication using cookies
- **Real-time Updates:** Socket.io for event synchronization

## Project Structure
### Frontend (Next.js with TypeScript)
- **Pages:**
  - Home: Displays the calendar and events
  - Login: User login form
  - Signup: New user registration form
- **Calendar Views:** Switch between **Day, Week, and Month** views, with a **"Today"** button for navigation.
- **Real-time Updates:** Events update instantly on the calendar when created or edited.

### Backend (Node.js with TypeScript)
- **API Routes:** For user authentication and event CRUD operations
- **Socket:** Enables real-time event updates

## Getting Started
### Prerequisites
- Node.js (>=16.x)
- npm or yarn
- MongoDB instance (local or cloud-based)

### Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/notion-calendar-clone.git
   cd notion-calendar-clone
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     SESSION_SECRET=your_secret_key
     NEXT_PUBLIC_SOCKET_URL=your_socket_url
     ```
4. **Run the development server**
   ```sh
   npm run dev
   ```
5. **Run the backend server**
   ```sh
   npm run server
   ```
6. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any queries or issues, feel free to reach out via GitHub issues or email at `your.email@example.com`.

---
### References
You can refer to the official Notion calendar here: [Notion Calendar](https://calendar.notion.so)

