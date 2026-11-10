import Portfolio from "../components/Portfolio.jsx";
import { usePageMeta } from "../components/ui.jsx";

export default function Work() {
  usePageMeta(
    "Selected Work — Cris Creatives",
    "Selected projects and campaigns by Cris Creatives — event communication, branding, community programmes and digital showrooms."
  );

  return <Portfolio />;
}
