import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";

// Dynamic imports for below-fold components
const About = dynamic(() => import("@/components/sections/About").then((mod) => ({ default: mod.About })), {
  loading: () => <div className="section min-h-[400px]" />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((mod) => ({ default: mod.Testimonials })), {
  loading: () => <div className="section min-h-[400px]" />,
});

const Contact = dynamic(() => import("@/components/sections/Contact").then((mod) => ({ default: mod.Contact })), {
  loading: () => <div className="section min-h-[400px]" />,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Services />
      <Process />
      <About />
      <Testimonials />
      <Contact />
      {/* Other sections will go here */}
    </>
  );
}
