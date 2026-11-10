import PricingSection from "../components/Pricing.jsx";
import Faq from "../components/Faq.jsx";
import { usePageMeta } from "../components/ui.jsx";

export default function Pricing() {
  usePageMeta(
    "Pricing & FAQ — Cris Creatives",
    "Transparent indicative pricing for posters, brand identity, websites and social media management — plus honest answers about revisions, payments and timelines."
  );

  return (
    <>
      <PricingSection />
      <Faq />
    </>
  );
}
