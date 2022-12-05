import { ComponentProps, useState } from 'react'
import Pagination from '@/components/Pagination'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Post from '@/components/blog/Post'

interface Props {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="mt-8 divide-y-2 divide-dotted divide-slate-100 dark:divide-slate-700">
        <div className="flex items-center justify-between pb-3">
          <h1 className="text-4xl font-extrabold leading-10 tracking-tight md:text-5xl md:leading-14">
            <span className="bg-gradient-to-r from-primary-500 to-blue-400 bg-clip-text text-transparent dark:from-primary-300 dark:to-blue-300">
              {title}
            </span>
          </h1>
          <div className="relative max-w-lg md:w-80">
            <input
              aria-label="Search here"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search posts..."
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="pt-5">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { slug, date, title, summary, tags, readingTime, images } = post
            return (
              <Post
                key={slug}
                title={title}
                images={images}
                slug={slug}
                readingTime={{
                  text: readingTime.text,
                }}
                date={date}
                summary={summary}
                tags={tags}
              />
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
