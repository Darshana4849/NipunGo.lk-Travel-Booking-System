# NIPUNGO — Sri Lanka Travel Booking Platform

> **Plan. Book. Explore.**  
> A premium AI-powered travel booking frontend for Sri Lanka, built with React.js and Tailwind CSS.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server (opens at http://localhost:3000)
npm start

# 3. Build for production
npm run build
```

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React.js | 18.x | UI Framework |
| React Router DOM | 6.x | Client-side routing |
| Tailwind CSS | 3.x | Utility-first styling |
| Axios | 1.x | HTTP client |
| React Icons | 5.x | Icon library (Feather Icons) |

---

## 📁 Project Structure

```
src/
├── assets/              # Images and icons
├── components/
│   ├── Navbar/          # Responsive navigation with transparent hero mode
│   ├── Footer/          # Full footer with links, socials, contact
│   ├── HeroSection/     # Auto-sliding hero with search
│   ├── SearchBar/       # Reusable search with redirect
│   ├── DestinationCard/ # Destination card with hover effects
│   ├── HotelCard/       # Hotel card with star rating & price
│   ├── PackageCard/     # Package card with discount badge
│   ├── Testimonials/    # Carousel testimonials
│   └── Newsletter/      # Email subscription with validation
├── pages/
│   ├── Home/            # Full landing page
│   ├── About/           # Company story, team, values
│   ├── Destinations/    # Searchable & filterable destination grid
│   ├── DestinationDetails/ # Full destination page with gallery
│   ├── Hotels/          # Hotel listing with sort & filter
│   ├── HotelDetails/    # Hotel page with booking sidebar
│   ├── Packages/        # Package listing with filters
│   ├── PackageDetails/  # Full itinerary + booking widget
│   ├── Login/           # Auth form with validation
│   ├── Register/        # Registration with password strength
│   ├── Contact/         # Contact form + company details
│   ├── Dashboard/       # User dashboard with stats & bookings
│   ├── MyBookings/      # Booking history with status filter
│   └── NotFound/        # 404 page
├── layouts/
│   └── MainLayout/      # Navbar + Footer wrapper with scroll-to-top
├── routes/
│   └── AppRoutes.js     # All React Router route definitions
├── services/
│   └── api.js           # Axios instance + all API service modules
├── data/
│   ├── destinations.js  # 8 Sri Lankan destinations (static)
│   ├── hotels.js        # 12 hotels with room types (static)
│   └── packages.js      # 10 travel packages with itineraries (static)
└── styles/
    └── index.css        # Tailwind directives + global component classes
```

---

## 🗺 Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/destinations` | Destinations listing |
| `/destinations/:id` | Destination detail |
| `/hotels` | Hotels listing |
| `/hotels/:id` | Hotel detail |
| `/packages` | Packages listing |
| `/packages/:id` | Package detail |
| `/login` | Sign In |
| `/register` | Create Account |
| `/contact` | Contact Us |
| `/dashboard` | User Dashboard |
| `/bookings` | My Bookings |
| `*` | 404 Not Found |

---

## 🎨 Design Tokens

```
Primary:    #0F172A   (Dark Navy)
Secondary:  #2563EB   (Blue)
Accent:     #06B6D4   (Cyan)
Success:    #10B981   (Green)
Background: #F8FAFC   (Light Grey)
Fonts:      Poppins (headings) · Inter (body)
```

---

## 🔌 Connecting a Backend

The `src/services/api.js` file contains a pre-configured Axios instance. To connect a real backend:

1. Create a `.env` file in the project root:
```
REACT_APP_API_URL=https://your-api.com/api
```

2. The following service modules are ready to use:
   - `destinationsAPI` — getAll, getById, search
   - `hotelsAPI` — getAll, getById, search
   - `packagesAPI` — getAll, getById
   - `bookingsAPI` — getMyBookings, create, cancel
   - `authAPI` — login, register, logout, getProfile
   - `contactAPI` — sendMessage

---

## 📦 Static Data

All content (destinations, hotels, packages) is currently served from static JS files in `src/data/`. These can be replaced with real API calls using the service layer in `src/services/api.js`.

---

## ✅ Features

- ✅ Mobile-first responsive design
- ✅ Smooth scroll-to-top on route change  
- ✅ Transparent navbar on hero, solid on scroll
- ✅ Full form validation (login, register, contact)
- ✅ Password strength meter on registration
- ✅ Image gallery with thumbnail navigation
- ✅ Expandable itinerary accordion on package detail
- ✅ Booking price calculator with guest/night controls
- ✅ Booking history with expand/collapse details
- ✅ Newsletter with success state animation
- ✅ 404 page with helpful navigation

---

Built with ❤️ for Sri Lanka by the NIPUNGO team.
