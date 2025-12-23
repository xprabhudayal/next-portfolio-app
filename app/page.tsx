'use client';

import Footer from "@/components/Footer";
import { RESUME_DATA } from "@/components/constants";
import { ArrowRight, Trophy, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import ProfileCard from "@/components/ProfileCard";

export default function HomePage() {
  const { achievements, workExperience } = RESUME_DATA;

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Brutalist Hero */}
      <div className="relative bg-background border-b-4 border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-24">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

            {/* Left: Text Content */}
            <div className="flex-1">
              <div className="inline-block bg-primary border-2 border-border text-primary-foreground px-6 py-2 font-black text-sm mb-8 neo-shadow rotate-[-2deg] hover:rotate-0 transition-transform cursor-default">
                ● AVAILABLE FOR WORK
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
                PRABHUDAYAL<br />VAISHNAV.
              </h1>
              <div className="max-w-2xl border-l-[6px] border-primary pl-6 ml-2">
                <p className="text-xl md:text-2xl font-mono leading-tight">
                  AI Engineer & Full-Stack Developer.<br />
                  Building <span className="bg-primary text-primary-foreground px-1 border border-border">INTELLIGENT SYSTEMS</span> causing chaos in the best way possible.
                </p>
              </div>
            </div>

            {/* Right: Profile Card */}
            <div className="lg:flex-shrink-0">
              <ProfileCard
                imageSrc="/profile-photo.jpg"
                name="PDV"
                role="AI ENGINEER"
                className="w-64 md:w-72 lg:w-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="mb-12 flex justify-between items-end border-b-4 border-border pb-4">
          <h2 className="text-5xl font-black uppercase">
            Highlights
          </h2>
          <Link href="/projects" className="hidden md:flex items-center gap-2 font-bold hover:bg-foreground hover:text-background px-4 py-2 border-2 border-transparent hover:border-border transition-all uppercase">
            View All Projects <ArrowRight size={24} />
          </Link>
        </div>

        <div className="relative">
          <BentoGrid>
            {/* Work Experience */}
            {workExperience.map((job, idx) => (
              <BentoGridItem
                key={`job-${idx}`}
                title={job.title}
                description={
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">{job.company}</span>
                    <span className="text-xs text-muted-foreground">{job.date}</span>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {job.points.slice(0, 2).map((pt, i) => (
                        <li key={i} className="text-xs truncate">{pt}</li>
                      ))}
                    </ul>
                  </div>
                }
                header={<div className="h-4 bg-muted rounded-sm mb-2 w-1/3 animate-pulse" />}
                icon={<Briefcase className="h-6 w-6 text-primary-foreground" />}
                className={idx === 0 ? "md:col-span-2" : ""}
              />
            ))}

            {/* Achievements */}
            {achievements.map((award, idx) => (
              <BentoGridItem
                key={`award-${idx}`}
                title={award.title}
                description={
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">{award.organization}</span>
                    <span className="text-xs text-muted-foreground">{award.date}</span>
                  </div>
                }
                icon={<Trophy className="h-6 w-6 text-primary-foreground" />}
              />
            ))}
          </BentoGrid>
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/projects" className="neo-button w-full text-center">
            VIEW ALL PROJECTS
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
