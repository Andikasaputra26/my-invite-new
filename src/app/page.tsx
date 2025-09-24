import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import PromoSection from "@/components/PromoSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import MakeOrder from "@/components/MakeOrder";
import DemoAppSection from "@/components/DemoAppSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar/>
      <HeroSection />
      <DemoAppSection />
      <FeaturesSection />
      <MakeOrder />
      <PricingSection />
      <PromoSection />
      <TestimonialSection />
      <Footer />
    </main>
  );
}
