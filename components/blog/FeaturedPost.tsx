import formatDate from '@/lib/utils/formatDate'
import truncate from '@/lib/utils/trancate'
import Link from '@/components/Link'
import Post from '../../types/PostType'
import { GoCalendar, GoClock, GoChevronRight } from 'react-icons/go'

import Image from 'components/Image'

const FeaturedPost = (props: Post) => {
  return (
    <div>
      <div className="md:mt-8">
        <div className="relative">
          {props.images?.length ? (
            props.images?.map((img, i) =>
              img.length && i == 0 ? (
                <div className="relative h-[245px] md:h-[420px]" key={i}>
                  <Image
                    alt={props.title}
                    src={`${process.env.FAVICON}${img}`}
                    layout="fill"
                    className="rounded-xl"
                  />
                </div>
              ) : (
                ''
              )
            )
          ) : (
            <div className="h-[245px] rounded-xl bg-primary-400 md:h-[420px]"></div>
          )}
        </div>
        <div
          className={`${
            props.title.length >= 42 ? '-mt-[105px]' : '-mt-[105px] md:-mt-[68px]'
          } w-full border-t-[10px] border-b-8 border-slate-700 bg-slate-900 pt-14 opacity-80 blur-lg dark:bg-slate-900 dark:opacity-80`}
        ></div>
        <div className="-mt-20 flex flex-col items-center">
          <div className="z-10 flex items-center font-semibold text-slate-300 dark:text-slate-400">
            <GoClock className="mr-1 text-lg" />
            <time className="mr-4">{props.readingTime.text}</time>
            <GoCalendar className="mr-1 text-lg" />
            <time className="mr-4" dateTime={props.date}>
              {formatDate(props.date)}
            </time>
            {/* "text-blue-400 text-purple-400 text-red-400 text-orange-400 text-teal-400"*/}
          </div>
          <h2 className="text-center text-4xl font-extrabold leading-[40px] blur-0 md:max-w-3xl">
            <Link
              href={`/blog/${props.slug}`}
              className="bg-gradient-to-r from-primary-500 to-blue-300 bg-clip-text text-transparent hover:from-blue-300 hover:to-primary-400 dark:from-primary-300 dark:to-blue-300 dark:hover:from-blue-300 dark:hover:to-primary-400"
            >
              {props.title}
            </Link>
          </h2>
          <article className="prose mt-3 max-w-lg text-center font-medium text-gray-600 dark:text-gray-300">
            {truncate(props.summary)}
            <Link
              href={`/blog/${props.slug}`}
              className="text-primary-500 no-underline hover:text-primary-600 dark:hover:text-primary-600"
              aria-label={`Read "${props.title}"`}
            >
              <div className="flex items-center justify-center">
                Read more <GoChevronRight className="mt-[3px] text-lg" />
              </div>
            </Link>
          </article>
        </div>
      </div>
    </div>
  )
}

export default FeaturedPost
