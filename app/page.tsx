import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import ReviewGallery from "@/components/ReviewGallery";
import ContactSection from "@/components/ContactSection";
import BottomNav from "@/components/BottomNav";

export default function Home() {
  return (
    <main className="bg-zinc-50 overflow-x-hidden pb-20 md:pb-0">
      <Navbar />
      <HeroSection />
      <div id="products">
        <ProductCatalog />
      </div>
      <div id="reviews">
        <ReviewGallery />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <footer className="border-t border-zinc-200 bg-white py-8 text-center text-zinc-500 text-sm font-body">
        <p>© {new Date().getFullYear()} Spacer Azerbaijan. Bütün hüquqlar qorunur.</p>
        <p className="mt-1">Əliyar Əliyev 25, Bakı, Azərbaycan</p>
      </footer>
      <BottomNav />
    </main>
  );
}
