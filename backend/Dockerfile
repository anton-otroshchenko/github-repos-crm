FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY shared/package*.json ./shared/

# Copy tsconfigs
COPY tsconfig.json ./
COPY shared/tsconfig*.json ./shared/
COPY backend/tsconfig*.json ./backend/
COPY shared/ ./shared/
COPY backend/ ./backend/

# Install root deps (including shared as a workspace)
RUN npm install

# Install backend dependencies (this will symlink shared properly)
WORKDIR /app/backend
RUN npm install

# Build shared package
WORKDIR /app/shared
RUN npm install && npm run build

# Build backend package
WORKDIR /app/backend
RUN npm run build

RUN cp -r ../node_modules/ ./node_modules/

RUN rm -rf ./node_modules/shared && \
    ln -s /app/shared/build ./node_modules/shared


# Start the backend
CMD sh -c "cd /app/shared && npm run build && cd /app/backend && npm run migrate && npm run start:dev"