import dynamic from "next/dynamic";
import { HeroMorph } from "./_components/HeroMorph";
import { Manifest } from "./_components/Manifest";
import { BrandPromise } from "./_components/BrandPromise";
import { ServicesPinned } from "./_components/ServicesPinned";
import { Trust } from "./_components/Trust";

const ProcessPinned = dynamic(() =>
  import("./_components/ProcessPinned").then((m) => ({ default: m.ProcessPinned })),
);
const Values = dynamic(() =>
  import("./_components/Values").then((m) => ({ default: m.Values })),
);
const Gallery = dynamic(() =>
  import("./_components/Gallery").then((m) => ({ default: m.Gallery })),
);
const About = dynamic(() =>
  import("./_components/About").then((m) => ({ default: m.About })),
);
const Faq = dynamic(() =>
  import("./_components/Faq").then((m) => ({ default: m.Faq })),
);
const Contact = dynamic(() =>
  import("./_components/Contact").then((m) => ({ default: m.Contact })),
);

export default function Home() {
  return (
    <>
      <HeroMorph />
      <Manifest />
      <BrandPromise />
      <ServicesPinned />
      <Trust />
      <ProcessPinned />
      <Values />
      <Gallery />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
