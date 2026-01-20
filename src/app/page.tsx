import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DemoAppSection from "@/components/DemoAppSection";
import FeaturesSection from "@/components/FeaturesSection";
import MakeOrder from "@/components/MakeOrder";
import PricingSection from "@/components/PricingSection";
import PromoSection from "@/components/PromoSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import ChatbotAI from "@/components/ChatbotAI";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Demo Section */}
      <DemoAppSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Order Section */}
      <MakeOrder />

      {/* Pricing Section */}
      <PricingSection />

      {/* Promo Section */}
      <PromoSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Footer */}
      <Footer />

      {/* Chatbot AI */}
      <ChatbotAI />
    </main>
  );
}