import Link from '@/components/Link'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'
import truncate from '@/lib/utils/trancate'
import Image from '@/components/Image'
import { GoCalendar, GoClock, GoChevronRight } from 'react-icons/go'
import Post from '../../types/PostType'

const Post = (props: Post) => {
  const colors = ['red', 'orange', 'purple', 'blue']
  return (
    <li className="bg-transparent bg-opacity-20 py-4 px-4 transition duration-100 hover:scale-105 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 md:py-5">
      <article>
        <div className="w-full lg:grid lg:grid-cols-2 lg:items-center">
          {props.images?.length ? (
            props.images?.map((img, i) =>
              img.length && i == 0 ? (
                <div className="relative h-[210px] md:h-[245px] md:w-11/12" key={i}>
                  <Image
                    alt={props.title}
                    src={`${process.env.PUBLIC_IMG}${img}`}
                    layout="fill"
                    className="rounded-[10px]"
                  />
                </div>
              ) : (
                ''
              )
            )
          ) : (
            <div className="h-[210px] rounded-[10px] bg-primary-500 md:h-[245px] md:w-11/12"></div>
          )}

          <div className="md:-ml-5">
            <div>
              <div className="mt-2 flex flex-wrap items-center font-semibold text-gray-500 dark:text-gray-400">
                <GoClock className="mr-1 text-lg" />
                <time className="mr-4">{props.readingTime.text}</time>
                <GoCalendar className="mr-1 text-lg" />
                <time className="mr-4" dateTime={props.date}>
                  {formatDate(props.date)}
                </time>
                {props.tags.map((tag, index) => (
                  <Tag key={tag} text={tag} color={colors[index % colors.length]} />
                ))}
              </div>
              <div>
                <h2 className="my-3 font-banglaAnek text-3xl font-extrabold leading-10">
                  <Link
                    href={`/blog/${props.slug}`}
                    className="text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-blue-400"
                  >
                    {props.title}
                  </Link>
                </h2>
              </div>
              <div className="prose max-w-none font-medium text-gray-500 dark:text-gray-400">
                {truncate(props.summary)}
              </div>
            </div>
            <div className="mt-2 text-base font-semibold leading-8">
              <Link
                href={`/blog/${props.slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-600"
                aria-label={`Read "${props.title}"`}
              >
                <div className="flex items-center">
                  Read more <GoChevronRight className="mt-[3px] text-lg" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}

export default Post
