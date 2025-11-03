import { ResumeData } from '../types';
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, MailIcon, InstagramIcon } from './Icons';

export const RESUME_DATA: ResumeData = {
  name: "Prabhudayal Vaishnav",
  contact: {
    email: "p09m21@gmail.com",
    portfolio: "https://github.com/xprabhudayal/next-portfolio-app/",
    links: [
      { name: "GitHub", url: "https://github.com/xprabhudayal", icon: GitHubIcon },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/xprabhudayal", icon: LinkedInIcon },
      { name: "LeetCode", url: "https://leetcode.com/u/global-prada", icon: LeetCodeIcon },
      { name: "Instagram", url: "https://www.instagram.com/x.p09m21/", icon: InstagramIcon },
      { name: "Email", url: "mailto:p09m21@gmail.com", icon: MailIcon },
    ],
  },
  summary: "A proactive and innovative AI Engineer and full-stack developer with a strong foundation in Computer Science and a specialization in Data Science. Passionate about building intelligent systems, contributing to open-source projects, and solving complex problems with cutting-edge technologies like LangGraph, PyTorch, and Next.js. Proven ability to architect and implement robust AI-powered applications, from voice-based concierge systems to career coaching tools.",
  workExperience: [
    {
      title: "Research Internship",
      company: "ESIEA Paris, France (Remote)",
      date: "January 2025 - June 2025",
      description: "Completed research on 'Complex Human Emotion Detection Using YOLO11' project.",
      points: [
        "Enabled real-time detection of 22 discrete human emotions by training on the CFEE dataset using YOLO11.",
        "Fine-tuned YOLO11 (COCO-pretrained) using transfer learning for real-time emotion detection."
      ]
    }
  ],
  education: [
    {
        degree: "Bachelors of Technology (Hons.) CSE Data Science",
        institution: "Chhattisgarh Swami Vivekanand Technical University, Bhilai",
        date: "2022-Present",
        details: "6th Semester - CGPA: 7.2/10"
    }
  ],
  projects: [
    {
      title: "Grand Plaza: Voice AI Hotel Concierge System",
      tech: ["FastAPI", "LangGraph", "Pipecat", "WebRTC"],
      description: "Built a full-stack voice AI concierge achieving 88% accuracy in menu query understanding.",
      points: [
        "Architected a multi-strategy RAG system achieving 88% query accuracy, outperforming naive RAG by 4.8%.",
        "Implemented LangGraph-based agent workflows with 5+ specialized nodes, reducing conversation errors by 15%.",
        "Integrated real-time multi-modal pipeline for 100+ concurrent voice sessions with sub-200ms latency.",
        "Built WebRTC communication system supporting seamless voice interactions with 99.5% uptime."
      ],
      url: "https://github.com/xprabhudayal/grand-plaza",
      image: "/docs/win.jpg"
    },
    {
      title: "Career Scout: Voice AI-Powered Job Search Assistant",
      tech: ["Next.js", "React", "Supabase", "TypeScript"],
      description: "Developed a full-stack Voice AI Career Coach for smart job search.",
      points: [
        "Architected a custom MCP server with 3 tools: Intelligent Job Search, Company Analysis, and Web Search.",
        "Integrated custom scoring logic to match user skills with confidence percentages.",
        "Built a responsive, Supabase-authenticated frontend with React hooks and Tailwind CSS, reducing latency by 40%."
      ],
      url: "https://github.com/xprabhudayal/career-scout",
    },
    {
      title: "The AI Scientist: Sakana AI Contributor",
      tech: ["Python", "LLMs", "Transformers", "Git"],
      description: "Contributed to Sakana AI's Open Source project to automate scientific research.",
      points: [
        "Added 8 open-source language models, achieving a 75% reduction in generation costs.",
        "Adapted the project for T4 GPU support, reducing reliance on high-end GPUs like H100/A100.",
        "Co-authored a paper: 'Exploring Style Transfer with Small Character-Level Transformers'."
      ],
      url: "https://github.com/xprabhudayal/sakana-ai-contribution",
    },
    {
      title: "XGen-AI: RAG Telegram Bot",
      tech: ["Python", "Meta LLAMA 3.1", "RAG", "Telegram API"],
      description: "A RAG-based Telegram Bot allowing users to chat with their documents privately.",
      points: [
        "Integrated Meta LLAMA 3.1 for document-based Q&A through Telegram.",
        "Implemented document processing pipeline for PDFs with query prefix system.",
        "Built typing indicators and custom greetings for enhanced UX."
      ],
      url: "https://github.com/xprabhudayal/xgen-ai",
      image: "/docs/xgenai.webp"
    },
    {
      title: "XAdmin: Remote Access Bot",
      tech: ["Python", "Telegram Bot API", "Windows CMD"],
      description: "A Telegram Bot providing remote shell access to host PC.",
      points: [
        "Built remote shell access via Telegram without SSH/RDP dependencies.",
        "Implemented screenshot capture, file sharing, and IP extraction features.",
        "Created disk and file listing capabilities through bot commands."
      ],
      url: "https://github.com/xprabhudayal/xadmin",
      image: "/docs/xadmin.webp"
    },
    {
      title: "xFace: Emotion Detection Bot",
      tech: ["Python", "OpenCV", "Telegram API", "Deep Learning"],
      description: "A Telegram bot detecting face emotions from images.",
      points: [
        "Implemented real-time face emotion detection using deep learning models.",
        "Supported document-based and URL-based detection modes.",
        "Deployed on Telegram with seamless image processing pipeline."
      ],
      url: "https://github.com/xprabhudayal/xface",
      image: "/docs/xface.webp"
    },
    {
      title: "MetroCart: E-Commerce Website",
      tech: ["HTML", "CSS", "JavaScript"],
      description: "An e-commerce website providing minimalistic user experience inspired by Amazon.",
      points: [
        "Built with pure HTML, CSS, and minimal JavaScript for performance.",
        "Designed acrylic navigation bar inspired by Apple's design language.",
        "Implemented cart and orders page with clean UI/UX."
      ],
      url: "https://github.com/xprabhudayal/MetroCart",
      image: "/docs/metrocart.webp"
    },
  ],
  skills: {
    programming: ["Python", "Next.js", "React", "JavaScript", "C++", "SQL"],
    ai_ml: ["LangGraph", "LangChain", "LlamaIndex", "HuggingFace Transformers", "PyTorch", "TensorFlow", "Pipecat"],
    data: ["Pandas", "Numpy", "Seaborn", "Power BI"],
    misc: ["Linux", "MacOS", "Competitive Programming"],
    soft: ["Leadership", "Communication", "Problem Solving", "Teamwork"]
  },
  achievements: [
    {
        title: "Indian Institute of Management (Data Analyst) Hackathon Winner",
        organization: "InFED at Nagpur",
        date: "2024",
        points: [
            "Won 1st place by presenting a solution to the Startup's Problem: AI Product Comparison.",
            "Implemented a Deep-Research agent using a Python-based Al Agent with Tavily Search, reducing manual effort by 90%."
        ]
    }
  ],
};


export const SYSTEM_INSTRUCTION = `You are a friendly, professional, and conversational AI assistant representing Prabhudayal Vaishnav. Your purpose is to answer questions about him based on his resume. Be engaging and informative. Do not go off-topic. If asked about something not on the resume, politely state that you only have information from his professional portfolio.

Here is Prabhudayal's resume data in JSON format:
${JSON.stringify(RESUME_DATA, null, 2)}

Some guidelines:
- When asked about projects, briefly describe the project and highlight one or two key achievements or technologies used.
- When asked about skills, mention his key areas of expertise like AI/ML, full-stack development, and specific frameworks.
- When asked about his experience, talk about his research internship and what he accomplished.
- Keep your answers concise but comprehensive.
- Your voice should be friendly and enthusiastic.
- If the user asks a general knowledge question or something about a very recent event, you can use your search tool to find an answer, but always bring the conversation back to Prabhudayal if possible.`;
