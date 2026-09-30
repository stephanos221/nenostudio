import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseBrief } from "@/components/sections/case/CaseBrief";
import { CaseHero } from "@/components/sections/case/CaseHero";
import { CaseOutcome } from "@/components/sections/case/CaseOutcome";
import { CaseQuote } from "@/components/sections/case/CaseQuote";
import { Careers } from "@/components/sections/shared/Careers";
import { categoryLabel } from "@/data/categories";
import { getWorkItem, work } from "@/data/work";
import { caseStudies } from "@/data/work-cases";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata(`/work/${slug}`);
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = getWorkItem(slug);
  if (!item) notFound();
  const study = caseStudies[item.slug];

  return (
    <>
      <InitialHidden route={`/work/${slug}`} />
      <div className="main-wrapper">
        <CaseHero
          image={study.hero}
          caption={[categoryLabel(item.category), study.discipline, item.year].join(" · ")}
          title={study.title}
        />
        <CaseBrief brief={study.brief} />
        <CaseOutcome outcome={study.outcome} />
        <CaseQuote quote={study.quote} />
      </div>
      <Careers />
    </>
  );
}
