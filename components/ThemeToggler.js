import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggler() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
    setTheme('dark')
  }, [])
  useEffect(() => {
    if (mounted) {
      document.querySelector('.dark-mode-btn').addEventListener('click', () => {
        document
          .querySelector('.dark-mode-btn')
          .classList.toggle('rotate-[360deg]')
      })
    }
  }, [mounted])
  if (!mounted) {
    return null
  } else {
    return (
      <div
        className={`right-16 absolute  top-2 z-50 rounded-3xl p-2 md:right-24 md:top-[33px] lg:right-5 lg:top-5  ${
          theme !== 'dark' ? 'bg-app-semi-dark-blue' : 'bg-app-pure-white'
        } h-12 w-12 text-white`}>
        <div className={'h-full w-full rounded-3xl'}>
          <div
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light')
            }}
            className={`dark-mode-btn flex h-full w-full cursor-pointer items-center justify-center rounded-full transition  duration-500 ease-in-out `}>
            <span
              className={` ${
                theme === 'dark' ? 'text-black' : ''
              } material-symbols-outlined`}>
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
