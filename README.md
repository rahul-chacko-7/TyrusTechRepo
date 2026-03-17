# Digitization Platform

Welcome to the Digitization Platform project! This repository contains the code and resources for a comprehensive digitization solution, featuring a frontend built with Astro, a backend developed in Go, and a database managed through Supabase.

## Project Structure

The project is organized into the following main components:

- **Frontend (Astro)**: Located in the `frontend-astro` directory, this part of the project handles the user interface and client-side logic.
- **Backend (Go)**: The `backend-go` directory contains the server-side application, which processes requests and interacts with the database.
- **Supabase**: The `supabase` directory includes configuration and migration files for managing the database.
- **Documentation**: The `docs` directory provides detailed documentation on the project's phases and architecture.
- **Scripts**: The `scripts` directory contains utility scripts for development and setup.

## Development Phases

The project follows a structured development process, which includes:

1. **Research**: Understanding the requirements and defining the scope of the project.
2. **Prototyping**: Creating initial designs and mockups for the user interface.
3. **Implementation**: Developing the frontend and backend components.
4. **Deployment**: Preparing the application for production and deploying it to a live environment.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd digitization-platform
   ```

2. Set up the Supabase environment:
   ```
   cd supabase
   ./scripts/setup-supabase.sh
   ```

3. Start the backend server:
   ```
   cd backend-go
   go run cmd/server/main.go
   ```

4. Run the frontend development server:
   ```
   cd frontend-astro
   npm install
   npm run dev
   ```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.# TyrusTechRepo
