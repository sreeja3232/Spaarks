
# Spaarks Backend

This is the backend API for managing restaurant data, including CRUD operations and geospatial queries. The API is secured with JWT-based authentication and is containerized using Docker.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js version 21.2.0 or later
- Docker installed on your machine
- MongoDB Atlas account (or a local MongoDB instance)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd spaarks-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```plaintext
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
PORT=3000
```

- `MONGO_URI`: Connection string to your MongoDB database.
- `JWT_SECRET`: Secret key for JWT authentication.
- `PORT`: Port on which the application will run (default: 3000).

## Running the Application Locally

### 1. Start the Application

```bash
node index.js
```

### 2. Access the Application

Once the server is running, you can access the API at `http://localhost:3000`.

## Docker

### 1. Build the Docker Image

```bash
docker build -t spaarks-backend .
```

### 2. Run the Docker Container

```bash
docker run -d -p 3000:3000 --name spaarks-backend-container spaarks-backend
```

### 3. Access the Application

The application will be available at `http://localhost:3000`.

### 4. Stop and Remove the Container (Optional)

To stop and remove the Docker container:

```bash
docker stop spaarks-backend-container
docker rm spaarks-backend-container
```

## API Endpoints

### Authentication

- **Register**: `POST /api/register`
  - Registers a new user.
  - Request Body:
    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```

- **Login**: `POST /api/login`
  - Authenticates a user and returns a JWT token.
  - Request Body:
    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```

### Restaurants

- **Create Restaurant**: `POST /api/restaurants`
  - Creates a new restaurant.
  - Requires JWT token in the `Authorization` header.
  - Request Body:
    ```json
    {
      "name": "Test Restaurant",
      "description": "A test restaurant",
      "location": {
        "type": "Point",
        "coordinates": [78.342343, 17.343242]
      },
      "ratings": [5, 4, 5]
    }
    ```

- **Get Restaurants by Radius**: `GET /api/restaurants`
  - Retrieves restaurants within a specific radius.
  - Requires JWT token in the `Authorization` header.
  - Query Parameters:
    - `latitude`: Latitude of the center point.
    - `longitude`: Longitude of the center point.
    - `radius`: Radius in meters.

- **Get Restaurants by Range**: `GET /api/restaurants/range`
  - Retrieves restaurants within a specific distance range.
  - Requires JWT token in the `Authorization` header.
  - Query Parameters:
    - `latitude`: Latitude of the center point.
    - `longitude`: Longitude of the center point.
    - `minimumDistance`: Minimum distance in meters.
    - `maximumDistance`: Maximum distance in meters.

- **Update Restaurant**: `PUT /api/restaurants/:id`
  - Updates an existing restaurant.
  - Requires JWT token in the `Authorization` header.
  - Request Body:
    ```json
    {
      "name": "Updated Restaurant",
      "description": "An updated description",
      "location": {
        "type": "Point",
        "coordinates": [78.342343, 17.343242]
      },
      "ratings": [5, 4, 3]
    }
    ```

- **Delete Restaurant**: `DELETE /api/restaurants/:id`
  - Deletes an existing restaurant.
  - Requires JWT token in the `Authorization` header.

## Project Structure

```plaintext
spaarks-backend/
│
├── models/
│   ├── User.js          # User model for authentication
│   └── Restaurant.js    # Restaurant model with geospatial data
│
├── routes/
│   ├── auth.js          # Authentication routes (register, login)
│   └── restaurant.js    # CRUD routes for restaurants
│
├── middleware/
│   └── auth.js          # JWT authentication middleware
│
├── index.js             # Main entry point for the application
├── Dockerfile           # Dockerfile for containerization
├── package.json         # Node.js dependencies and scripts
├── .env                 # Environment variables
└── README.md            # Project documentation
```

## Troubleshooting

- **Common Issues**:
  - If the application fails to start, ensure that MongoDB is properly connected by verifying the `MONGO_URI` in the `.env` file.
  - If Docker commands fail, ensure Docker is running on your machine.

- **Check Logs**:
  - For Docker container logs:
    ```bash
    docker logs spaarks-backend-container
    ```

## Contributing

If you wish to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
