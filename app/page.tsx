import About from "@/components/main/About";
import Contact from "@/components/main/Contact";
import Experiences from "@/components/main/Experiences";
import Hero from "@/components/main/Hero";

export default function Home() {
  return (
    <div className="min-h-[300vh]">
      <Hero />
      <About />
      <Experiences />
      <Contact />
    </div>
  );
}
