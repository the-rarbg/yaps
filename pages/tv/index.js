import Head from 'next/head'
import Genres from '../../components/Genres'
import SearchBar from '../../components/SearchBar'
import { genreTV, getGenre } from '../../lib/tmdb'
import { pathToSearchTV } from '../../utils'

export default function TV({ data }) {
  return (
    <>
      <Head>
        <title>TV Series | Watcho</title>
      </Head>
      <SearchBar
        placeholder='Search for TV series'
        searchPath={pathToSearchTV}
      />
      <Genres arr={data.genres} media_type='tv' oddBgColor='odd:bg-teal-700' />
    </>
  )
}

export async function getStaticProps() {
  const url = getGenre(genreTV)
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data,
    },
  }
}
