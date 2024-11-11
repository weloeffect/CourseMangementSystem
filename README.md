
# Course Management API

This project is a **Course Management API** that enables CRUD (Create, Read, Update, Delete) operations on course data. The API supports pagination, caching, and includes Swagger documentation for reference.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Error Handling and Logging](#error-handling-and-logging)
- [Contributing](#contributing)

## Project Structure

```
.
├── src
│   ├── controllers            # Request handlers for API routes
│   ├── routes                 # API route definitions
│   ├── utils                  # Utility functions and helper files
│   ├── app.ts                 # Main app file
│   ├── swagger.ts             # Swagger setup for API documentation
├── tests                      # Unit and integration tests for controllers
├── public
│   └── index.html             # Frontend interface to interact with the API
├── jest.config.js             # Jest configuration file
├── Dockerfile                 # Docker configuration file
├── docker-compose.yml         # Docker Compose configuration
└── README.md                  # Project documentation
```

## Features

- **CRUD Operations**: Create, retrieve, update, and delete courses.
- **Pagination and Caching**: Efficient pagination and caching of course data.
- **Swagger Documentation**: Detailed API documentation with Swagger.
- **Testing**: Unit and integration tests for reliable functionality.
- **Frontend Interface**: A basic HTML interface for testing API endpoints.

## Technologies Used

- **Node.js** and **Express**: Backend framework for building REST APIs.
- **TypeScript**: Strongly-typed programming language.
- **Jest** and **Supertest**: Testing framework and HTTP assertions.
- **Swagger**: API documentation generation.
- **Postman**: Tool for manual testing of API endpoints.

## Getting Started

### Prerequisites
- Node.js (>=14)
- npm (>=6)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/course-management-api.git
   cd course-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up any required environment variables:
   - **Optional**: Configure any environment variables for things like cache expiration if necessary.

### Running the Project
Start the server in development mode:
```bash
npm run dev
```

The server will start on `http://localhost:3000`.

### Access the Frontend Interface
To access the frontend HTML interface, open `public/index.html` in your browser. This interface allows you to interact with and test various API routes.

## Docker Setup

This project can be run inside a Docker container for easier deployment and consistency across environments.

### Prerequisites

Ensure that you have Docker and Docker Compose installed on your system.

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

### Build the Docker Image

To build the Docker image for the application, run the following command in the root of the project:

```bash
docker build -t course-management-api .
```

### Running the Project with Docker Compose

To start the project with Docker Compose, run:

```bash
docker-compose up --build
```

This command will build the image and start the application in a container. The API will be available at `http://localhost:3000`.

### Stopping the Docker Containers

To stop the containers, run:

```bash
docker-compose down
```

### Dockerfile

The `Dockerfile` includes the following steps to containerize the Node.js app:

```dockerfile
# Use official Node.js image as base
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
```

### docker-compose.yml

The `docker-compose.yml` file defines the service and the Docker network:

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/src/app
    environment:
      - NODE_ENV=development
    command: npm run dev
```

## API Documentation

The API is documented using **Swagger** and can be accessed at `http://localhost:3000/api-docs` after starting the server.

### Endpoints

#### Get All Courses
- **URL**: `/api/courses`
- **Method**: `GET`
- **Description**: Retrieves a paginated list of courses.
- **Parameters**:
  - `page` (query): Page number.
  - `limit` (query): Number of items per page.

#### Get Course by ID
- **URL**: `/api/courses/{id}`
- **Method**: `GET`
- **Description**: Retrieves course details by ID.

#### Create a New Course
- **URL**: `/api/courses`
- **Method**: `POST`
- **Description**: Creates a new course.
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "modules": [
      {
        "title": "string",
        "lessons": [
          {
            "title": "string",
            "description": "string",
            "topics": ["string"],
            "content": [
              {
                "type": "text or video or audio",
                "data": "string"
              }
            ]
          }
        ]
      }
    ]
  }
  ```

#### Update a Course
- **URL**: `/api/courses/{id}`
- **Method**: `PUT`
- **Description**: Updates an existing course by ID.
- **Request Body**: Same format as course creation.

#### Delete a Course
- **URL**: `/api/courses/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a course by ID.

## Testing

This project uses **Jest** and **Supertest** for testing.

### Running Tests
To run all tests, use:
```bash
npm test
```

### Sample Test Cases

1. **Controller Tests**: Validates the logic within each course controller method.
2. **Route Tests**: Ensures that the endpoints return the expected responses.
3. **Pagination and Caching Tests**: Verifies that pagination and caching work as intended.

#### Example of Controller Test (courseController.test.ts)
```typescript
import request from 'supertest';
import app from '../../src/app';

describe('GET /api/courses', () => {
  it('should return a list of courses with pagination', async () => {
    const response = await request(app).get('/api/courses?page=1&limit=5');
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});
```

## Error Handling and Logging

- **Error Handling**: The API has a centralized error-handling mechanism for logging errors and sending user-friendly error messages.
- **Logging**: Uses Winston for structured logging, which helps in debugging and monitoring API requests and errors.

## Contributing

Feel free to submit issues and pull requests! For major changes, please open an issue first to discuss what you would like to change.
