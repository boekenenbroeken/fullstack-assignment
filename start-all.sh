#!/bin/bash

# Spin up infra
cd infrastructure && docker compose up --build -d && cd ..

# Start backend (locally)
cd backend && pnpm dev &

# Start frontend
cd frontend && pnpm dev
