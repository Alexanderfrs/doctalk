
# DocTalk - Medical German Communication App

DocTalk is a specialized application designed for healthcare professionals to improve their German communication skills in medical settings.

## Project Overview

This application helps doctors, nurses, caregivers, and medical students from various countries practice German medical terminology and scenarios through interactive exercises and real-world medical conversations.

## Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context + React Query
- **Router**: React Router DOM 6.26.2
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Mobile**: Capacitor (iOS/Android support)
- **UI Components**: Radix UI primitives with custom theming
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- For mobile development: 
  - iOS: macOS with Xcode 14+
  - Android: Android Studio with SDK

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd doctalk

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Mobile Development

This app supports mobile deployment using Capacitor for both iOS and Android platforms.

### Initial Mobile Setup

```sh
# Build the web app first
npm run build

# Initialize Capacitor (only needed once)
npx cap init

# Add iOS platform
npx cap add ios

# Add Android platform (optional)
npx cap add android
```

### Mobile Development Workflow

```sh
# 1. Build the web app
npm run build

# 2. Sync changes to mobile platforms
npx cap sync

# 3. Open in native IDE
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio

# 4. Run on device/simulator
npx cap run ios
npx cap run android
```

### iOS App Store Deployment Requirements

1. **Apple Developer Account** ($99/year)
2. **macOS with Xcode 14+**
3. **iOS device or simulator** for testing
4. **App Store Connect** account setup

### Mobile-Specific Features

- Touch-optimized interface with gesture support
- Responsive design that scales from mobile to desktop
- Swipe navigation for scenarios and content
- Touch-friendly interactive elements
- Optimized for thumb zones on mobile devices

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npx cap sync` - Sync web app to mobile platforms
- `npx cap run ios` - Run on iOS device/simulator
- `npx cap run android` - Run on Android device/emulator

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Route components
├── hooks/             # Custom React hooks
├── contexts/          # React contexts
├── translations/      # Internationalization
├── data/             # Static data and mock content
├── integrations/     # External service integrations
└── lib/              # Utility functions

public/               # Static assets
supabase/            # Supabase configuration and functions
```

## Features

- **Multi-language Support**: English, German, Spanish, Russian, Turkish
- **Interactive Medical Scenarios**: Practice real-world medical conversations
- **Vocabulary Management**: Learn and track medical German terminology
- **Progress Tracking**: Monitor learning progress and achievements
- **Authentication**: Secure user accounts and data
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Offline Capability**: Core features work without internet connection

## Deployment Options

### Web Deployment
- **Lovable**: One-click deployment via the Publish button
- **Netlify/Vercel**: Connect your Git repository for automatic deployments
- **Custom Domain**: Configure custom domains in project settings

### Mobile App Stores
- **iOS App Store**: Deploy using Xcode and App Store Connect
- **Google Play Store**: Deploy using Android Studio and Play Console

## Environment Variables

The app uses Supabase for backend services. The configuration is automatically set up through the Lovable-Supabase integration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both web and mobile
5. Submit a pull request

## Support

For questions about mobile deployment, refer to the [Capacitor documentation](https://capacitorjs.com/docs) or the [Lovable mobile development guide](https://lovable.dev/blogs/TODO).

## License

This project is built for healthcare education and professional development.
