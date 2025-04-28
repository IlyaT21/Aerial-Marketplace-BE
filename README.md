# Backend - SkyRiders Marketplace

This is the backend for the SkyRiders Marketplace project, built with Node.js, Express, and MongoDB.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root folder and add the required variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
ADMIN_EMAIL=admin_email
ADMIN_PASSWORD=admin_password
```

### 3. Available Scripts

| Command         | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| `npm start`     | Start the server in production mode                                       |
| `npm run dev`   | Start the server in development mode (auto-restart on changes)            |
| `npm run seed`  | Seed the database with default data (users, products, etc.)               |
| `npm run clear` | Clear the entire database and create a fresh admin user                   |

### 4. Running the Server

Start the server with:

```bash
npm run dev
```

or for production:

```bash
npm start
```

## Notes

- API runs on `http://localhost:5000/`
- After running `npm run clear`, only the admin user from the `.env` will exist.
- Make sure MongoDB is running locally or provide a valid Atlas URI.

