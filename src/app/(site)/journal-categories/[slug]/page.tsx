import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Careers } from "@/components/sections/shared/Careers";
import { ContactHeader } from "@/components/sections/shared/ContactHeader";
import { JournalIndexSection } from "@/components/sections/shared/JournalIndexSection";
import { JournalFilter } from "@/components/ui/FilterBar";
import { journalInCategory } from "@/data/journal";
import { getJournalCategory, journalCategories } from "@/data/journal-categories";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const dynamicParams = false;

export function generateStaticParams() {
  return journalCategories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal-categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata(`/journal-categories/${slug}`);
}

export default async function JournalCategoryPage({ params }: PageProps<"/journal-categories/[slug]">) {
  const { slug } = await params;
  const category = getJournalCategory(slug);
  if (!category) notFound();

  return (
    <>
      <InitialHidden route={`/journal-categories/${slug}`} />
      <main className="main-wrapper">
        <ContactHeader screenLabel="Journal header" label={category.label} heading={category.heading} />
        <JournalIndexSection
          posts={journalInCategory(category.slug)}
          contentId="node-_2423deb7-0c45-4642-0779-f4b59edc17e2-9fadfef2"
          footer={<JournalFilter />}
        />
      </main>
      <Careers />
    </>
  );
}
