# Portfolio Website

A modern, sophisticated portfolio website showcasing skills and innovative GenAI/LLM projects. Built with React, Vite, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 **Modern Design** - Sleek, sophisticated UI with glassmorphism effects
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎭 **Smooth Animations** - Beautiful transitions powered by Framer Motion
- 📱 **Fully Responsive** - Looks great on all devices
- 🌙 **Dark Theme** - Elegant dark color scheme optimized for readability
- 🎯 **SEO Optimized** - Proper meta tags and semantic HTML

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

Preview the production build:
```bash
npm run preview
```

## 🔗 GitHub Integration

The Statistics Dashboard automatically fetches real data from your GitHub profile!

### Setup

1. **Default Setup (No Token Required)**
   - The component uses your GitHub username (`srikark283`) by default
   - Works with public repositories
   - Rate limit: 60 requests/hour (usually sufficient)

2. **Optional: Add GitHub Token (Recommended)**
   - Create a `.env` file in the root directory
   - Add your GitHub Personal Access Token:
     ```
     VITE_GITHUB_TOKEN=your_token_here
     VITE_GITHUB_USERNAME=srikark283
     ```
   - Get a token at: https://github.com/settings/tokens
   - Only needs `public_repo` scope for public repositories
   - Rate limit with token: 5,000 requests/hour

3. **Update GitHub Username**
   - Edit `GITHUB_USERNAME` in `src/components/Statistics.tsx`
   - Or use the `VITE_GITHUB_USERNAME` environment variable

### What Data is Fetched?

- ✅ **Total Repositories** - Count of all public repos
- ✅ **Total Stars** - Sum of stars across all repositories
- ✅ **Technologies** - Unique programming languages used
- ⚠️ **Contributions** - Requires GitHub GraphQL API with token (currently shows placeholder)

### Caching

GitHub data is cached for 5 minutes to reduce API calls and improve performance.

## 🎨 Customization

### Update Your Information

1. **Hero Section** (`src/components/Hero.tsx`):
   - Update the tagline and description
   - Modify the call-to-action buttons

2. **About Section** (`src/components/About.tsx`):
   - Add your bio and background
   - Update the feature cards

3. **Skills Section** (`src/components/Skills.tsx`):
   - Add/remove skill categories
   - Update technologies you work with

4. **Projects Section** (`src/components/Projects.tsx`):
   - Add your projects to the `projects` array
   - Update GitHub and demo URLs
   - Add project descriptions and technologies

5. **Contact Section** (`src/components/Contact.tsx`):
   - Update social media links
   - Modify the contact form (you'll need to add backend integration)

6. **Navbar** (`src/components/Navbar.tsx`):
   - Update the portfolio name/logo

### Styling

- Colors: Edit `tailwind.config.js` to customize the color scheme
- Fonts: Change fonts in `index.html` and `tailwind.config.js`
- Animations: Modify animation timings in component files

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 📝 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx      # Navigation bar
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills showcase
│   ├── Projects.tsx    # Projects gallery
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Vite and deploy

### Other Platforms

The site can be deployed to any platform that supports static sites:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

Built with ❤️ using React, Vite, and Tailwind CSS
