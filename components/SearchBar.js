import { useRouter } from 'next/router'
import { useState } from 'react'
import IconSearch from './icons/IconSearch'
import SearchButton from './SearchButton'

export default function SearchBar({
  placeholder = 'Search for movies or TV series',
  searchPath,
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = e => {
    e.preventDefault()
    if (query.length === 0) {
      return
    } else {
      router.push(`${searchPath}${query.trim()}?page=1`)
      setQuery('')
    }
  }

  return (
    <form onSubmit={handleSearch} className='flex grow pb-6 md:pb-10 lg:mt-9'>
      <IconSearch className='h-6 w-6 md:h-8 md:w-8' />
      <input
        className='md:heading-md md:placeholder:heading-md mx-4 w-full rounded-none border-b border-app-dark-blue bg-app-dark-blue pb-[8px] text-base font-light caret-app-red placeholder:text-base placeholder:text-app-placeholder focus:border-b focus:border-app-greyish-blue focus:outline-none'
        type='text'
        placeholder={placeholder}
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
      <SearchButton />
    </form>
  )
}
