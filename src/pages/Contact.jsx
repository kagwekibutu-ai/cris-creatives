import ContactSection from "../components/Contact.jsx";
import { usePageMeta } from "../components/ui.jsx";

export default function Contact() {
  usePageMeta(
    "Start a Project — Cris Creatives",
    "Tell Cris Creatives about your project — posters, branding, video, websites or social media. Based in Murang'a, Kenya; replies within one business day."
  );

  return <ContactSection />;
}
