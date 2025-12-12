# Multi-stage build for FlowForge AI Backend
FROM python:3.11-slim as backend-builder

WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Frontend build stage
FROM node:20-alpine as frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy frontend code
COPY . .
RUN npm run build

# Final production image
FROM python:3.11-slim

WORKDIR /app

# Install nginx for serving frontend
RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend from builder
COPY --from=backend-builder /app/backend /app/backend
COPY --from=backend-builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copy frontend build from builder
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 8000

# Start script
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
