# **🌟 AL-MADINA FOODS**

A modern and responsive **Community Food Sharing and Surplus Reduction Platform** designed to help connect communities, reduce food wastage, and share surplus food efficiently. Built with cutting-edge technologies like **React**, **Firebase**, **Node.js**, and **MongoDB**, the platform ensures a seamless user experience, robust security, and responsive design.

---

## **🚀 Live Demo**

👉 [Visit Live Site](#) <https://al-madina-foods.web.app/>

---

## **🎯 Project Overview**

The **Al-Madina Foods** platform enables users to:
- **Add and manage food items** with expiration tracking.
- **Request available foods** and manage their requests.
- **View detailed food information** for transparency.
- **Connect communities** to reduce food wastage and support each other.

---

## **🌟 Key Features**

### **Authentication**
- Secure **email/password-based authentication** with Firebase.
- Social login via **Google/GitHub**.
- JWT-protected private routes for secure access.

### **CRUD Functionality**
- Add, update, delete, and manage food items.
- Request available foods and track their statuses.

### **Responsive Design**
- Fully responsive UI for mobile, tablet, and desktop devices.
- Professionally aligned UI with clean spacing and color contrast.

### **Additional Features**
- **Sorting and Searching**: Sort foods by expiration date or search by name.
- **Layouts**: Toggle between two-column and three-column layouts for food display.
- **Animations**: Smooth transitions using **Framer Motion**.
- **Secure Configuration**: Firebase and MongoDB credentials are protected using environment variables.

---

## **🛠️ Tech Stack**

### **Client-Side**
| Technology       | Icon                                                                                         |
|-------------------|----------------------------------------------------------------------------------------------|
| **React**         | ![React](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg)       |
| **Firebase**      | ![Firebase](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg) |
| **Tailwind CSS**  | ![Tailwind CSS](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg) |
| **DaisyUI**       | ![DaisyUI](https://img.shields.io/badge/-DaisyUI-5A0FC8?logoColor=white&style=flat)         |
| **Axios**         | ![Axios](https://img.shields.io/badge/-Axios-5A29E4?logoColor=white&style=flat)             |
| **Framer Motion** | ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?logo=framer&logoColor=white) |

### **Server-Side**
| Technology       | Icon                                                                                         |
|-------------------|----------------------------------------------------------------------------------------------|
| **Node.js**       | ![Node.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg)    |
| **Express.js**    | ![Express.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg) |
| **MongoDB**       | ![MongoDB](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg) |
| **JWT**           | ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white)         |

---

## **📂 Folder Structure**

### **Client**
- `src/components`: Reusable UI components (e.g., Navbar, Food Cards).
- `src/pages`: Page components (e.g., Home, Login, Register).
- `src/context`: Context API for global state management.
- `src/styles`: Tailwind CSS configurations.
- `src/hooks`: Custom hooks for HTTP requests (e.g., AxiosSecure).

### **Server**
- `routes`: API routes for food management and authentication.
- `middleware`: Authentication and error-handling middleware.
- `models`: MongoDB schemas for food and user data.
- `controllers`: Logic for API request handling.

---

## **⚙️ Installation**

### **Prerequisites**
- **Node.js**
- **npm** or **yarn**
- **MongoDB Database**
- **Firebase Project**

### **Steps**
1. **Clone the Repositories**
   ```bash
   git clone <https://github.com/shahab-24/AL-MADINA-FOODS>
   git clone <https://github.com/shahab-24/AL-MADINA-FOODS-server>



nstall Dependencies

Client:
bash
Copy code
cd al-madina-foods
npm install
Server:
bash
Copy code
cd al-madina-foods-server
npm install
Set Up Environment Variables

Client: Create a .env file with Firebase keys:
env
Copy code
VITE_API_URL=<your-server-url>
VITE_FIREBASE_API_KEY=<firebase-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<firebase-auth-domain>
VITE_FIREBASE_PROJECT_ID=<firebase-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<firebase-storage-bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<firebase-messaging-sender-id>
VITE_FIREBASE_APP_ID=<firebase-app-id>
Server: Create a .env file with:
env
Copy code
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
Run Applications

Start the server:
bash
Copy code
npm start
Start the client:
bash
Copy code
npm run dev
📦 Deployment
Client
Deployed on Netlify/Surge/Other (Replace with your deployment platform).
Firebase keys are secured using environment variables.
Server
Hosted on Render/Vercel/Other (Replace with your deployment platform).
MongoDB URI and JWT secrets are stored in .env.