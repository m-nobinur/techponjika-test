import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { sortedSnippets, coreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allSnippets } from 'contentlayer/generated'

const DEFAULT_LAYOUT = 'SnippetDetailLayout'

export async function getStaticPaths() {
  return {
    paths: allSnippets.map((p) => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = (params.slug as string[]).join('/')
  const sortedsnippets = sortedSnippets(allSnippets)
  const snippetsIndex = sortedsnippets.findIndex((p) => p.slug === slug)
  const prevContent = sortedsnippets[snippetsIndex + 1] || null
  const prev = prevContent ? coreContent(prevContent) : null
  const nextContent = sortedsnippets[snippetsIndex - 1] || null
  const next = nextContent ? coreContent(nextContent) : null
  const snippet = sortedsnippets.find((p) => p.slug === slug)

  return {
    props: {
      snippet,
      prev,
      next,
    },
  }
}

export default function SnippetDetails({
  snippet,
  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      {'draft' in snippet && snippet.draft !== true ? (
        <MDXLayoutRenderer
          layout={DEFAULT_LAYOUT}
          toc={snippet.toc}
          content={snippet}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
