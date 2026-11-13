import { Hero } from "@/components/home/hero";
import { Stories } from "@/components/home/stories";
import { Program } from "@/components/home/program";
import { Why } from "@/components/home/why";
import { Tools } from "@/components/home/tools";
import { Testimonials } from "@/components/home/testimonials";
import { LatestPosts } from "@/components/home/latest-posts";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stories />
      <Program />
      <Why />
      <Tools />
      <Testimonials />
      <LatestPosts />
      <Pricing />
      <Faq />
      <Contact />
    </main>
  );
}
