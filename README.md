# ChatProject

A simple chat API built with Django and Django REST Framework. This project provides endpoints to set a username, send messages, and retrieve messages. It uses SQLite as the default database and is containerized with Docker for easy deployment.

## Features
- RESTful API for chat messages
- Set username, send, and retrieve messages
- Uses Django ORM and SQLite (default)
- Docker and Docker Compose support

## Endpoints
- `POST /api/set-username/` — Set a username
- `POST /api/send-message/` — Send a message
- `GET /api/get-messages/` — Retrieve all messages (ordered by timestamp desc)

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Running with Docker
1. Build the Docker image:
   ```sh
   docker-compose build
   ```
2. Run the containers:
   ```sh
   docker-compose up
   ```
3. The API will be available at `http://localhost:8000/api/`

### Running Locally (without Docker)
1. Install Python 3.12+
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```sh
   python manage.py migrate
   ```
4. Start the server:
   ```sh
   python manage.py runserver
   ```

## Project Structure
- `chat/` — Django app with models, views, serializers, and tests
- `chatproject/` — Project settings and URLs
- `requirements.txt` — Python dependencies
- `Dockerfile` — Docker build instructions
- `docker-compose.yml` — Multi-container setup (web only, using SQLite)

## License
MIT License
