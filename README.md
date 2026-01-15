# 🐾 Pawsitive Adoption

A full-stack pet adoption platform built with React, TypeScript, and Supabase.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)

## ✨ Features

- 🐾 **Pet Browsing** - Browse and search for adoptable pets with advanced filtering
- ❤️ **Favorites** - Save your favorite pets for later
- 📝 **Application System** - Submit adoption, hosting, and rehoming applications
- 💬 **Real-time Chat** - Communicate with shelters and pet owners instantly
- 🔐 **Authentication** - Secure user registration and login (Email, Google, GitHub)
- 📸 **Image Upload** - Upload and manage pet photos
- 🗺️ **Maps Integration** - View pet locations with Google Maps
- 🌍 **Multi-language** - Support for English, Chinese, and Swedish
- 👤 **Profile Management** - Edit user profiles with avatar upload
- 📱 **Responsive Design** - Beautiful UI optimized for all devices

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling

### Backend
- **Supabase** - PostgreSQL database with real-time capabilities
- **Supabase Auth** - User authentication and authorization
- **Supabase Storage** - File and image storage
- **Supabase Realtime** - Live messaging and updates

### AI Integration
- **Google Gemini API** - AI-powered pet descriptions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm or yarn
- Supabase account ([Sign up here](https://supabase.com))
- Google Gemini API key (optional, for AI features)

### 1. Clone the Repository

```bash
git clone https://github.com/CristinaZhangchan/Pawsitive-Adoption.git
cd Pawsitive-Adoption
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Google Gemini API (for AI-generated pet descriptions)
GEMINI_API_KEY=your_gemini_api_key
```

**How to get your Supabase credentials:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy the `Project URL` and `anon public` key

### 4. Database Setup

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the cleanup script first (if tables already exist):
   ```sql
   -- Copy and run the content from supabase/migrations/000_cleanup.sql
   ```
4. Then run the initial schema:
   ```sql
   -- Copy and run the content from supabase/migrations/001_initial_schema.sql
   ```

#### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 5. Seed Sample Data (Optional)

```bash
npm run seed
```

This will populate your database with sample pets and conversations.

### 6. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
pawsitive-adoption/
├── screens/              # React screen components
│   ├── WelcomeScreen.tsx    # Onboarding & auth
│   ├── HomeScreen.tsx       # Pet browsing
│   ├── DetailsScreen.tsx    # Pet details
│   ├── ListingsScreen.tsx   # Pet listings
│   ├── MessagesScreen.tsx   # Chat list
│   ├── ChatScreen.tsx       # Individual chat
│   ├── ProfileScreen.tsx    # User profile
│   ├── ServicesScreen.tsx   # Services info
│   └── ApplicationFormScreen.tsx  # Application forms
├── services/            # API and backend services
│   ├── supabaseClient.ts    # Supabase configuration
│   ├── authService.ts       # Authentication
│   ├── petsService.ts       # Pet CRUD operations
│   ├── favoritesService.ts  # Favorites management
│   ├── applicationsService.ts # Applications
│   ├── messagesService.ts   # Real-time messaging
│   ├── storageService.ts    # File uploads
│   └── geminiService.ts     # AI descriptions
├── supabase/
│   └── migrations/      # Database migrations
│       ├── 000_cleanup.sql
│       └── 001_initial_schema.sql
├── components/          # Reusable components
├── translations.ts      # i18n translations
├── types.ts            # TypeScript types
└── constants.tsx       # App constants

```

## 🗄️ Database Schema

The application uses the following main tables:

- **profiles** - User profile information
- **pets** - Pet listings (adoption/hosting/rehoming)
- **pet_images** - Multiple images per pet
- **favorites** - User's favorited pets
- **applications** - Adoption/hosting/rehoming applications
- **conversations** - Chat conversations
- **messages** - Individual chat messages

See `supabase/migrations/001_initial_schema.sql` for the complete schema.

## 🔐 Authentication

The app supports multiple authentication methods:

- **Email/Password** - Traditional email-based auth
- **Google OAuth** - Sign in with Google
- **GitHub OAuth** - Sign in with GitHub
- **Guest Mode** - Browse without authentication

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CristinaZhangchan/Pawsitive-Adoption)

1. Click the button above or go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY` (optional)
4. Deploy!

### Deploy to Netlify

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in Site settings
6. Deploy!

## 📱 Features Showcase

### Authentication & Onboarding
- Beautiful welcome screens with image carousel
- Multiple sign-in options
- Guest mode for browsing

### Pet Discovery
- Advanced search and filtering
- Location-based browsing
- Interactive map integration
- Detailed pet profiles with AI-generated descriptions

### Communication
- Real-time messaging
- File and photo attachments
- Conversation history

### Application Process
- Multi-step application forms
- Photo uploads
- Status tracking

### Profile Management
- Avatar upload
- Personal information editing
- Application history
- Favorites management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend infrastructure
- [Google Gemini](https://ai.google.dev/) - AI-powered descriptions
- [Unsplash](https://unsplash.com) - Sample pet images
- [Material Symbols](https://fonts.google.com/icons) - Icon library

## 📧 Contact

Cristina Zhang - [@CristinaZhangchan](https://github.com/CristinaZhangchan)

Project Link: [https://github.com/CristinaZhangchan/Pawsitive-Adoption](https://github.com/CristinaZhangchan/Pawsitive-Adoption)

---

Made with ❤️ for pets and their future families
