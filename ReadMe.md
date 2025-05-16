# Ticketing System Backend

A support ticket system backend where users can create tickets and administrators can respond. Built with Spring Boot, secured with JWT, and uses PostgreSQL for data storage. Docker support included for easy setup.

---

## Technologies Used

- Java 17
- Spring Boot
- Spring Security (JWT Authentication)
- Spring Data JPA
- PostgreSQL
- Docker & Docker Compose
- Lombok
- Swagger / OpenAPI
- Maven

# Backend

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/atacanyavuz/TicketingSystem.git
cd backend
```

### 2. Configure the Database

```bash
docker-compose up -d
```

### 3. Build and Run the Application

```bash
cd ticketing-system
./mvnw clean install
./mvnw spring-boot:run
```

# Frontend

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/atacanyavuz/TicketingSystem.git
cd ticketing-system-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

By default, the app will be available at:
[http://localhost:5173](http://localhost:5173)
