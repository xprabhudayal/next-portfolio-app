import { ResumeData } from '../types';
import { Github, Linkedin, Code2, Instagram, Mail } from 'lucide-react';

export const RESUME_DATA: ResumeData = {
  name: "Prabhudayal Vaishnav",
  contact: {
    email: "p09m21@gmail.com",
    portfolio: "https://github.com/xprabhudayal/next-portfolio-app/",
    links: [
      { name: "GitHub", url: "https://github.com/xprabhudayal", icon: Github },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/xprabhudayal", icon: Linkedin },
      { name: "LeetCode", url: "https://leetcode.com/u/global-prada", icon: Code2 },
      { name: "Instagram", url: "https://www.instagram.com/x.p09m21/", icon: Instagram },
      { name: "Email", url: "mailto:p09m21@gmail.com", icon: Mail },
    ],
  },
  summary: "A proactive and innovative AI Engineer and full-stack developer with a strong foundation in Computer Science and a specialization in Data Science. Passionate about building intelligent systems, contributing to open-source projects, and solving complex problems with cutting-edge technologies like LangGraph, PyTorch, and Next.js.",
  workExperience: [
    {
      title: "Research Internship",
      company: "ESIEA Paris, France (Remote)",
      date: "January 2025 - June 2025",
      description: "Facial Emotion Recognition Using Advanced YOLO Architectures.",
      points: [
        "Achieved 93.4% mAP@0.5 using dual YOLO frameworks (YOLOv12 + YOLOv11) for 22-class facial emotion recognition on CFEE dataset.",
        "Implemented automated annotation pipeline reducing manual effort by 90% and fine-tuned models via transfer learning from MS COCO pre-trained weights."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelors of Technology (Hons.) CSE Data Science",
      institution: "Chhattisgarh Swami Vivekanand Technical University, Bhilai",
      date: "2022-Present",
      details: "7th Semester - CGPA: 8.6/10"
    }
  ],
  projects: [
    {
      title: "Grand Plaza: Voice AI Hotel Concierge System",
      tech: ["FastAPI", "LangGraph", "Pipecat", "ChromaDB"],
      description: "Built a full-stack voice AI concierge achieving 88% accuracy in menu query understanding.",
      points: [
        "Architected a multi-strategy RAG system achieving 88% query accuracy, outperforming naive RAG by 4.8% through semantic search and Chain-of-Thought.",
        "Implemented LangGraph-based agent workflows with 5+ specialized nodes, reducing errors by 15%.",
      ],
      url: "https://github.com/xprabhudayal/grand-plaza",
      image: "/images/projects/grand-plaza.png"
    },
    {
      title: "Career Scout: Voice AI-Powered Job Search Assistant",
      tech: ["Next.js", "React", "Supabase", "MCP Server"],
      description: "Developed a full-stack Voice AI Career Coach for smart job search.",
      points: [
        "Architected a custom MCP server with 3 tools: Intelligent Job Search, Company Analysis, and Web Search.",
        "Integrated custom scoring logic to match user skills with confidence percentages.",
        "Built a responsive, Supabase-authenticated frontend with React hooks, reducing voice interaction latency by 40%."
      ],
      url: "https://github.com/xprabhudayal/career-scout",
      image: "/images/projects/career-scout.png"
    },
    {
      title: "The AI Scientist: Sakana AI Contributor",
      tech: ["Python", "LLMs", "Transformers", "Git"],
      description: "Contributed to Sakana AI's Open Source project to automate scientific research.",
      points: [
        "Added 8 open-source language models, achieving a 75% reduction in generation costs.",
        "Adapted the project for T4 GPU support, reducing reliance on high-end GPUs.",
        "Co-authored a paper: 'Exploring Style Transfer with Small Character-Level Transformers' using Qwen2.5(72B)."
      ],
      url: "https://github.com/xprabhudayal/sakana-ai-contribution",
      image: "/images/projects/sakana-ai.png"
    },
    {
      title: "XS Python: Module & API Creation",
      tech: ["Python", "Ngrok", "PyPI"],
      description: "Published a pip package to expose inference endpoints for open-source LLMs.",
      points: [
        "Released a Python package to create accessible endpoints for over 99% of Hugging Face-hosted LLMs.",
        "Leveraged Ngrok to tunnel requests from localhost to the cloud securely."
      ],
      url: "https://github.com/xprabhudayal/xs-python",
      image: "/images/projects/xs-module.webp"
    },
    {
      title: "XGen-AI: RAG Telegram Bot",
      tech: ["Python", "Meta LLAMA 3.1", "RAG", "Telegram API"],
      description: "A RAG-based Telegram Bot allowing users to chat with their documents privately.",
      points: [
        "Integrated Meta LLAMA 3.1 for document-based Q&A through Telegram.",
        "Implemented document processing pipeline for PDFs.",
      ],
      url: "https://github.com/xprabhudayal/xgen-ai",
      image: "/images/projects/xgen-ai.webp"
    },
    {
      title: "XAdmin: Remote Access Bot",
      tech: ["Python", "Telegram Bot API", "Windows CMD"],
      description: "A Telegram Bot providing remote shell access to host PC.",
      points: [
        "Built remote shell access via Telegram without SSH/RDP dependencies.",
        "Implemented screenshot capture, file sharing, and IP extraction features."
      ],
      url: "https://github.com/xprabhudayal/xadmin",
      image: "/images/projects/xadmin.webp"
    },
    {
      title: "xFace: Emotion Detection Bot",
      tech: ["Python", "OpenCV", "Telegram API", "Deep Learning"],
      description: "A Telegram bot detecting face emotions from images.",
      points: [
        "Implemented real-time face emotion detection using deep learning models.",
        "Supported document-based and URL-based detection modes."
      ],
      url: "https://github.com/xprabhudayal/xface",
      image: "/images/projects/xface.webp"
    },
    {
      title: "MetroCart: E-Commerce Website",
      tech: ["HTML", "CSS", "JavaScript"],
      description: "An e-commerce website providing minimalistic user experience.",
      points: [
        "Built with pure HTML, CSS, and minimal JavaScript for performance.",
        "Designed acrylic navigation bar inspired by Apple's design language."
      ],
      url: "https://github.com/xprabhudayal/MetroCart",
      image: "/images/projects/metrocart.webp"
    },
  ],
  skills: {
    programming: ["Python", "Next.js", "React", "JavaScript", "C/C++", "SQL", "Matlab", "R"],
    ai_ml: ["LangGraph", "LangChain", "LlamaIndex", "Ollama", "Transformers", "PyTorch", "TensorFlow", "Pipecat"],
    data: ["Pandas", "Numpy", "Seaborn", "Power BI"],
    misc: ["Linux", "MacOS", "Competitive Programming"],
    soft: ["Leadership", "Communication", "Problem Solving"]
  },
  achievements: [
    {
      title: "IIM Nagpur Data Analyst Hackathon Winner",
      organization: "InFED at Nagpur",
      date: "Nov 2024",
      points: [
        "Won 1st place by presenting a solution to the Startup's Problem: AI Product Comparison.",
        "Implemented Deep-Research agent generating a 22-page report, reducing manual effort by 90%."
      ]
    },
    {
      title: "HackLLM 2025 @ IIIT Delhi - 3rd Place",
      organization: "IIIT Delhi (Esya'25)",
      date: "Aug 2025",
      points: [
        "Built production-ready medical AI summarization system generating dual-perspective outputs.",
        "Secured top-3 finish among 80+ teams without external APIs."
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
