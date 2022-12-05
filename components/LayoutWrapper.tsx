import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { ReactNode } from 'react'
import { AiOutlineBook, AiOutlineTags, AiOutlineUser, AiOutlineHome } from 'react-icons/ai'
import { RiBracesFill } from 'react-icons/ri'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3 -ml-8">
                  <Logo />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="rounded border-b-2 border-white py-1 px-2 text-gray-900 hover:border-primary-400 hover:bg-gray-100 hover:transition-colors hover:duration-500 dark:border-gray-900 dark:text-gray-100 dark:hover:border-primary-400 dark:hover:bg-gray-700 sm:py-2 sm:px-3 md:inline-block"
                >
                  {link.title == 'Home' ? (
                    <>
                      <span className="flex items-center">
                        <AiOutlineHome className="mr-1" />
                        Home
                      </span>
                    </>
                  ) : link.title == 'Blog' ? (
                    <>
                      <span className="flex items-center">
                        <AiOutlineBook className="mr-1" />
                        Blog
                      </span>
                    </>
                  ) : link.title == 'Tags' ? (
                    <>
                      <span className="flex items-center">
                        <AiOutlineTags className="mr-1" />
                        Tags
                      </span>
                    </>
                  ) : link.title == 'Snippets' ? (
                    <>
                      <span className="flex items-center">
                        <RiBracesFill className="mr-1" />
                        Snippets
                      </span>
                    </>
                  ) : link.title == 'About' ? (
                    <>
                      <span className="flex items-center">
                        <AiOutlineUser className="mr-1" />
                        About
                      </span>
                    </>
                  ) : (
                    ''
                  )}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
