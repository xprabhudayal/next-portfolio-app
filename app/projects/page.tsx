
import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Showcase of AI and Full Stack projects by Prabhudayal Vaishnav.',
  openGraph: {
    title: 'Projects // PRABHUDAYAL VAISHNAV',
    description: 'Showcase of AI and Full Stack projects by Prabhudayal Vaishnav.',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
