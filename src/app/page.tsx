import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Comparison from "@/components/Comparison";
import PlatformStats from "@/components/PlatformStats";
import ReachTrend from "@/components/ReachTrend";
import DistributionCharts from "@/components/DistributionCharts";
import Services from "@/components/Services";
import SocialProof from "@/components/SocialProof"; // Added this import
import MajorAchievements from "@/components/MajorAchievements";
import TrustProof from "@/components/TrustProof";
import Leadership from "@/components/Leadership";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-white selection:bg-neon-blue selection:text-black">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <Comparison />
      <PlatformStats />
      <ReachTrend />
      <DistributionCharts />
      <section id="services">
        <Services />
      </section>
      <section id="creators">
        <SocialProof />
      </section>
      <section id="case-studies">
        <MajorAchievements />
      </section>
      <TrustProof />
      <section id="about">
        <Leadership />
      </section>

      <Footer />
    </main>
  );
}
