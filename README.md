# Talk API

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Chats](#chats)
  - [Users](#users)
- [WebSocket Events](#websocket-events)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is a backend API for Talk App built with Node.js, Express, and Socket.io. It includes user authentication, chat functionality, and real-time communication features.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-application.git
   cd chat-application
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the following variables:

   ```
   PORT=3000
   NEXT_PUBLIC_HOSTNAME=localhost
   TURSO_DATABASE_URL=your_database_url
   NEXT_PUBLIC_TURSO_AUTH_TOKEN=your_auth_token
   ```

4. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/auth/login**

  - **Description:** Logs in a user and returns a session token.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "session": "session_token"
    }
    ```

- **POST /api/auth/register**

  - **Description:** Registers a new user.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "fullname": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "message": "User registered successfully"
    }
    ```

- **POST /api/auth/logout**
  - **Description:** Logs out a user and clears the session.

### Chats

- **GET /api/chats/:id**

  - **Description:** Retrieves all chats for the user with the specified ID.
  - **Params:** `id` - User ID
  - **Response:**
    ```json
    [
      {
        "conversation_id": 1,
        "other_user_id": 2,
        "other_username": "user2",
        "other_fullname": "User Two"
      }
    ]
    ```

- **GET /api/chats/search**

  - **Description:** Searches for users by username.
  - **Query Params:** `username` - The username to search for
  - **Response:**
    ```json
    [
      {
        "user_id": 2,
        "username": "user2",
        "fullname": "User Two"
      }
    ]
    ```

- **GET /api/chats/conversation/:conversation_id**

  - **Description:** Retrieves all messages for a specific conversation.
  - **Params:** `conversation_id` - Conversation ID
  - **Response:**
    ```json
    [
      {
        "message_id": 1,
        "conversation_id": 1,
        "sender_id": 1,
        "sender_username": "user1",
        "sender_fullname": "User One",
        "content": "Hello!",
        "timestamp": "2024-07-24T10:00:00Z"
      }
    ]
    ```

- **POST /api/chats/message**
  - **Description:** Sends a message in a conversation.
  - **Request Body:**
    ```json
    {
      "conversationId": 1,
      "senderId": 1,
      "content": "Hello!"
    }
    ```

### Users

- **GET /api/users/:user_id**

  - **Description:** Retrieves all users except the specified user.
  - **Params:** `user_id` - User ID
  - **Response:**
    ```json
    [
      {
        "user_id": 2,
        "username": "user2",
        "fullname": "User Two"
      }
    ]
    ```

- **PUT /api/users/update**
  - **Description:** Updates a user's profile information.
  - **Request Body:**
    ```json
    {
      "user_id": 1,
      "username": "newUsername",
      "fullname": "New Fullname"
    }
    ```

## WebSocket Events

- **connection**
  - **Description:** Fired when a new client connects.
- **joinRoom**

  - **Description:** Joins the specified room.
  - **Data:** `{ room: "room_id" }`

- **chat message**

  - **Description:** Sends a message to a specific room.
  - **Data:** `{ room: "room_id", msg: "Hello!" }`

- **disconnect**
  - **Description:** Fired when a client disconnects.

## Environment Variables

- `PORT`: The port number on which the server runs.
- `NEXT_PUBLIC_HOSTNAME`: The hostname for the server.
- `TURSO_DATABASE_URL`: The database connection URL.
- `NEXT_PUBLIC_TURSO_AUTH_TOKEN`: The authentication token for the database.

## Contributing

Feel free to submit issues or pull requests if you have ideas for improving the project!

## License

This project is licensed under the MIT License.
