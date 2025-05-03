FROM node:20-alpine

WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/

# Copy TypeScript config files
COPY tsconfig.json ./
COPY shared/tsconfig*.json ./shared/
COPY backend/tsconfig*.json ./backend/

# Install dependencies
RUN npm install

# Copy source code
COPY shared/ ./shared/
COPY backend/ ./backend/

# Build shared package
RUN npm run build:shared

# Set working directory to backend
WORKDIR /app/backend

CMD ["npm", "run", "start:dev"]