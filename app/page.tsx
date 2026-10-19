import dynamic from "next/dynamic";
import { HeroMorph } from "./_components/HeroMorph";
import { ServicesPinned } from "./_components/ServicesPinned";
import { Trust } from "./_components/Trust";

// Below-fold sections: split into their own JS chunks so the initial bundle
// stays small. SSR is preserved so there is no visible change at render time.
const ProcessPinned = dynamic(() =>
  import("./_components/ProcessPinned").then((m) => ({ default: m.ProcessPinned })),
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
