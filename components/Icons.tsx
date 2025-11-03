import {
  Github,
  Linkedin,
  Mail,
  Phone,
  X,
  Mic,
  Volume2,
  Code2,
  Instagram,
  type LucideIcon,
} from 'lucide-react';

interface IconProps {
  className?: string;
}

export const GitHubIcon = ({ className }: IconProps) => (
  <Github className={className} />
);

export const LinkedInIcon = ({ className }: IconProps) => (
  <Linkedin className={className} />
);

export const MailIcon = ({ className }: IconProps) => (
  <Mail className={className} />
);

export const PhoneIcon = ({ className }: IconProps) => (
  <Phone className={className} />
);

export const XIcon = ({ className }: IconProps) => (
  <X className={className} />
);

export const MicIcon = ({ className }: IconProps) => (
  <Mic className={className} />
);

export const Volume2Icon = ({ className }: IconProps) => (
  <Volume2 className={className} />
);

export const LeetCodeIcon = ({ className }: IconProps) => (
  <Code2 className={className} />
);

export const InstagramIcon = ({ className }: IconProps) => (
  <Instagram className={className} />
);

// Export the type for use in other components
export type { LucideIcon, IconProps };
