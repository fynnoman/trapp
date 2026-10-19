import { HeroMorph } from "./_components/HeroMorph";
import { ServicesPinned } from "./_components/ServicesPinned";
import { Trust } from "./_components/Trust";
import { ProcessPinned } from "./_components/ProcessPinned";
import { Gallery } from "./_components/Gallery";
import { About } from "./_components/About";
import { Faq } from "./_components/Faq";
import { Contact } from "./_components/Contact";

export default function Home() {
  return (
    <>
      <HeroMorph />
      <ServicesPinned />
      <Trust />
      <ProcessPinned />
      <Gallery />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
