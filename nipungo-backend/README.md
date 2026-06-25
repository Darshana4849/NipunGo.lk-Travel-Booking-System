# NIPUNGO Backend — Spring Boot REST API

> **Plan. Book. Explore.**  
> Complete Java Spring Boot 3 backend for the NIPUNGO Sri Lanka Travel Booking Platform.

---

## 🐳 Step 1: Start Docker MySQL

```bash
docker run -d --name nipungo-mysql \
  -p 1024:3306 \
  -e MYSQL_ROOT_PASSWORD=1234 \
  -e MYSQL_DATABASE=nipungo_db \
  mysql:8.0
```

Verify it's running:
```bash
docker ps
```

---

## 🚀 Step 2: Run the Backend

```bash
cd nipungo-backend
mvn clean install -DskipTests
mvn spring-boot:run
```

Server starts at: **http://localhost:8080**

---

## 📖 Step 3: Swagger UI

Open in your browser:

```
http://localhost:8080/swagger-ui.html
```

---

## 🔐 Default Credentials (seeded automatically)

| Role  | Email                | Password   |
|-------|----------------------|------------|
| Admin | admin@nipungo.com    | Admin123@  |
| User  | user@nipungo.com     | User123@   |

---

## 🔑 Authentication Flow

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "password": "Password1@",
  "phone": "+94771234567"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@nipungo.com",
  "password": "Admin123@"
}
```

Response includes `accessToken` — use it as:
```
Authorization: Bearer <accessToken>
```

### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<your_refresh_token>"
}
```

---

## 📡 API Endpoints

### Public (no token required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/destinations` | All destinations |
| GET | `/api/destinations/{id}` | Destination detail |
| GET | `/api/destinations/featured` | Featured destinations |
| GET | `/api/hotels` | All hotels |
| GET | `/api/hotels/{id}` | Hotel detail |
| GET | `/api/hotels/featured` | Featured hotels |
| GET | `/api/packages` | All packages |
| GET | `/api/packages/{id}` | Package detail |
| GET | `/api/packages/featured` | Featured packages |
| GET | `/api/packages/popular` | Popular packages |
| GET | `/api/reviews` | All reviews |
| GET | `/api/reviews/hotel/{hotelId}` | Hotel reviews |
| POST | `/api/contact` | Submit contact form |

### Authenticated (USER or ADMIN)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings/my` | My bookings |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/{id}` | Booking detail |
| POST | `/api/reviews` | Submit review |

### Admin Only
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/destinations` | Create destination |
| PUT | `/api/destinations/{id}` | Update destination |
| DELETE | `/api/destinations/{id}` | Delete destination |
| POST | `/api/hotels` | Create hotel |
| PUT | `/api/hotels/{id}` | Update hotel |
| DELETE | `/api/hotels/{id}` | Delete hotel |
| POST | `/api/packages` | Create package |
| PUT | `/api/packages/{id}` | Update package |
| DELETE | `/api/packages/{id}` | Delete package |
| GET | `/api/bookings` | All bookings |
| PUT | `/api/bookings/{id}/status?status=CONFIRMED` | Update booking status |
| DELETE | `/api/bookings/{id}` | Delete booking |
| GET | `/api/contact` | All contact messages |
| PUT | `/api/contact/{id}/reply` | Mark as replied |

### Query Parameters
```
GET /api/destinations?search=sigiriya
GET /api/destinations?category=Heritage
GET /api/hotels?search=kandy
GET /api/hotels?destinationId=1
GET /api/packages?search=safari
GET /api/packages?category=Wildlife
```

---

## 🗄 Database

MySQL 8.0 running in Docker on port **1024** (mapped from container port 3306).

```
Host:     localhost
Port:     1024
Database: nipungo_db
Username: root
Password: 1234
```

Tables auto-created by Hibernate on first run (`spring.jpa.hibernate.ddl-auto=update`).

---

## 🏗 Project Structure

```
src/main/java/com/nipungo/
├── NipungoApplication.java       # Main entry point
├── config/
│   ├── SecurityConfig.java       # Spring Security + JWT + CORS
│   ├── SwaggerConfig.java        # OpenAPI 3 configuration
│   └── DataSeeder.java           # Sample data seeder
├── jwt/
│   ├── JwtTokenProvider.java     # Token generation & validation
│   ├── JwtAuthenticationFilter.java  # Per-request JWT check
│   └── JwtAuthenticationEntryPoint.java  # 401 handler
├── security/
│   └── CustomUserDetailsService.java  # Load user from DB
├── entity/                        # JPA entities
│   ├── User.java
│   ├── Destination.java
│   ├── Hotel.java
│   ├── TravelPackage.java
│   ├── Booking.java
│   ├── Review.java
│   └── Contact.java
├── dto/                           # Request/Response DTOs
├── repository/                    # Spring Data JPA repositories
├── service/                       # Service interfaces
├── service/impl/                  # Service implementations
├── controller/                    # REST controllers
├── exception/                     # Custom exceptions + global handler
├── payload/
│   └── ApiResponse.java           # Standard API response wrapper
├── enums/                         # BookingStatus, RoleName etc.
└── constant/
    └── AppConstants.java
```

---

## ⚙️ Tech Stack

| Technology | Version |
|---|---|
| Java | 21 |
| Spring Boot | 3.2.3 |
| Spring Security | 6.x |
| Spring Data JPA | 3.x |
| Hibernate | 6.x |
| MySQL Connector | 8.x |
| JJWT | 0.12.5 |
| SpringDoc OpenAPI | 2.3.0 |
| Lombok | 1.18.30 |
| Maven | 3.x |

---

## 🔗 Frontend Integration

React frontend runs at `http://localhost:3000`.  
CORS is pre-configured to allow all origins from `localhost:3000`.

Update `src/services/api.js` in the frontend:
```js
const API_BASE_URL = 'http://localhost:8080/api';
```

---

## 📊 Seeded Data

On first startup, the following data is automatically inserted:

- **2 users**: admin + demo user
- **8 destinations**: Sigiriya, Ella, Nuwara Eliya, Kandy, Mirissa, Galle, Yala, Arugam Bay
- **12 hotels**: Heritance Kandalama, 98 Acres, Jetwing Lighthouse, Amangalla, Amanwella, and 7 more
- **10 packages**: Cultural Triangle, Beach Escape, Tea Trail, Safari, Grand Tour, Honeymoon, and 4 more
