# Reservelt

A modern hotel room reservation system built with React and Vite, featuring a comprehensive booking management system with real-time availability checking.

## Features

### Core Functionality
- **Room Management**: Browse and filter rooms by type, price, occupancy, and amenities
- **Booking System**: Real-time booking with conflict prevention and date validation
- **Customer Reviews**: Rate and review system with star ratings and feedback display
- **Service Catalog**: Comprehensive hotel services with detailed descriptions
- **Contact System**: Contact form with social media integration

### Room Types
- **Single Rooms**: $116/night - Perfect for solo travelers
- **Double Rooms**: $180/night - Ideal for couples with enhanced amenities
- **Executive Suites**: $350/night - Luxury suites with premium amenities

### Key Features
- Responsive design for all devices
- Image galleries with navigation
- Advanced filtering system
- Booking conflict prevention
- Customer feedback system
- Social media integration

## Technology Stack

- **Frontend**: React 19.1.0, React Router DOM 7.7.0
- **Build Tool**: Vite 7.0.4
- **Styling**: CSS Modules, Custom CSS
- **Backend**: JSON Server (REST API)
- **Date Handling**: date-fns 4.1.0
- **Deployment**: Render (API), Vite (Frontend)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd Reservelt/Reservelt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. (Optional) Run local JSON server:
```bash
npm run server
```

## API Endpoints

The application uses a REST API hosted at `https://reservelt-endpoints.onrender.com`

### Available Endpoints
- `GET /rooms` - Fetch all rooms
- `GET /rooms/:id` - Fetch specific room
- `GET /bookings` - Fetch all bookings
- `POST /bookings` - Create new booking
- `GET /bookings?roomId=:id` - Fetch bookings for specific room
- `GET /feedback` - Fetch all feedback
- `POST /feedback` - Submit new feedback
- `GET /services` - Fetch all services

## Project Structure

```
src/
├── api/
│   ├── api.js              # Secondary API configuration
│   └── bookingApi.js       # Main API functions
├── components/
│   ├── Booking/
│   │   ├── BookingForm.jsx # Booking form component
│   │   └── BookingForm.css # Booking form styles
│   ├── FeedbackForm/
│   │   ├── FeedbackForm.jsx    # Feedback form
│   │   ├── RatingSystem.jsx    # Star rating system
│   │   ├── ReviewList.jsx      # Reviews display
│   │   ├── LoadingSpinner.jsx  # Loading component
│   │   └── ToastNotification.jsx # Notifications
│   ├── Navigation/
│   │   ├── Navbar.jsx      # Navigation component
│   │   └── Footer.jsx      # Footer component
│   └── Room/
│       ├── RoomCard.jsx    # Individual room card
│       ├── RoomDetail.jsx  # Room details page
│       ├── RoomFilter.jsx  # Room filtering
│       └── RoomList.jsx    # Room listing
├── pages/
│   ├── Home.jsx           # Homepage
│   ├── About.jsx          # About page
│   ├── Services.jsx       # Services page
│   ├── Rooms.jsx          # Rooms page
│   ├── Contact.jsx        # Contact page
│   └── RateUs.jsx         # Rating page
├── styles/
│   ├── *.css             # Component-specific styles
│   ├── ColorOverrides.css # Theme color overrides
│   └── GlobalOverrides.css # Global style overrides
└── App.jsx               # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start local JSON server
- `npm start` - Start production JSON server

## Booking System

### Availability Logic
- Rooms are unavailable during booked periods
- One-day buffer after checkout before next booking
- Real-time conflict checking prevents double bookings
- Date validation ensures logical check-in/check-out dates

### Booking Process
1. Select room and click "Book Now"
2. Fill in guest details and dates
3. System validates availability
4. Booking confirmation with unique ID
5. Email confirmation (simulated)

## Feedback System

### Features
- 5-star rating system
- Written reviews with user names
- Review display with avatars
- Pagination (5 reviews per page)
- Real-time feedback submission

### Rating Categories
- Overall experience rating
- Detailed written feedback
- User identification (name required)
- Timestamp tracking

## Deployment

### Frontend Deployment
The React application can be deployed to any static hosting service:
1. Run `npm run build`
2. Deploy the `dist` folder

### API Deployment
The JSON server is deployed on Render:
- URL: `https://reservelt-endpoints.onrender.com`
- Automatic deployment from repository
- Environment variable support

## Contact Information

- **Email**: info@reservelt.com
- **Phone**: +254 776 435 7980
- **Address**: 123 Hospitality Ave, Resort City

### Social Media
- Facebook: facebook.com/reservelt
- Instagram: instagram.com/reservelt
- TikTok: tiktok.com/@reservelt
- X (Twitter): x.com/reservelt

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For technical support or questions, please contact the development team or create an issue in the repository.