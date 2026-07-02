import HomeHero from '@/components/home/HomeHero';
import HomeFeatureCards from '@/components/home/HomeFeatureCards';
import HomeRoadmap from '@/components/home/HomeRoadmap';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HomeHero />
      <HomeFeatureCards />
      <HomeRoadmap />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            Lebanese Accounting & Payroll SaaS Platform • v0.1.0
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Foundation & Reference Model • Built with Next.js + TypeScript + Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}
