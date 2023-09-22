import Link from 'next/link'

export default function NavigationIcon({ children, href }) {
  return (
    <Link href={href} passHref>
      <a className='flex cursor-pointer text-white dark:text-white'>
        {children}
      </a>
    </Link>
  )
}
