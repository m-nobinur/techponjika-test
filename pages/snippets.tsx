import { sortedSnippets, allCoreContent } from '@/lib/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import SnippetsLayout from '@/layouts/SnippetsLayout'
import { PageSEO } from '@/components/SEO'
import { InferGetStaticPropsType } from 'next'
import { allSnippets } from 'contentlayer/generated'

export const SNIPPETS_PER_PAGE = 10

export const getStaticProps = async () => {
  const snippets = sortedSnippets(allSnippets)
  const initialDisplaySnippets = snippets.slice(0, SNIPPETS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(snippets.length / SNIPPETS_PER_PAGE),
  }

  return {
    props: {
      initialDisplaySnippets: allCoreContent(initialDisplaySnippets),
      snippets: allCoreContent(snippets),
      pagination,
    },
  }
}

export default function Snippets({
  snippets,
  initialDisplaySnippets,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`Snippets | ${siteMetadata.author}`} description={siteMetadata.description} />
      <SnippetsLayout
        snippets={snippets}
        initialDisplaySnippets={initialDisplaySnippets}
        pagination={pagination}
        title="All Snippets"
      />
    </>
  )
}
