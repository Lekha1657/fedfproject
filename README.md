# 🎓 Student Wellness Hub

A comprehensive frontend web application providing students with access to mental health resources, fitness programs, nutrition advice, wellness appointments, and a personalized calendar with reminders.

## ✨ Features

### 🏠 Home Dashboard
- Browse curated wellness programs across 3 categories:
  - **Mental Health** (counseling, meditation, stress management)
  - **Fitness Programs** (running, yoga, strength training)
  - **Nutrition Advice** (meal planning, cooking, dietary guidance)
- Search and filter programs by category
- Quick links to external wellness resources and articles
- Responsive card-based layout with smooth animations

### 👤 User Authentication
- **Login** — Sign in with existing credentials
- **Sign Up** — Create new student account
- **Admin Access** — Special admin dashboard for seeded admin account
- Client-side password hashing with SHA-256
- Persistent authentication via localStorage
- Demo admin: `admin@school.edu` / `admin123`

### 📝 Program Management
- **Join/Leave Programs** — Participate in wellness programs
- Dynamic button states (Join → Joined ✓)
- Track participant count per program
- Program details modal with descriptions and duration
- 15+ pre-loaded programs across all categories

### 📅 Calendar & Reminders
- **Month View Calendar** — Full calendar grid with navigation
- **Upcoming Events** — See all booked appointments and joined programs
- **Reminders** — Create and manage reminders for:
  - Reading resources
  - Booking appointments
  - Joining programs
  - Custom reminders
- Reminders stored per user with date/time support
- Visual indicators for events and reminders on calendar days

### 🏥 Appointments & Sessions
- **Book Appointments** — Schedule sessions with:
  - Mental health doctors and therapists
  - Fitness coaches and instructors
  - Nutritionists and specialists
- 9 available professional sessions
- Choose date, time, and add notes
- View all booked appointments
- Cancel appointments as needed

### 👥 User Profile
- View personal information (name, email, student ID)
- Track program participation history
- See all upcoming appointments
- Participation metrics

### ⚙️ Admin Dashboard
- View all programs (Mental Health, Fitness, Nutrition)
- Add new programs to the system
- Edit existing program details
- Delete programs
- Track program metadata (participants, duration, category)
- UI-only implementation (demo mode)

### 🌓 Dark Mode
- Toggle between light and dark themes
- Theme preference persisted locally
- Smooth theme transitions across all components

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.x
- **Build Tool**: Vite 7.x
- **Styling**: Plain CSS with CSS variables
- **Package Manager**: npm
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Authentication**: Client-side (SHA-256 hashing, localStorage)
- **Data Persistence**: localStorage
- **Font**: Google Inter

## 📁 Project Structure

```
student-wellness-hub/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation and search bar
│   │   ├── Home.jsx             # Home dashboard with programs
│   │   ├── ProgramCard.jsx       # Individual program card
│   │   ├── Calendar.jsx          # Calendar with reminders
│   │   ├── Appointments.jsx      # Appointments list
│   │   ├── AppointmentForm.jsx   # Appointment booking form
│   │   ├── Profile.jsx           # User profile
│   │   ├── AdminDashboard.jsx    # Admin panel
│   │   ├── Login.jsx             # Login page
│   │   ├── Signin.jsx            # Sign up page
│   │   └── Modal.jsx             # Reusable modal
│   ├── data/
│   │   └── mockData.js           # Mock programs and sessions data
│   ├── utils/
│   │   └── auth.js               # Authentication utilities
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # Global styles
│   ├── index.css                 # Base styles
│   └── main.jsx                  # React entry point
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js               # Vite configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm installed
- Git (to clone the repository)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lekha1657/Front-1.git
cd Front-1/front/fedfp22/student-wellness-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 💾 Local Storage Data

The app uses the following localStorage keys to persist data:

| Key | Purpose |
|-----|---------|
| `swh_programs` | All wellness programs |
| `swh_users` | Registered user accounts |
| `swh_current_user` | Currently logged-in user |
| `swh_user` | User profile data |
| `swh_calendar` | Calendar events |
| `swh_appointments` | Booked appointments |
| `swh_reminders` | User reminders |
| `swh_dark` | Dark mode preference |

**To reset all data:** Open browser DevTools (F12) → Application → Storage → clear localStorage for this domain.

## 🔐 Authentication Guide

### Default Admin Credentials
- Email: `admin@school.edu`
- Password: `admin123`

### Creating a New Account
1. Click "Sign Up" on the login page
2. Enter name, email (preferably `@student.edu`), and password
3. Account is created and you're automatically logged in

### Note on Security
⚠️ **This is a frontend demo application.** Password hashing is done client-side only, which is **not suitable for production**. For production:
- Use a backend server with HTTPS
- Hash passwords server-side (bcrypt, Argon2)
- Use secure session management or JWT tokens
- Implement proper CSRF and XSS protections

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile (320px+)
- 📱 Tablets (720px+)
- 💻 Desktops (920px+)

## 🎨 Color Scheme

**Light Mode:**
- Background: `#f7f9fc`
- Panel: `#ffffff`
- Text: `#0f1724`
- Accent: `#6366f1` (Indigo)
- Muted: `#6b7280` (Gray)

**Dark Mode:**
- Background: `#0b1220`
- Panel: `#0f1724`
- Text: `#e6eef8`
- Accent: `#8b5cf6` (Purple)
- Muted: `#94a3b8` (Slate)

## 📊 Mock Data

The application comes pre-loaded with:
- **15+ Wellness Programs** across all 3 categories
- **9 Professional Sessions** (doctors, therapists, coaches, nutritionists)
- **Default Admin Account** for demo purposes

## 🔄 Key Workflows

### Joining a Program
1. Click "Explore" on a category
2. Browse programs in that category
3. Click "Join" on a program card
4. Button changes to "Joined ✓"
5. Event added to your Calendar

### Booking an Appointment
1. Navigate to "Appointments" tab
2. Select category and service
3. Choose date and time
4. Add optional notes
5. Click "Book Appointment"
6. Appointment appears in Appointments list and Calendar

### Setting a Reminder
1. Go to "Calendar" tab
2. Click "+ Reminder" button
3. Fill in reminder details
4. Select reminder type
5. Reminder appears on calendar on the chosen date

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit with descriptive messages
5. Push to your fork
6. Create a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Lekha1657** on GitHub

## 🐛 Known Limitations

- Frontend-only implementation (no backend API)
- Admin features are UI-only (changes don't persist across sessions in a real scenario)
- No real email notifications
- Password hashing is client-side (demo only)
- No real database integration
- Calendar reminders are visual only (no browser notifications)

## 🚧 Future Enhancements

- Backend API integration (Node.js/Express)
- Database integration (MongoDB/PostgreSQL)
- Email notifications for reminders
- User profile images
- Program ratings and reviews
- Wellness metrics dashboard
- Export calendar to iCal format
- Mobile app version
- Push notifications

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the repository owner.

---

**Happy Wellness! 🌟**
