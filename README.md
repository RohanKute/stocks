# Stock App

This project is a stock broking application where users can fetch the latest prices of US stocks and perform stock trades. It utilizes Node.js for the backend, React.js for the frontend, PostgreSQL with Prisma for the database, Vite as the bundler, JWTs for authorization, and the IEX Cloud API for real-time stock data.

## Setup Instructions

### Backend (Node.js)

1. **Install Dependencies**
   ```bash
   npm install
2. **Database Setup** -
Install PostgreSQL and start a local database server.
Update the database connection URL in your .env file.
3. Follow the Prisma documentation to set up your database schema and generate Prisma client.
Ensure the Prisma client is properly configured with your database connection.
4. Get the IEX api url where you can get realtime stock data in JSON format

### Frontend (React.js with Vite)
1. **Install Dependencies**
   ```bash
   npm install
2. **Build and Run**
   ```bash
   npm run dev
3. Access the application 


