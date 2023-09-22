import {useEffect, useState} from 'react'
import {useTheme} from 'next-themes'

export function ThemeToggler({parentComponent}) {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()
    useEffect(() => {
        setMounted(true)
        if (localStorage.getItem('theme')) setTheme(localStorage.getItem('theme'))
        else setTheme('dark')
    }, [])
    useEffect(() => {
        if (mounted) {
            document.querySelector('.dark-mode-btn').addEventListener('click', () => {
                document
                    .querySelector('.dark-mode-btn')
                    .classList.toggle('rotate-[360deg]')
            })
            localStorage.setItem('theme', theme)
        }
    }, [mounted])
    if (!mounted) {
        return null
    } else {
        if (parentComponent !== "sidebar")
            return (
                <div
                    className={` right-16 top-20 z-50 rounded-3xl p-2 lg:block hidden lg:absolute static md:right-24 md:top-[33px] lg:right-5 lg:top-5  ${
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
        else
            return (
                <div
                    className={`m-2 cursor-pointer rounded-xl border-2 border-gray-400 p-4  dark:border-gray-900  w-66 h-14 text-white`}>
                    <div className={'h-full w-full rounded-3xl'}>
                        <div
                            onClick={() => {
                                setTheme(theme === 'light' ? 'dark' : 'light')
                            }}
                            className={`dark-mode-btn flex h-full w-full cursor-pointer items-center justify-start gap-2 rounded-full transition  duration-500 ease-in-out `}>
            <span
                className={` ${
                    theme === 'dark' ? 'text-white' : ''
                } material-symbols-outlined`}>
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
                            <div>
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}
