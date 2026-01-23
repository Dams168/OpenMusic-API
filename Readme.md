# OpenMusic API

A comprehensive RESTful API for managing music, albums, playlists, and user collaborations built with Express.js and PostgreSQL.

## Features

- **Album Management**: Create, read, update, and delete albums with cover image support
- **Song Management**: Manage songs with filtering by title and performer
- **User Authentication**: Secure login/logout with JWT tokens and refresh token mechanism
- **Playlist Management**: Create playlists, add/remove songs, and manage playlist access
- **Collaborations**: Share playlists with other users for collaborative editing
- **Activity Tracking**: Track all activities (add/remove songs) within playlists
- **Like System**: Like albums with Redis caching for performance optimization
- **Export Feature**: Export playlists to JSON and send via email using RabbitMQ message queue
- **File Upload**: Upload album cover images with multer

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.x
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: Joi
- **Caching**: Redis
- **Message Queue**: RabbitMQ
- **File Upload**: Multer
- **Email**: Nodemailer
- **ID Generation**: nanoid

## Prerequisites

Before installation, ensure you have:

- Node.js
- PostgreSQL
- Redis
- RabbitMQ

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd openMusic-API
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Configure the following variables in `.env`:

```env
# SERVER
PORT=3000
NODE_ENV=development

# DATABASE
PGUSER=your_postgres_user
PGHOST=localhost
PGDATABASE=openmusic_db
PGPASSWORD=your_postgres_password
PGPORT=5432

# AUTHENTICATION
ACCESS_TOKEN_KEY=your_secret_access_token_key
REFRESH_TOKEN_KEY=your_secret_refresh_token_key

# REDIS
REDIS_SERVER=localhost:6379

# RABBITMQ
RABBITMQ_SERVER=amqp://localhost

# FILE UPLOAD
HOST=localhost
PORT=3000
```

### 4. Database Migration

Run migrations to create database tables:

```bash
npm run migrate up
```

### 5. Start the Server

**Development mode** (with auto-reload):

```bash
npm run start:dev
```

**Production mode**:

```bash
npm start
```

The API will be available at `http://localhost:3000`

### 6. Setup Consumer Service (Optional)

For playlist export functionality, setup the consumer service:

```bash
cd consumer
cp .env.example .env
# Configure consumer/.env with your credentials
npm install
node src/consumer.js
```

## API Endpoints

### Authentication

- `POST /authentications` - Login
- `PUT /authentications` - Refresh access token
- `DELETE /authentications` - Logout

### Users

- `POST /users` - Create new user

### Albums

- `POST /albums` - Create album
- `GET /albums/:id` - Get album details with songs
- `PUT /albums/:id` - Update album
- `DELETE /albums/:id` - Delete album
- `POST /albums/:id/covers` - Upload album cover

### Songs

- `POST /songs` - Create song
- `GET /songs` - Get all songs (with filter by title/performer)
- `GET /songs/:id` - Get song details
- `PUT /songs/:id` - Update song
- `DELETE /songs/:id` - Delete song

### Playlists

- `POST /playlists` - Create playlist
- `GET /playlists` - Get user's playlists
- `DELETE /playlists/:playlistId` - Delete playlist
- `POST /playlists/:playlistId/songs` - Add song to playlist
- `GET /playlists/:playlistId/songs` - Get songs from playlist
- `DELETE /playlists/:playlistId/songs` - Remove song from playlist

### Collaborations

- `POST /collaborations` - Add collaborator to playlist
- `DELETE /collaborations` - Remove collaborator

### Activity

- `GET /playlists/:playlistId/activities` - Get playlist activities

### Likes

- `POST /albums/:albumId/likes` - Like album
- `DELETE /albums/:albumId/likes` - Unlike album
- `GET /albums/:albumId/likes` - Get album likes count

### Export

- `POST /export/playlists/:playlistId` - Export playlist to email

## Project Structure

```
openMusic-API/
├── src/
│   ├── services/          # Feature-based services
│   ├── repositories/      # Database operations
│   ├── middlewares/       # Express middlewares
│   ├── validator/         # Request validation schemas
│   ├── exceptions/        # Custom error classes
│   ├── security/          # JWT token management
│   ├── cache/             # Redis service
│   ├── utils/             # Utility functions
│   ├── routes/            # API routes
│   ├── server/            # Express app setup
│   └── app.js             # Entry point
├── consumer/              # RabbitMQ consumer for exports
├── migrations/            # Database migrations
├── package.json           # Dependencies
└── .env.example           # Environment variables template
```

## Scripts

```bash
npm start           # Start production server
npm run start:dev   # Start development server with auto-reload
npm run migrate     # Run database migrations
npm run lint        # Run ESLint
```
