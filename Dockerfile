# Production Dockerfile for FlowForge AI
# Multi-stage build combining frontend and backend

# Stage 1: Build Frontend
FROM node:20-alpine as frontend-builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --production=false

# Copy source and build
COPY src/ ./src/
COPY public/ ./public/ 2>/dev/null || true
COPY index.html ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

RUN npm run build

# Stage 2: Backend + Nginx Runtime
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    nginx \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Copy and install backend dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy frontend build from builder stage
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Create nginx configuration
RUN echo 'events { worker_connections 1024; }\n\
http {\n\
    include /etc/nginx/mime.types;\n\
    default_type application/octet-stream;\n\
    server {\n\
        listen 80;\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        location / {\n\
            try_files $uri $uri/ /index.html;\n\
        }\n\
        location /api {\n\
            proxy_pass http://localhost:8000;\n\
            proxy_http_version 1.1;\n\
            proxy_set_header Upgrade $http_upgrade;\n\
            proxy_set_header Connection "upgrade";\n\
            proxy_set_header Host $host;\n\
            proxy_cache_bypass $http_upgrade;\n\
        }\n\
    }\n\
}' > /etc/nginx/nginx.conf

# Create supervisor config
RUN echo '[supervisord]\n\
nodaemon=true\n\
\n\
[program:nginx]\n\
command=nginx -g "daemon off;"\n\
autostart=true\n\
autorestart=true\n\
stdout_logfile=/dev/stdout\n\
stdout_logfile_maxbytes=0\n\
stderr_logfile=/dev/stderr\n\
stderr_logfile_maxbytes=0\n\
\n\
[program:backend]\n\
command=uvicorn main:app --host 0.0.0.0 --port 8000\n\
directory=/app/backend\n\
autostart=true\n\
autorestart=true\n\
stdout_logfile=/dev/stdout\n\
stdout_logfile_maxbytes=0\n\
stderr_logfile=/dev/stderr\n\
stderr_logfile_maxbytes=0' > /etc/supervisor/conf.d/supervisord.conf

# Expose ports
EXPOSE 80 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start supervisor to run both nginx and backend
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
