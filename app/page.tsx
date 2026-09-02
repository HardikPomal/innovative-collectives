import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import BrandMarquee from "@/components/home/BrandMarquee";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoSection from "@/components/home/PromoSection";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <BrandMarquee />
      <CategoryGrid />
      <FeaturedProducts />
      <Testimonials />
      <PromoSection />
      <CTABanner />
    </main>
  );
}