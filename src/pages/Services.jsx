import ServicesSection from "../components/Services.jsx";
import Industries from "../components/Industries.jsx";
import { usePageMeta } from "../components/ui.jsx";

export default function Services() {
  usePageMeta(
    "Services — Cris Creatives",
    "Poster design, brand identity, video and digital content, websites and social media management — integrated creative support from Murang'a, Kenya."
  );

  return (
    <>
      <ServicesSection />
      <Industries />
    </>
  );
}
