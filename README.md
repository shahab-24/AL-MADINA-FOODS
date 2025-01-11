Al-Madina Foods
A modern and responsive Community Food Sharing and Surplus Reduction Platform designed to help people share and manage surplus food efficiently. Built with React, Firebase, Node.js, MongoDB, and Tailwind CSS, this project focuses on creating a user-friendly, secure, and feature-rich web application.

🚀 Live Demo
Visit Live Site: [https://al-madina-foods.web.app/]

🎯 Purpose
The platform connects communities to reduce food wastage by sharing surplus food. It allows users to:

Add and manage food items.
Request available foods.
View detailed food information.
Manage food requests and track statuses.


🌟 Key Features
1. Authentication
Email/Password-based authentication with Firebase.
Social login (Google/GitHub).
Secure authentication using JWT tokens for private routes.
2. CRUD Operations
Add, update, delete, and manage foods.
Request and manage food requests.
3. Responsive Design
Fully responsive across mobile, tablet, and desktop devices.
Professionally aligned UI with clean spacing and color contrast.
4. Featured Foods
Highlight the top available food items on the home page.
5. Sorting & Searching
Sort available foods by expiration date.
Search foods by name.
6. Food Details
Detailed information about food items.
Request modal for available foods.
7. Layouts
Toggle between two-column and three-column layouts for available foods.
8. Animations
Smooth and professional animations using Framer Motion.


Client-Side Tech Stack Icons
Technology	Icon
React	
Firebase	
Tailwind CSS	
DaisyUI	
Framer Motion	
Axios	
React Router	
Formik	
Yup	
Server-Side Tech Stack Icons
Technology	Icon
Node.js	
Express.js	
MongoDB	
JWT	
Cors	
Dotenv	
Dev Tools and Frameworks
Technology	Icon
Vite	
PostCSS	
ESLint	
DaisyUI	


![React](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg)
![Firebase](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg)
![Tailwind CSS](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg)
![Node.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg)
![MongoDB](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg)



🛠️ Installation & Setup
Prerequisites
Node.js
npm or yarn
MongoDB Database
Firebase Project
Steps to Run Locally
Clone the Repositories

bash
Copy code
git clone: [https://github.com/shahab-24/AL-MADINA-FOODS]
git clone: [https://github.com/shahab-24/AL-MADINA-FOODS-server]
Set Up the Client

bash
Copy code
cd al-madina-foods
npm install
Set Up the Server

bash
Copy code
cd al-madina-foods-server
npm install
Environment Variables Create .env files in both client and server directories with the following keys:

Client:
env
Copy code
VITE_API_URL=<your-server-url>
VITE_FIREBASE_API_KEY=<firebase-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<firebase-auth-domain>
VITE_FIREBASE_PROJECT_ID=<firebase-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<firebase-storage-bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<firebase-messaging-sender-id>
VITE_FIREBASE_APP_ID=<firebase-app-id>
Server:
env
Copy code
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
Run the Applications

Start the server:
bash
Copy code
npm start
Start the client:
bash
Copy code
npm run dev

📂 Folder Structure
Client
src/components: Reusable UI components.
src/pages: Page components (e.g., Home, Login, Register).
src/context: Context API for global state.
src/hooks: Custom hooks (e.g., AxiosSecure).
src/styles: Tailwind CSS configurations.
Server
routes: API routes (e.g., Food CRUD, Authentication).
middleware: JWT verification and error handling.
models: MongoDB schemas.
controllers: Logic for handling requests.


📦 NPM Packages
Client
Core: react, react-dom, react-router-dom, axios.
Styling: tailwindcss, daisyui, shadcn/ui.
Forms: formik, react-hook-form, yup.
Animations: framer-motion, aos.
Utilities: localforage, react-toastify, sweetalert2.
Server
Core: express, cors, dotenv, mongodb.
Authentication: jsonwebtoken, cookie-parser.
🔗 Deployment
Client
Hosted on [Firebase].
Firebase configuration secured using environment variables.
Server
Hosted on [Vercel].
MongoDB URI secured using environment variables.


⚙️ Features in Action
Home Page
Catchy banner slider with animations.
Featured Foods section showcasing top items.
Add Food
A form with validations to add food items.
Logged-in user details auto-filled.
Available Foods
Cards displaying available foods.
Sorting and searching functionality.
Food Details
Detailed modal view for each food item.
Request button with a pre-filled form.
Private Routes
Manage My Foods.
My Food Requests.


✨ Optional Enhancements
Axios custom hook for secure requests.
Shadcn/UI for modern components.

📜 Contribution
Feel free to fork and submit a pull request with your enhancements!