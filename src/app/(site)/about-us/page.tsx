import { AboutHero } from "@/components/sections/about/AboutHero";
import { Awards } from "@/components/sections/about/Awards";
import { Philosophy } from "@/components/sections/about/Philosophy";
import { Principles } from "@/components/sections/about/Principles";
import { Profile } from "@/components/sections/about/Profile";
import { Snapshot } from "@/components/sections/about/Snapshot";
import { Team } from "@/components/sections/about/Team";
import { Careers } from "@/components/sections/shared/Careers";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const metadata = pageMetadata("/about-us");

export default function AboutPage() {
  return (
    <>
      <InitialHidden route="/about-us" />
      <main className="main-wrapper">
        <AboutHero />
        <Philosophy />
        <Principles />
        <Profile />
        <Team />
        <Snapshot />
        <Awards />
      </main>
      <Careers />
    </>
  );
}
