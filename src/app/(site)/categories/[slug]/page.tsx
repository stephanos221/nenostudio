import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Careers } from "@/components/sections/shared/Careers";
import { ContactHeader } from "@/components/sections/shared/ContactHeader";
import { LiveSection } from "@/components/sections/shared/LiveSection";
import { WorkSection } from "@/components/sections/shared/WorkSection";
import { WorkFilter } from "@/components/ui/FilterBar";
import { categories, getCategory } from "@/data/categories";
import { workInCategory } from "@/data/work";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata(`/categories/${slug}`);
}

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <InitialHidden route={`/categories/${slug}`} />
      <main className="main-wrapper">
        <ContactHeader screenLabel="Contact header" label={category.label} heading={category.heading} />
        <WorkSection
          items={workInCategory(category.slug)}
          cellId="node-aa3728fe-a2dc-be9b-e22e-67d4afb70787-bf70276a"
          footer={<WorkFilter />}
        />
        <LiveSection />
      </main>
      <Careers />
    </>
  );
}
