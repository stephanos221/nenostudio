import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/sections/article/ArticleBody";
import { ArticleHeader } from "@/components/sections/article/ArticleHeader";
import { Careers } from "@/components/sections/shared/Careers";
import { MoreJournalSection } from "@/components/sections/shared/MoreJournalSection";
import { Heading } from "@/components/ui/Heading";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getJournalPost, journal } from "@/data/journal";
import { journalArticles } from "@/data/journal-articles";
import { pageMetadata } from "@/lib/metadata";
import InitialHidden from "@/motion/InitialHidden";

export const dynamicParams = false;

const featuredPosts = journal.filter(({ featured }) => featured);

export function generateStaticParams() {
  return journal.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata(`/journal/${slug}`);
}

export default async function JournalPostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();
  const { hero, author, body } = journalArticles[post.slug];

  return (
    <>
      <InitialHidden route={`/journal/${slug}`} />
      <main className="main-wrapper">
        <ArticleHeader post={post} hero={hero} />
        <ArticleBody author={author} body={body} />
        <MoreJournalSection
          posts={featuredPosts}
          header={
            <SectionHeader wrap={false}>
              <Heading size="h2">Keep reading.</Heading>
            </SectionHeader>
          }
        />
      </main>
      <Careers />
    </>
  );
}
