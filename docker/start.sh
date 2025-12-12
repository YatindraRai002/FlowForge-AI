#!/bin/bash

# Start nginx in background
nginx

# Start FastAPI backend
cd /app/backend
python main_flowforge.py
