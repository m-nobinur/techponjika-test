import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import kebabCase from '@/lib/utils/kebabCase'
import { getAllTags } from '@/lib/utils/contentlayer'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { GoTag } from 'react-icons/go'

export const getStaticProps: GetStaticProps<{ tags: Record<string, number> }> = async () => {
  const tags = await getAllTags(allBlogs)

  return { props: { tags } }
}

export default function Tags({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  const colors = ['red', 'purple', 'orange', 'teal', 'blue']
  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="md:mt-10">
        <div className="flex items-baseline justify-center">
          <div className="space-x-2 pt-4 pb-10 md:space-y-5">
            <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-4xl sm:leading-10 md:px-6 md:text-6xl md:leading-14">
              <div className="flex items-center">
                <GoTag className="mr-1 mt-3 text-5xl" />
                Tags
              </div>
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center">
            {Object.keys(tags).length === 0 && 'No tags found.'}
            {sortedTags.map((t, index) => {
              return (
                <div
                  key={t}
                  className="mt-2 mb-2 mr-5 rounded-lg bg-slate-100 p-4 text-lg font-semibold hover:bg-slate-200 dark:bg-slate-600 hover:dark:bg-slate-800"
                >
                  <Tag text={t} color={colors[index % colors.length]} />
                  <Link
                    href={`/tags/${kebabCase(t)}`}
                    className="-ml-2 text-lg font-semibold uppercase text-gray-600 dark:text-gray-300"
                  >
                    {` (${tags[t]})`}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
