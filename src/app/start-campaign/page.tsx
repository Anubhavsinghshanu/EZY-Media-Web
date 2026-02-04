import MultiStepForm from "@/components/MultiStepForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Start Your Campaign | EZY MEDIA",
    description: "Begin your journey with EZY Media. Fill out the form to kickstart your influencer marketing campaign.",
};

export default function StartCampaignPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-4 relative overflow-hidden">
                {/* Background Ambient */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 w-full">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            START YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CAMPAIGN</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Tell us about your brand and goals. We&apos;ll craft the perfect strategy for you.
                        </p>
                    </div>

                    <MultiStepForm />
                </div>
            </div>

            <Footer />
        </main>
    );
}
