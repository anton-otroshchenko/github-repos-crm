FROM node:20-alpine

WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY shared/package*.json ./shared/

# Copy TypeScript config files
COPY tsconfig.json ./
COPY shared/tsconfig*.json ./shared/

# Install dependencies
RUN npm install

# Copy source code
COPY shared/ ./shared/
COPY frontend/ ./frontend/

# Build shared package
RUN npm run build:shared

# Set working directory to frontend
WORKDIR /app/frontend

# Start frontend in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]