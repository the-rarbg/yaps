import {useRouter} from 'next/router'
import {useState} from 'react'
import IconSearch from './icons/IconSearch'
import SearchButton from './SearchButton'
import {useTheme} from "next-themes";

export default function SearchBar({
                                      placeholder = 'Search for movies or TV series',
                                      searchPath,
                                  }) {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const { theme, setTheme } = useTheme()
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
            <IconSearch className='h-6 w-6 md:h-8 md:w-8 dark:pt-1 pt-2'/>
            <input
                className='md:heading-md md:placeholder:heading-md mx-4 transition duration-300 ease-in-out dark:text-white text-app-dark-blue w-full rounded dark:rounded-none p-1 dark:pt-0 dark:bg-app-dark-blue bg-light-white pb-[8px] text-base font-light caret-app-red placeholder:text-base placeholder:text-app-dark-blue dark:shadow-[0px] shadow-2xl  border-b-[2px]  placeholder:dark:text-app-placeholder dark:focus:border-app-pure-white border-app-greyish-blue focus:outline-none'
                type='text'
                placeholder={placeholder}
                onChange={e => setQuery(e.target.value)}
                value={query}
            />
            <SearchButton/>
        </form>
    )
}
