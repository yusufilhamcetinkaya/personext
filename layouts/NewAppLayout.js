import MobileMenu from '@/components/Common/MobileMenu'
import NewChip from '@/components/Common/NewChip'
import NewNav from '@/components/Common/NewNav'
import { HamburgerMenu, Theme } from '@/components/Icons'
import { throttle } from '@/helpers/dom'
import { changeThemeMode } from '@/helpers/theme'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'

export default function NewAppLayout({ children, user }) {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenu, setMobileMenu] = useState(false)
  const router = useRouter()
  const [isChangeHomePage, setIsChangeHomePage] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY || document.documentElement.scrollTop

      const threshold = 250

      if (scrollHeight > threshold) {
        setScrolled(true)
      } else {
        setScrolled(false)
        setMobileMenu(false)
      }
    }

    const throttledScroll = throttle(() => {
      handleScroll()
    }, 30)

    window.addEventListener('scroll', throttledScroll)
    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [])

  useEffect(() => {
    if (router.pathname === '/') {
      const element = document.getElementById(router.asPath.split('#')[1])
      if (element && !isChangeHomePage) {
        window.scrollTo(0, element.offsetTop - 100)
      }
      setMobileMenu(false)
      setIsChangeHomePage(true)
    }
  }, [router])

  const handleMobileMenu = () => {
    setMobileMenu(prev => !prev)
  }

  const changeTheme = () => {
    changeThemeMode()
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const imageMemo = useMemo(
    () => !scrolled && router.pathname === '/',
    [router, scrolled]
  )

  return (
    <>
      <header className="flex h-20 items-center justify-center bg-base-2 font-ibm-plex-sans dark:border-b dark:border-darkmode-border dark:bg-darkmode-base-1 max-sm:hidden">
        <div className="flex min-w-[620px] justify-between ">
          <NewNav />
          <div>
            <NewChip as="button" onClick={changeTheme}>
              <Theme />
            </NewChip>
          </div>
        </div>
      </header>
      <header
        className={classNames(
          'fixed -top-20 left-1/2 z-30 w-full max-w-[620px] -translate-x-1/2 duration-300 max-sm:translate-y-24 max-sm:px-5',
          scrolled && 'translate-y-24'
        )}
      >
        <div className="mx-auto flex min-h-[4.7rem] items-center rounded-full border border-primary-1 bg-base-2 py-1 pl-1 pr-2.5 dark:border-darkmode-border dark:bg-darkmode-base-1">
          <div className="flex w-full items-center gap-2">
            <div
              className={classNames(
                'w-[4.3rem] overflow-hidden',
                imageMemo && '!w-0'
              )}
            >
              <Link href="/#">
                <NewChip className="inline-flex p-1">
                  <div className="relative h-12 w-12">
                    <Image
                      fill
                      src="/img/profile.jpg"
                      className="rounded-full"
                      alt=""
                    />
                  </div>
                </NewChip>
              </Link>
            </div>
            <div className={classNames(imageMemo && 'ml-2')}>
              <h1 className="text-sm font-semibold dark:text-darkmode-title">
                Yusuf İlham Çetinkaya
              </h1>
              <p className="text-2xs font-normal text-primary-6 dark:text-darkmode-text">
                Mobile Application Developer
              </p>
            </div>
          </div>

          <NewChip
            as="button"
            onClick={handleMobileMenu}
            className="flex h-10 w-11 items-center justify-center !p-0"
          >
            <HamburgerMenu />
          </NewChip>
        </div>

        <div
          className={classNames(
            'absolute left-0 top-[3px] -z-10 h-full w-full duration-300 max-sm:-translate-y-[600px] max-sm:px-5',
            isMobileMenu && '!translate-y-[5.1rem]'
          )}
        >
          <MobileMenu />
        </div>
      </header>
      <main className="bg-base-4 px-5 font-ibm-plex-sans dark:bg-darkmode-base-1">
        {children}
      </main>
    </>
  )
}
