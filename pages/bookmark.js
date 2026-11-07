import Head from 'next/head'
import Collection from '../components/Collection'
import SearchBar from '../components/SearchBar'

export default function Bookmark() {
  return (
    <>
      <Head>
        <title>Bookmarks | Yaps</title>
      </Head>
      <SearchBar placeholder='Search for bookmarked shows' />
      <Collection endpoint='' title='Bookmarked movies' />
      <Collection endpoint='' media_type='tv' title='Bookmarked TV series' />
    </>
  )
}
