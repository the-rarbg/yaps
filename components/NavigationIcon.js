import Link from 'next/link'

export default function NavigationIcon({ children, href }) {
  return (
    <Link href={href} passHref>
      <a className='cursor-pointer'>{children}</a>
    </Link>
  )
}
