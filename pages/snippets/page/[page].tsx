import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import SnippetsLayout from '@/layouts/SnippetsLayout'
import { allCoreContent } from '@/lib/utils/contentlayer'
import { SNIPPETS_PER_PAGE } from '../../snippets'
import { InferGetStaticPropsType } from 'next'
import { allSnippets } from 'contentlayer/generated'
import { sortedSnippets } from '../../../lib/utils/contentlayer'

export const getStaticPaths = async () => {
  const totalSnippets = allSnippets
  const totalPages = Math.ceil(totalSnippets.length / SNIPPETS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const {
    params: { page },
  } = context
  const posts = sortedSnippets(allSnippets)
  const pageNumber = parseInt(page as string)
  const initialDisplaySnippets = posts.slice(
    SNIPPETS_PER_PAGE * (pageNumber - 1),
    SNIPPETS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / SNIPPETS_PER_PAGE),
  }

  return {
    props: {
      initialDisplaySnippets: allCoreContent(initialDisplaySnippets),
      snippets: allCoreContent(posts),
      pagination,
    },
  }
}

export default function SnippetsPage({
  snippets,
  initialDisplaySnippets,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <SnippetsLayout
        snippets={snippets}
        initialDisplaySnippets={initialDisplaySnippets}
        pagination={pagination}
        title="All Snippets"
      />
    </>
  )
}
