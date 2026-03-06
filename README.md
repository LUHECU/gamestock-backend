# GameStock Backend

GameStock Backend is a RESTful API built with NestJS that manages a video game catalog.  
It provides endpoints for creating, updating, retrieving, and deleting game records.

## Features

- RESTful API for managing video game catalog data
- CRUD operations for game entries
- Structured backend architecture using NestJS modules
- Database integration for persistent storage

## Tech Stack

- NestJS
- Node.js
- TypeScript
- PostgreSQL
- REST APIs

## Architecture Overview

The backend follows a modular architecture typical of NestJS applications:

- Controllers – Handle incoming HTTP requests
- Services – Implement business logic
- Modules – Organize application features
- Entities/Models – Represent database structures

## API Endpoints

Example endpoints:
Post /games
GET /games
PUT /game/Update/:id
DELTE /games/Remover/:id
DELETE /game/delete/:id


## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/gamestock-backend
cd gamestock-backend
Install dependencies: npm install
Run the development server: npm run start:dev
The API will run at: The API will run at:
```

## Future Improvements

- Add authentication and authorization
- Rename API endpoints
- Implement validation and error handling improvements
- Add automated tests


