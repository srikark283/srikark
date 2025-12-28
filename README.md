# Srikar K. - AI Engineering Portfolio

A modern, responsive portfolio website showcasing expertise in AI Engineering, Data Architecture, and Full-Stack Development. Built with React, TypeScript, and Vite.

## 🚀 Live Demo

[View Live Site](#) *(Add your deployment URL here)*

## ✨ Features

- **Modern UI/UX**: Clean, minimalist design with smooth animations using Framer Motion.
- **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop.
- **Interactive Elements**:
  - Animated hero section with meteor effects.
  - Sticky navbar with active section highlighting.
  - Project detail modals with rich content.
  - Skill visualization with categorized badges.
- **Performance Optimized**: Fast loading times and optimized assets.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **Animations**: Framer Motion, Motion (for React)
- **Icons**: Lucide React
- **Package Manager**: npm

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components (Shadcn)
│   ├── Hero.tsx       # Hero section with meteor animation
│   ├── About.tsx      # About Me section
│   ├── Skills.tsx     # Technical skills showcase
│   ├── Projects.tsx   # Project portfolio grid
│   ├── Statistics.tsx # Impact metrics
│   ├── Contact.tsx    # Contact information
│   ├── Navbar.tsx     # Responsive navigation
│   └── Footer.tsx     # Site footer
├── lib/               # Utility functions
├── services/          # External services (e.g., GitHub API)
└── index.css          # Global styles & Tailwind config
```

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/my_portfolio.git
    cd my_portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 🎨 Customization

- **Theme**: Update colors and styles in `src/index.css` (using Tailwind CSS variables).
- **Content**: Update personal information and text in the respective component files within `src/components/`.
- **Projects**: Add or modify projects in `src/components/Projects.tsx`.

## 📄 License

MIT License - feel free to use this code for your own portfolio!
