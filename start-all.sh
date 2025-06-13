#!/bin/bash

set -e

# Spin up infra
cd infrastructure && docker compose up --build -d && cd ..

# Install backend dependencies
cd backend
pnpm install
pnpm dev &

# Install frontend dependencies
cd ../frontend
pnpm install
pnpm dev
