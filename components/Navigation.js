import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AppIcon from './icons/AppIcon'
import AppLogo from './icons/AppIcon'
import IconNavHome from './icons/IconNavHome'
import IconNavMovie from './icons/IconNavMovie'
import IconNavTv from './icons/IconNavTv'
import NavigationIcon from './NavigationIcon'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { MdOutlineArrowBackIos } from 'react-icons/md'

export default function Navigation() {
  const router = useRouter()
  const [token, setToken] = useState(false)
  useEffect(() => {
    let temp = localStorage.getItem('access_token') || false
    setToken(temp)
  }, [])

  //SideBar Hook
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className=' bg-app-shady-white sticky top-0 z-50 flex items-center  justify-between p-5 shadow-md shadow-black dark:bg-app-semi-dark-blue md:mx-6 md:mb-[33px] md:mt-6 md:rounded-[10px] lg:fixed lg:left-0 lg:my-12 lg:mr-0 lg:h-5/6 lg:flex-col lg:py-9'>
      <div
        onClick={() => setIsOpen(false)}
        className={`  overlay backdrop ${isOpen ? 'active' : ''}`}></div>
      <div
        className={` sidebar backdrop hide-scrollbar active ${
          isOpen ? 'translate-x-0' : 'translate-x-[-100%]'
        } `}>
        <nav>
          <ul className='ml-2 mt-4 '>
            <li>
              <button
                className='duration-400 mb-3 flex items-baseline rounded-full bg-white  px-3 py-1  text-black hover:bg-gray-600 dark:bg-[#5a6a90] dark:text-gray-200'
                onClick={() => {
                  setIsOpen(false)
                }}>
                <span className='mr-1 self-center'>
                  <MdOutlineArrowBackIos />
                </span>
                <div className=''>Close Menu</div>
              </button>
            </li>
            <li
              onClick={() => setIsOpen(false)}
              className='m-2 cursor-pointer rounded-xl border-2 border-gray-400 p-4 dark:border-gray-900'>
              <NavigationIcon href='/latest-top-10'>
                <svg
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content='Top10'
                  width='24'
                  height='24'
                  fill='currentColor'
                  className={
                    router.pathname == '/latest-top-10'
                      ? 'active-link'
                      : 'icon-nav'
                  }
                  viewBox='0 0 16 16'>
                  <path d='M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 815 8 15Z' />
                </svg>
                <p className='ml-2'>Top-10</p>
              </NavigationIcon>
            </li>
            <li
              onClick={() => setIsOpen(false)}
              className='m-2 cursor-pointer rounded-xl border-2 border-gray-400 p-4 dark:border-gray-900 '>
              <div
                className='flex'
                onClick={() =>
                  (window.location.href = '/get-posts/category:Movies/')
                }>
                <svg
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content='Browse'
                  width='24'
                  height='24'
                  fill='currentColor'
                  className={
                    router.pathname == '/get-posts/[category]'
                      ? 'active-link'
                      : 'icon-nav'
                  }
                  viewBox='0 0 16 16'>
                  <path d='M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z' />
                </svg>
                <p className='ml-2'>Browse</p>
              </div>
            </li>
            <li
              onClick={() => setIsOpen(false)}
              className='m-2 cursor-pointer rounded-xl border-2 border-gray-400 p-4  dark:border-gray-900'>
              <NavigationIcon href='/search'>
                <svg
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content='Search'
                  width='24'
                  height='24'
                  fill='currentColor'
                  className={
                    router.pathname == '/search'
                      ? 'active-link  !text-gray-600'
                      : 'icon-nav'
                  }
                  viewBox='0 0 16 16'>
                  <path d='M6.5 13a6.474 6.474 0 0 0 3.845-1.258h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.008 1.008 0 0 0-.115-.1A6.471 6.471 0 0 0 13 6.5 6.502 6.502 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13Zm0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z' />
                </svg>
                <p className='ml-2'>Search</p>
              </NavigationIcon>
            </li>
            <li
              onClick={() => setIsOpen(false)}
              className='m-2 cursor-pointer rounded-xl border-2 border-gray-400 p-4  dark:border-gray-900'>
              <NavigationIcon href='/movie'>
                <IconNavMovie />
                <p className='ml-2'>Movie</p>
              </NavigationIcon>
            </li>
            <li
              onClick={() => setIsOpen(false)}
              className='m-2 cursor-pointer rounded-xl border-2 border-gray-400 p-4  dark:border-gray-900'>
              <NavigationIcon
                href='/tv'
                data-tooltip-id='my-tooltip'
                data-tooltip-content='TV'>
                <IconNavTv />
                <p className='ml-2'>TV</p>
              </NavigationIcon>
            </li>
            <li
              onClick={() => setIsOpen(false)}
              className='m-2 cursor-pointer rounded-xl border-2 border-gray-400 p-4 dark:border-gray-900'>
              <NavigationIcon href={token ? '/upload' : '/login?page=upload'}>
                <svg
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content='Upload'
                  width='24'
                  height='24'
                  fill='currentColor'
                  className={
                    router.pathname == '/upload' ? 'active-link' : 'icon-nav'
                  }
                  viewBox='0 0 16 16'>
                  <path d='M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z' />
                </svg>
                <p className='ml-2'>Upload</p>
              </NavigationIcon>
            </li>
            <li
              onClick={() => setIsOpen(false)}
              className='m-2 cursor-pointer rounded-xl border-2 border-gray-400 p-4  dark:border-gray-900'>
              {/* faq */}
              <NavigationIcon href='/faq'>
                <svg
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content='FAQ'
                  width='24'
                  height='24'
                  fill='currentColor'
                  className={
                    router.pathname == '/faq' ? 'active-link' : 'icon-nav'
                  }
                  viewBox='0 0 16 16'>
                  <path d='M2 5C.892 5 0 5.892 0 7v7c0 1.108.892 2 2 2h9c1.108 0 2-.892 2-2v-3.8L16 7h-3c0-1.108-.892-2-2-2zm4.438 2C7.75 6.926 8.926 7.936 9 9.25c0 1.121-.308 1.544-1.281 2.281a1.68 1.68 0 00-.281.25c-.04.05-.032.033-.032.031.006.423-.39.782-.812.782a.79.79 0 01-.781-.782c0-.401.179-.754.375-1a3.14 3.14 0 01.562-.562 3.85 3.85 0 00.563-.531c.074-.09.097-.24.093-.344v-.031a.785.785 0 00-.843-.75c-.451.025-.813.362-.851.758a.697.697 0 01-.718.648.816.816 0 01-.781-.594 1.725 1.725 0 01.01-.533c.005-.014.006-.03.012-.043.202-1.024 1.09-1.768 2.203-1.83zm.156 6.406a.82.82 0 01.812.813c0 .442-.37.781-.812.781a.768.768 0 01-.781-.781c0-.442.339-.813.78-.813zM2 1C.892 1 0 1.892 0 3v.568A3.918 3.918 0 012 3h9c1.376 0 2.55.763 3.268 1.848L16 3h-3c0-1.108-.892-2-2-2z' />
                </svg>
                <p className='ml-2'>Help Center</p>
              </NavigationIcon>
            </li>
          </ul>
        </nav>
      </div>

      <div className='flex gap-5'>
        <div className='cursor-pointer lg:hidden' onClick={toggleSidebar}>
          <svg
            data-tooltip-id='my-tooltip'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='hsl(223, 23%, 46%)'
            className={
              router.pathname == '/latest-top-10' ? 'active-link' : 'icon-nav'
            }
            viewBox='0 0 50 50'>
            <path d='M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z'></path>
          </svg>
        </div>

        <Tooltip id='my-tooltip' place='bottom-start' events='hover' />
        <Link href='/' passHref>
          <a>
            <AppLogo />
          </a>
        </Link>
      </div>

      <div className='nav-res flex w-1/2 items-center justify-between max-lg:hidden 2xs:w-[70%] lg:my-5 lg:h-[300px] lg:flex-col'>
        {/* <NavigationIcon href='/'>
          <svg
            className={router.pathname === '/' ? 'active-link' : 'icon-nav'}
            width='24'
            height='24'
            fill='currentColor'
            viewBox='0 0 16 16'>
            <path d='M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707L7.293 1.5Z' />
            <path d='m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9.293Zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z' />
          </svg>
        </NavigationIcon> */}
        <NavigationIcon href='/latest-top-10'>
          <svg
            data-tooltip-id='my-tooltip'
            data-tooltip-content='Top10'
            width='24'
            height='24'
            fill='currentColor'
            className={
              router.pathname == '/latest-top-10' ? 'active-link' : 'icon-nav'
            }
            viewBox='0 0 16 16'>
            <path d='M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z' />
          </svg>
        </NavigationIcon>

        <div
          onClick={() =>
            (window.location.href = '/get-posts/category:Movies/')
          }>
          <svg
            data-tooltip-id='my-tooltip'
            data-tooltip-content='Browse'
            width='24'
            height='24'
            fill='currentColor'
            className={
              router.pathname == '/get-posts/[category]'
                ? 'active-link'
                : 'icon-nav'
            }
            viewBox='0 0 16 16'>
            <path d='M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z' />
          </svg>
        </div>

        <NavigationIcon href='/search'>
          <svg
            data-tooltip-id='my-tooltip'
            data-tooltip-content='Search'
            width='24'
            height='24'
            fill='currentColor'
            className={
              router.pathname == '/search' ? 'active-link' : 'icon-nav'
            }
            viewBox='0 0 16 16'>
            <path d='M6.5 13a6.474 6.474 0 0 0 3.845-1.258h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.008 1.008 0 0 0-.115-.1A6.471 6.471 0 0 0 13 6.5 6.502 6.502 0 0 0 6.5 0a6.5 6.5 0 1 0 0 13Zm0-8.518c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z' />
          </svg>
        </NavigationIcon>

        <NavigationIcon href='/movie'>
          <IconNavMovie />
        </NavigationIcon>
        <NavigationIcon
          href='/tv'
          data-tooltip-id='my-tooltip'
          data-tooltip-content='TV'>
          <IconNavTv />
        </NavigationIcon>
        <NavigationIcon href={token ? '/upload' : '/login?page=upload'}>
          <svg
            data-tooltip-id='my-tooltip'
            data-tooltip-content='Upload'
            width='24'
            height='24'
            fill='currentColor'
            className={
              router.pathname == '/upload' ? 'active-link' : 'icon-nav'
            }
            viewBox='0 0 16 16'>
            <path d='M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z' />
          </svg>
        </NavigationIcon>
        {/* faq */}
        <NavigationIcon href='/faq'>
          <svg
            data-tooltip-id='my-tooltip'
            data-tooltip-content='FAQ'
            width='24'
            height='24'
            fill='currentColor'
            className={router.pathname == '/faq' ? 'active-link' : 'icon-nav'}
            viewBox='0 0 16 16'>
            <path d='M2 5C.892 5 0 5.892 0 7v7c0 1.108.892 2 2 2h9c1.108 0 2-.892 2-2v-3.8L16 7h-3c0-1.108-.892-2-2-2zm4.438 2C7.75 6.926 8.926 7.936 9 9.25c0 1.121-.308 1.544-1.281 2.281a1.68 1.68 0 00-.281.25c-.04.05-.032.033-.032.031.006.423-.39.782-.812.782a.79.79 0 01-.781-.782c0-.401.179-.754.375-1a3.14 3.14 0 01.562-.562 3.85 3.85 0 00.563-.531c.074-.09.097-.24.093-.344v-.031a.785.785 0 00-.843-.75c-.451.025-.813.362-.851.758a.697.697 0 01-.718.648.816.816 0 01-.781-.594 1.725 1.725 0 01.01-.533c.005-.014.006-.03.012-.043.202-1.024 1.09-1.768 2.203-1.83zm.156 6.406a.82.82 0 01.812.813c0 .442-.37.781-.812.781a.768.768 0 01-.781-.781c0-.442.339-.813.78-.813zM2 1C.892 1 0 1.892 0 3v.568A3.918 3.918 0 012 3h9c1.376 0 2.55.763 3.268 1.848L16 3h-3c0-1.108-.892-2-2-2z' />
          </svg>
        </NavigationIcon>

        {token ? (
          <NavigationIcon href='/dashboard'>
            <IconNavHome />
          </NavigationIcon>
        ) : null}
      </div>
      <div style={{ cursor: 'pointer' }}>
        {token ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            data-tooltip-id='my-tooltip'
            data-tooltip-content='Logout'
            onClick={() => {
              localStorage.clear()
              window.location.href = '/'
            }}
            width='24'
            height='24'
            fill='currentColor'
            className='icon-nav'
            viewBox='0 0 16 16'>
            <path
              fillRule='evenodd'
              d='M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z'
            />
            <path
              fillRule='evenodd'
              d='M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
            />
          </svg>
        ) : (
          <svg
            data-tooltip-id='my-tooltip'
            data-tooltip-content='Login'
            onClick={() => {
              router.push('/login')
            }}
            width='24'
            height='24'
            fill='currentColor'
            className={router.pathname == '/login' ? 'active-link' : 'icon-nav'}
            viewBox='0 0 16 16'>
            <path
              fillRule='evenodd'
              d='M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z'
            />
            <path
              fillRule='evenodd'
              d='M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
            />
          </svg>
        )}
      </div>
    </nav>
  )
}
