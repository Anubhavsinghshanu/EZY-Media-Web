import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Comparison from "@/components/Comparison";
import PlatformStats from "@/components/PlatformStats";
import ReachTrend from "@/components/ReachTrend";
import DistributionCharts from "@/components/DistributionCharts";
import Services from "@/components/Services";
import SocialProof from "@/components/SocialProof"; // Added this import
import MajorAchievements from "@/components/MajorAchievements";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-neon-blue selection:text-black">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <Comparison />
      <PlatformStats />
      <ReachTrend />
      <DistributionCharts />
      <Services />
      <SocialProof /> {/* Added this component */}
      <MajorAchievements />

      {/* Footer Placeholder */}
      <footer className="py-12 border-t border-white/10 mt-20">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} EZY MEDIA. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
