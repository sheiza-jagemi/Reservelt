# Reservelt Backend API

A robust Node.js/Express backend for the Reservelt hotel reservation system with SQLite database, JWT authentication, and comprehensive API endpoints.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (guest, staff, admin)
- Secure password hashing with bcrypt
- Protected routes and middleware

### 🏨 Core Functionality
- **Room Management**: CRUD operations with filtering and availability checking
- **Booking System**: Real-time booking with conflict prevention
- **Feedback System**: Customer reviews with ratings and pagination
- **Service Catalog**: Hotel services management
- **User Management**: Registration, login, profile management

### 🛡️ Security Features
- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation and sanitization
- SQL injection prevention

### 📊 Database
- SQLite database with proper schema design
- Foreign key relationships
- Automated migrations and seeding
- Connection pooling and error handling

## API Endpoints

### Authentication
```
POST /api/auth/register     - Register new user
POST /api/auth/login        - User login
GET  /api/auth/profile      - Get user profile (protected)
PUT  /api/auth/profile      - Update profile (protected)
PUT  /api/auth/change-password - Change password (protected)
```

### Rooms
```
GET    /api/rooms           - Get all rooms (with filters)
GET    /api/rooms/:id       - Get room by ID
POST   /api/rooms           - Create room (admin only)
PUT    /api/rooms/:id       - Update room (admin only)
DELETE /api/rooms/:id       - Delete room (admin only)
```

### Bookings
```
GET    /api/bookings        - Get all bookings (admin/staff only)
GET    /api/bookings/:id    - Get booking by ID (protected)
POST   /api/bookings        - Create booking (public)
PUT    /api/bookings/:id    - Update booking (admin/staff only)
DELETE /api/bookings/:id    - Delete booking (admin only)
```

### Feedback
```
GET    /api/feedback        - Get all feedback (public)
GET    /api/feedback/stats  - Get feedback statistics (public)
GET    /api/feedback/:id    - Get feedback by ID (public)
POST   /api/feedback        - Submit feedback (public)
PUT    /api/feedback/:id    - Update feedback (admin only)
DELETE /api/feedback/:id    - Delete feedback (admin only)
```

### Services
```
GET    /api/services           - Get all services (public)
GET    /api/services/categories - Get service categories (public)
GET    /api/services/:id       - Get service by ID (public)
POST   /api/services           - Create service (admin only)
PUT    /api/services/:id       - Update service (admin only)
DELETE /api/services/:id       - Delete service (admin only)
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
cd backend
npm install
```

### Environment Configuration
Create a `.env` file:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DB_PATH=./database/reservelt.db
CORS_ORIGIN=http://localhost:5173
```

### Database Setup
```bash
# Seed the database with initial data
npm run seed
```

### Running the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'guest',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Rooms Table
```sql
CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_number TEXT UNIQUE NOT NULL,
  room_type TEXT NOT NULL,
  price_per_night REAL NOT NULL,
  max_occupancy INTEGER NOT NULL,
  amenities TEXT,
  is_available BOOLEAN DEFAULT 1,
  images TEXT,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL,
  guest_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price REAL NOT NULL,
  status TEXT DEFAULT 'pending',
  booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms (id)
);
```

## Authentication

### JWT Token Format
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "guest",
  "iat": 1640995200,
  "exp": 1641081600
}
```

### Protected Route Usage
```javascript
// Include JWT token in Authorization header
Authorization: Bearer <your-jwt-token>
```

## Error Handling

### Standard Error Response
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Rate Limiting
- 100 requests per 15 minutes per IP
- Configurable in server.js

## Default Admin Account
After seeding the database:
- **Email**: admin@reservelt.com
- **Password**: admin123

## Development

### Project Structure
```
backend/
├── controllers/        # Route handlers
├── database/          # Database connection and schema
├── middleware/        # Custom middleware
├── routes/           # API route definitions
├── scripts/          # Database scripts
├── .env             # Environment variables
├── server.js        # Main application file
└── package.json     # Dependencies and scripts
```

### Adding New Routes
1. Create controller in `controllers/`
2. Define routes in `routes/`
3. Add validation middleware
4. Register routes in `server.js`

### Database Operations
```javascript
// Query multiple rows
const rooms = await db.query('SELECT * FROM rooms WHERE type = ?', [type]);

// Query single row
const room = await db.get('SELECT * FROM rooms WHERE id = ?', [id]);

// Insert/Update/Delete
const result = await db.run('INSERT INTO rooms (...) VALUES (...)', [values]);
```

## Production Deployment

### Environment Variables
```env
NODE_ENV=production
JWT_SECRET=your-production-secret-key
DB_PATH=/path/to/production/database.db
CORS_ORIGIN=https://your-frontend-domain.com
```

### Security Checklist
- [ ] Change default JWT secret
- [ ] Set up HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up database backups
- [ ] Monitor rate limits
- [ ] Set up logging
- [ ] Configure reverse proxy

## API Testing

### Using curl
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get rooms
curl http://localhost:5000/api/rooms

# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"roomId":1,"guestName":"John Doe","email":"john@example.com","phone":"123456789","checkIn":"2025-08-01","checkOut":"2025-08-05","guests":1,"totalPrice":464}'
```

## Support

For technical support or questions about the API, please refer to the main project documentation or create an issue in the repository.