# Portfolio v2 - Prabhudayal Vaishnav

A modern, AI-integrated portfolio website built with Next.js 15, TypeScript, and Three.js, featuring Apple-inspired design language and real-time voice AI capabilities.

## Features

- **Apple-Inspired Design**: Clean, minimalistic interface with SF Pro Display font, glassmorphism effects, and Apple's dark mode color palette
- **3D Interactive Lanyard**: Draggable 3D lanyard card on the home page using Three.js and React Three Fiber
- **Real-time Voice AI**: Chat with an AI assistant about me using Google Gemini's live speech API
- **Non-Scrollable Pages**: Each page is a full-viewport experience with smooth transitions
- **Asymmetric Project Carousel**: Showcase projects with a dynamic, visually appealing layout
- **Liquid Glass Effects**: Social links page with beautiful glassmorphism cards
- **Resume Download**: Direct PDF download functionality

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Apple design tokens
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei, Rapier (physics)
- **AI Integration**: Google Gemini AI (@google/genai) for live voice conversations
- **Icons**: Lucide React
- **Package Manager**: Bun

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with Navbar and AI button
│   ├── page.tsx           # Home page with 3D lanyard
│   ├── projects/          # Projects showcase page
│   ├── links/             # Social links page
│   └── resume/            # Resume download page
├── components/            # React components
│   ├── Navbar.tsx         # Glassmorphism navigation bar
│   ├── TalkAboutMeButton.tsx  # Fixed AI chat button
│   ├── LiveChatModal.tsx  # Real-time voice chat modal
│   ├── DraggableLanyard.tsx   # 3D lanyard component
│   ├── Icons.tsx          # Lucide icon wrappers
│   └── constants.ts       # Resume data and configurations
├── services/              # Business logic
│   └── geminiService.ts   # Google Gemini AI integration
├── types/                 # TypeScript type definitions
│   ├── index.ts           # Shared types
│   ├── google-genai.d.ts  # Gemini AI types
│   └── three.d.ts         # Three.js extension types
├── public/                # Static assets
│   ├── fonts/             # SF Pro Display fonts
│   ├── docs/              # Project images and resume PDF
│   ├── lanyard.glb        # 3D model
│   └── band.jpg           # Lanyard texture
└── tailwind.config.js     # Tailwind with Apple design tokens
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/xprabhudayal/next-portfolio-app.git
cd next-portfolio-app
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your Google Gemini API key
```

4. Run the development server:
```bash
bun dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the portfolio

## Build

To create a production build:

```bash
bun run build
# or
npm run build
```

To start the production server:

```bash
bun start
# or
npm start
```

## Design Philosophy

This portfolio follows Apple's Human Interface Guidelines with:
- **SF Pro Display** typography
- **Dark mode first** approach
- **Glassmorphism** and liquid glass effects
- **Subtle animations** and smooth transitions
- **Minimal color palette** with accent colors (purple, blue)
- **Non-scrollable** single-page experiences

## Pages

- **About (/)**: Landing page with interactive 3D lanyard
- **/projects**: Asymmetric grid showcasing 7 major projects
- **/links**: Social media and contact links with liquid glass cards
- **/resume**: Resume download page with preview information

## AI Voice Feature

The "Talk about Me" button (fixed bottom-right) opens a real-time voice chat powered by Google Gemini. The AI can:
- Answer questions about my experience, projects, and skills
- Provide detailed project information
- Support multilingual conversations
- Use Google Search for general questions

## Projects Included

1. **Grand Plaza**: Voice AI Hotel Concierge System (FastAPI, LangGraph, WebRTC)
2. **Career Scout**: Voice AI Job Search Assistant (Next.js, Supabase)
3. **The AI Scientist**: Sakana AI Open Source Contribution (Python, LLMs)
4. **XGen-AI**: RAG Telegram Bot (Python, Meta LLAMA 3.1)
5. **XAdmin**: Remote Access Bot (Python, Telegram API)
6. **xFace**: Emotion Detection Bot (Python, OpenCV)
7. **MetroCart**: E-Commerce Website (HTML, CSS, JavaScript)

## Contributing

This is a personal portfolio project, but feel free to fork it and adapt it for your own use!

## License

MIT

## Contact

- **GitHub**: [xprabhudayal](https://github.com/xprabhudayal)
- **LinkedIn**: [xprabhudayal](https://www.linkedin.com/in/xprabhudayal)
- **Email**: p09m21@gmail.com

---

Built with 💖 using Next.js, TypeScript, and Three.js
