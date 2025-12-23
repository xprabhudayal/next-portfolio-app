'use client';

import { ArrowDown, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import Footer from '../../components/Footer';
import { RESUME_DATA } from '../../components/constants';

export default function ResumePage() {
  const { workExperience, education, achievements, skills, summary } = RESUME_DATA;

  return (
    <main className="min-h-screen bg-background text-black pt-32">
      <div className="max-w-4xl mx-auto px-6 pb-20">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b-4 border-black pb-8 gap-6">
          <div>
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4">
              RESUME.
            </h1>
            <p className="text-xl font-mono text-neutral-600 bg-primary inline-block px-2 border border-black">
              FULL PROFESSIONAL HISTORY
            </p>
          </div>

          <a href="/resume.pdf" download className="bg-white text-black px-6 py-3 font-bold border-2 border-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-300 ease-snappy flex items-center gap-2 uppercase">
            Download PDF <ArrowDown size={20} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left Column: Summary & Skills */}
          <div className="md:col-span-4 flex flex-col gap-12">
            <section>
              <h3 className="text-2xl font-black uppercase mb-4 border-b-2 border-black pb-2">About</h3>
              <p className="font-mono text-sm leading-relaxed text-neutral-800">
                {summary}
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-black uppercase mb-4 border-b-2 border-black pb-2">Skills</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-sm uppercase mb-2 bg-neutral-100 inline-block px-1">Programming</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.programming.map(skill => (
                      <span key={skill} className="text-xs font-mono border border-black px-2 py-1">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase mb-2 bg-neutral-100 inline-block px-1">AI & ML</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.ai_ml.map(skill => (
                      <span key={skill} className="text-xs font-mono border border-black px-2 py-1">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase mb-2 bg-neutral-100 inline-block px-1">Data</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.data.map(skill => (
                      <span key={skill} className="text-xs font-mono border border-black px-2 py-1">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-black uppercase mb-4 border-b-2 border-black pb-2">Education</h3>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap size={16} />
                    <span className="text-xs font-bold uppercase bg-tertiary px-1 border border-black">{edu.date}</span>
                  </div>
                  <h4 className="font-bold leading-tight mb-1">{edu.degree}</h4>
                  <p className="text-xs font-mono text-neutral-600 mb-1">{edu.institution}</p>
                  <p className="text-xs font-mono text-neutral-500 italic">{edu.details}</p>
                </div>
              ))}
            </section>
          </div>

          {/* Right Column: Experience */}
          <div className="md:col-span-8 flex flex-col gap-12">
            <section>
              <h3 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                <Briefcase className="w-8 h-8" /> Experience
              </h3>

              <div className="space-y-8">
                {workExperience.map((job, idx) => (
                  <div key={idx} className="relative pl-8 border-l-2 border-black group">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-black group-hover:bg-primary transition-colors duration-300" />

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="text-xl font-bold uppercase">{job.title}</h4>
                      <span className="text-xs font-mono font-bold bg-black text-white px-2 py-1">{job.date}</span>
                    </div>
                    <h5 className="text-sm font-bold uppercase text-neutral-600 mb-4">{job.company}</h5>

                    <ul className="list-disc list-inside space-y-2">
                      {job.points.map((point, pIdx) => (
                        <li key={pIdx} className="text-sm font-mono leading-relaxed text-neutral-800">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                <Trophy className="w-8 h-8" /> Achievements
              </h3>

              <div className="space-y-6">
                {achievements.map((item, idx) => (
                  <div key={idx} className="bg-neutral-50 border-2 border-black p-6 neo-shadow hover:bg-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-300 ease-snappy">
                    <h4 className="text-lg font-bold uppercase mb-2">{item.title}</h4>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-mono bg-secondary text-white px-2 py-0.5 border border-black">{item.organization}</span>
                      <span className="text-xs font-mono text-neutral-500">{item.date}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1">
                      {item.points.map((point, pIdx) => (
                        <li key={pIdx} className="text-xs font-mono leading-relaxed">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
