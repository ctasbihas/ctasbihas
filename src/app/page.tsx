import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import TopProjects from "@/components/sections/TopProjects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <TopProjects />
      <Contact />
    </main>
  );
}
