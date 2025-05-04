# Project Setup Instructions

## Requirements

- **Node.js**: v23.6.1
- **npm**: v10.9.2
- **Docker** (optional): for containerized setup
- **Postgres**: v16

---

## Project Structure

root/  
├── backend/  
│   └── src/  
│       ├── db/         # Migrations and seeds  
│       ├── libs/       # Services not related to DB entities  
│       └── modules/    # Logic related to DB entities  
│   └── .env            # Required environment variables  
├── frontend/  
│   └── src/  
│       ├── libs/       # Common files (helpers, components, hooks, etc.)  
│       ├── modules/    # API service and Redux slices  
│       └── pages/      # App pages  
│   └── .env            # Required environment variables  
├── shared/             # Shared types, enums, schemas  
└── docker-compose.yml

---

## Getting Started

### Step 1: Create Environment Files

Create a `.env` file in both the `frontend/` and `backend/` directories.

These should contain:

- A GitHub token (for accessing private packages if needed)
- Database credentials (in backend)


---

### Step 2: Run the Project

You can run the project in one of two ways:

---

#### Option 1: Using Docker

From the root directory:

    docker-compose up

This will start the entire project using Docker containers.

---

#### Option 2: Manual Setup (Local Environment)

1. **Install dependencies in all packages:**

   npm install in root

   cd shared && npm install  
   cd ../backend && npm install  
   cd ../frontend && npm install

2. **Build the shared package:**

   npm run build:shared

3. **Run database migrations:**

   cd backend  
   npm run migrate

4. **Start the frontend app:**

   cd ../frontend  
   npm run dev

5. **Start the backend app:**

   cd ../backend  
   npm run start:dev

---

## Notes

- Ensure `.env` files are properly configured before running the app.
- Always build the `shared` package before starting frontend or backend if it has been modified.

