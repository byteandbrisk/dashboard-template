# Admin Pro - Next.js Frontend

Modern admin dashboard built with Next.js 14, TypeScript, Tailwind CSS, and Radix UI.

## 🚀 Features

- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **Radix UI** for accessible components
- ✅ **Recharts** for data visualization
- ✅ **Lucide Icons** for beautiful icons
- ✅ **Dark Mode** support with next-themes
- ✅ **Form Handling** with react-hook-form
- ✅ **Responsive Design** for all screen sizes

## 📦 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **Form**: React Hook Form
- **State**: React Hooks
- **Theme**: next-themes

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
front-end/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── auth/           # Authentication pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── pages/          # Page components
│   │   ├── ui/             # Reusable UI components
│   │   ├── Layout.tsx      # Main layout with sidebar
│   │   └── ...             # Other components
│   └── lib/                # Utility functions
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── next.config.ts          # Next.js configuration
└── package.json            # Dependencies
```

## 🎨 Available Pages

- **Dashboard** - E-commerce analytics and KPIs
- **IoT Dashboard** - Smart home device monitoring
- **Tables** - Data tables with CRUD operations
- **Forms** - Form components and layouts
- **Charts** - Various chart types
- **Maps** - Map integrations
- **Components** - UI component showcase
- **Settings** - User settings and preferences
- **Auth** - Login and registration

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Customization

- **Colors**: Edit CSS variables in `src/app/globals.css`
- **Theme**: Modify `tailwind.config.ts`
- **Components**: All components are in `src/components/`

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

## 🎯 Next Steps

1. **Backend Integration**
   - Connect to backend API
   - Replace mock data with real data
   - Add authentication

2. **Additional Features**
   - Complete remaining pages
   - Add more chart types
   - Implement data tables
   - Add map integrations

3. **Testing**
   - Add unit tests
   - Add E2E tests with Playwright
   - Add integration tests

4. **Deployment**
   - Deploy to Vercel/Netlify
   - Set up CI/CD
   - Configure environment variables

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Recharts](https://recharts.org/)

## 🤝 Contributing

Contributions are welcome! Please follow the coding standards and submit pull requests.

## 📄 License

MIT License - feel free to use this project for your own purposes.
