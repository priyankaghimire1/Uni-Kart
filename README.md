# Uni-Kart

Uni-Kart is a platform designed to facilitate students in buying, selling, and exchanging second-hand goods. This initiative aims to promote sustainability and affordability within student communities by providing an easy-to-use interface for trading pre-owned items.

## Features

- **User Authentication**: Secure login and registration system for students.
- **Product Listings**: Users can create, view, and manage listings of items they wish to sell or exchange.
- **Search and Filter**: Efficient search functionality with filters to help users find specific items quickly.
- **Messaging System**: Integrated chat feature allowing users to communicate directly for inquiries and negotiations.
- **Responsive Design**: Optimized for various devices, ensuring a seamless experience on desktops, tablets, and smartphones.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS and Bootstrap

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/priyankaghimire1/Uni-Kart.git
   cd Uni-Kart
Install dependencies:

For the backend:

bash
Copy
Edit
cd backend
npm install
For the frontend:

bash
Copy
Edit
cd ../frontend
npm install
Set up environment variables:

Create a .env file in the backend directory with the following content:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the application:

In the backend directory, start the server:

bash
Copy
Edit
npm start
In the frontend directory, start the React application:

bash
Copy
Edit
npm start
The backend server will run on http://localhost:5000, and the frontend will run on http://localhost:3000.
