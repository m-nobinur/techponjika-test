import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
  color?: string
}

const Tag = ({ text, color }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 capitalize hover:text-primary-500 dark:hover:text-blue-400">
        <span className={`text-${color?.length ? color : 'gray'}-400`}>#</span>
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
