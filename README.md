# Registration Form Project

## Author
**Muhammad Armaghan Khan**

## Description
This project is a registration form that allows users to input their details, receive a welcome email, log in, and access a personalized dashboard displaying their details. Client-side validation ensures no field is left empty, email addresses are validated for correctness, tokens are used for secure email communication, and the user login system enhances security and usability.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
    - [Clone Repository](#clone-repository)
    - [Install Node.js and NPM](#install-nodejs-and-npm)
    - [Install MongoDB](#install-mongodb)
    - [Install MongoDB Compass (Optional)](#install-mongodb-compass-optional)
    - [Install Dependencies](#install-dependencies)
    - [Setup Environment Variables](#setup-environment-variables)
3. [Start the Project](#start-the-project)
4. [Tech Stack](#tech-stack)

---

## Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **NPM** (comes with Node.js)
- **MongoDB** (v5 or higher)
- A code editor (e.g., VS Code)

---

## Installation Steps

### Clone Repository
1. Open your terminal or command prompt.
2. Clone the project repository from GitHub:
   ```bash
   git clone https://github.com/your-repo-link/registration-form.git
   ```
3. Navigate to the project folder:
   ```bash
   cd registration-form
   ```

### Install Node.js and NPM
Download and install Node.js from [Node.js official website](https://nodejs.org/).
Verify installation:
```bash
node -v
npm -v
```

### Install MongoDB
1. Download MongoDB from the [MongoDB website](https://www.mongodb.com/try/download/community).
2. Follow the installation instructions for your operating system.
3. Start the MongoDB server:
   ```bash
   mongod
   ```

### Install MongoDB Compass (Optional)
MongoDB Compass provides a GUI to visualize and manage your database. Download it from [MongoDB Compass](https://www.mongodb.com/products/compass) and install it.

### Install Dependencies
Navigate to the respective folders and install the required Node modules:

#### Frontend (React App):
```bash
cd app
npm install
```

#### Backend (Node.js + MongoDB):
```bash
cd ../backend
npm install
```

### Setup Environment Variables
1. In the `backend` folder, locate the `Example.env` file.
2. Rename it to `.env`.
3. Open the `.env` file and configure your environment variables (e.g., MongoDB connection string, email credentials, and keys).

---

## Start the Project

### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Ensure you have configured the `.env` file with your email, password, and keys.
3. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the app folder:
   ```bash
   cd ../app
   ```
2. Start the React development server:
   ```bash
   npm run dev
   ```

---

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Database Management:** MongoDB Compass (optional)
- **Email Service:** Nodemailer (or any preferred email library)

---

You're now ready to use the registration form application. Happy coding!

Kind Regards,


