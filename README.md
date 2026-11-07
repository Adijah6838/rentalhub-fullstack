# RentalHub - Full-Stack Property Management Dashboard

## 📌 Project Overview
RentalHub is a comprehensive property management platform designed to streamline rental operations for Administrators, Landlords, and Tenants. It features a decoupled architecture with a React frontend and a Django REST API backend.

## 🎯 Objective Success Criteria
- [x] **Secure Authentication:** Implementation of JWT (JSON Web Tokens) with role-based access control (RBAC).
- [x] **UI/UX Protection:** React `ProtectedRoute` wrappers ensuring users can only access views authorized for their specific role.
- [x] **Data Visualization:** Utilizes **HTML5 Canvas** (via Chart.js) to render real-time occupancy rates and platform overview analytics.
- [x] **State Management:** Custom React `AuthContext` handles global user state, token storage, and login/logout routing.
- [x] **CRUD Operations:** Working reference implementation for adding, reading, and displaying complex relational data.

## 🛠️ Technologies Used
- **Frontend:** React (Vite), JavaScript (ES6+), React Router, Axios, **Chart.js (Canvas)**, CSS3.
- **Backend:** Python, Django, Django REST Framework, SimpleJWT.
- **Database:** SQLite (Development).

## 🚀 Working Reference Implementation (Local Setup)

**1. Backend Setup**
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\Activate.ps1
# Mac/Linux:
source venv/bin/activate
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
python manage.py migrate
python manage.py runserver
