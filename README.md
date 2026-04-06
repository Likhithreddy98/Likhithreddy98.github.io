# Scroll-Driven Animation

A sophisticated, interactive React application demonstrating high-performance scroll-driven animations. This project features a stunning hero section that animates text, imagery, and data metrics based on the user's scroll position, creating a highly engaging and dynamic user experience.

## Features

- **GSAP ScrollTrigger:** Smooth and performant animations intricately tied to the scrollbar.
- **Dynamic Element Revealing:** Staggered opacity and positional animations for text, imagery, and statistic cards.
- **Visuals:** Integrates engaging visual assets seamlessly into the scrolling animation flow.
- **Responsive Design:** Optimized for various screen sizes, ensuring the animation looks great on desktop and mobile alike.
- **Modern Tech Stack:** Built with Vite, React, and Tailwind CSS for rapid development and styling.

## Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v4)
- **Animation:** GSAP (GreenSock Animation Platform) & ScrollTrigger plugin

## Project Setup

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Install the dependencies:

```bash
npm install
```

### Running the Development Server

To start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Then, open your browser and visit `http://localhost:5173` (or the port specified in your terminal).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. You can preview the production build locally using:

```bash
npm run preview
```

## Structure

- `src/App.jsx` - The main application component holding the structure.
- `src/components/HeroSection.jsx` - The core component containing the GSAP scroll animations and UI elements.
- `src/App.css` / `index.css` - Global styling and specific CSS classes for the animations.

## Linting

This project uses ESLint for code quality. To run the linter:

```bash
npm run lint
```
