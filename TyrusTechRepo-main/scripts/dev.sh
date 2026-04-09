#!/bin/bash

# Start the backend server
cd backend-go
go run cmd/server/main.go &

# Start the frontend development server
cd ../frontend-astro
npm run dev &

# Wait for both processes to finish
wait