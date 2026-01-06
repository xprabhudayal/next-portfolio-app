
import type { Metadata } from 'next';
import ResumeClient from './ResumeClient';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Professional history, skills, and experience of Prabhudayal Vaishnav.',
  openGraph: {
    title: 'Resume // PRABHUDAYAL VAISHNAV',
    description: 'Professional history, skills, and experience of Prabhudayal Vaishnav.',
  },
};

export default function ResumePage() {
  return <ResumeClient />;
}
