// Shared Types and Interfaces

export interface ResumeData {
  name: string;
  contact: {
    email: string;
    portfolio: string;
    links: SocialLink[];
  };
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: Skills;
  achievements: Achievement[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface WorkExperience {
  title: string;
  company: string;
  date: string;
  description: string;
  points: string[];
}

export interface Education {
  degree: string;
  institution: string;
  date: string;
  details: string;
}

export interface Project {
  title: string;
  tech: string[];
  description: string;
  points: string[];
  url: string;
  image?: string;
}

export interface Skills {
  programming: string[];
  ai_ml: string[];
  data: string[];
  misc: string[];
  soft: string[];
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  points: string[];
}

// Component Props
export interface NavbarProps {
  currentPage?: 'about' | 'projects' | 'links' | 'resume';
}

export interface TalkButtonProps {
  onClick: () => void;
}

export interface LiveChatModalProps {
  onClose: () => void;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}

export interface SocialCardProps {
  link: SocialLink;
}
