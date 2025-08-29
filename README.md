
# Medical German Learning Platform

A comprehensive platform for healthcare professionals to learn Medical German, featuring interactive scenarios, vocabulary practice, and AI-powered conversations.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medical-german-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Set up Supabase:
- Create a new Supabase project
- Run the SQL migrations found in the `supabase/migrations` folder
- Configure authentication providers if needed

5. Start the development server:
```bash
npm run dev
```

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Tanstack Query** for data fetching
- **React Router** for navigation

### Backend
- **Supabase** for authentication, database, and real-time features
- **PostgreSQL** database with Row Level Security (RLS)
- **Edge Functions** for AI integrations

### Security Features
- **Row Level Security (RLS)** on all database tables
- **Role-based access control** with admin/user roles
- **Secure database functions** with proper search_path configuration
- **Protected admin dashboard** for sensitive data management
- **Email redirect configuration** for secure authentication flows

## 🔒 Security

This application implements comprehensive security measures:

### Database Security
- All tables use Row Level Security (RLS) policies
- Admin-only access to sensitive data (subscribers, feedback)
- Security definer functions prevent SQL injection
- Proper search_path configuration in database functions

### Authentication Security
- Email redirect URLs configured for secure signup flows
- Password validation and leak protection
- Session management with automatic token refresh
- Role-based access control system

### Admin Access
- Secure admin dashboard at `/admin`
- Admin users can view subscriber lists and trial feedback
- Data export functionality with CSV downloads
- Admin role assignment through secure API

## 📱 Features

### For Learners
- **Interactive Scenarios**: Practice real medical conversations
- **Vocabulary Practice**: Learn medical terms with spaced repetition
- **Progress Tracking**: Monitor learning progress and streaks
- **AI Conversations**: Practice with AI-powered medical scenarios
- **Multi-language Support**: Available in multiple languages

### For Administrators
- **Secure Admin Dashboard**: Access to analytics and user data
- **Subscriber Management**: View and export waitlist subscribers
- **Feedback Analysis**: Review trial user feedback and insights
- **User Role Management**: Promote users to admin status

## 🔧 Configuration

### Supabase Configuration
1. Enable Row Level Security on all tables
2. Configure authentication providers in Supabase dashboard
3. Set up email templates for user registration
4. Add required secrets for AI integrations (OpenAI, ElevenLabs)

### Admin Setup
To create the first admin user:
1. Sign up for an account through the normal registration flow
2. In the Supabase SQL editor, run:
```sql
INSERT INTO public.user_roles (user_id, role) 
VALUES ('your-user-id-here', 'admin');
```

## 🚀 Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred hosting platform:
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **Custom**: Upload the `dist` folder to your web server

3. Configure environment variables in your hosting platform

4. Update Supabase redirect URLs to match your production domain

## 📊 Monitoring

- Authentication events are logged in Supabase
- Admin actions are tracked for audit purposes
- Performance monitoring through browser dev tools
- Error tracking via console logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation in the `/docs` folder
- Review the FAQ section
- Contact the development team

---

**Note**: This application is designed for healthcare professionals learning Medical German. All medical content is for educational purposes only and should not replace professional medical advice.
