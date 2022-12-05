import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allBlogs } from 'contentlayer/generated'

import FeaturedPost from '@/components/blog/FeaturedPost'
import Post from '@/components/blog/Post'

const MAX_DISPLAY = 5

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const last_post = posts.slice(0, 1)
  const { slug, date, title, summary, images, readingTime } = last_post[0]

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div>
        <FeaturedPost
          tags={[]}
          images={images}
          title={title}
          readingTime={{
            text: readingTime.text,
          }}
          date={date}
          slug={slug}
          summary={summary}
        />
        <div className="pt-12 pb-2 md:space-y-5">
          <h1 className="text-4xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl">
            Recent Posts
          </h1>
        </div>
        <ul>
          {!posts.length && 'No posts found.'}
          {posts.slice(1, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images, readingTime } = post
            return (
              <Post
                images={images}
                slug={slug}
                title={title}
                readingTime={{
                  text: readingTime.text,
                }}
                date={date}
                summary={summary}
                tags={tags}
                key={slug}
              />
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="mt-5 flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
