import Head from 'next/head'
import CollectionSearch from '../../../components/CollectionSearch'
import Loading from '../../../components/Loading'
import PageTitle from '../../../components/PageTitle'
import PaginationImproved from '../../../components/PaginationImproved'
import SearchBar from '../../../components/SearchBar'
import { discoverTV, getUrl } from '../../../lib/tmdb'
import { pathToSearchTV } from '../../../utils'

export default function GenreTV({ data, id, name, page }) {
  const currentPage = Number(page)
  const isFirst = currentPage === 1
  const isLast = currentPage === data.total_pages

  return (
    <div>
      <Head>
        <title>{name} - TV Series | Watcho</title>
      </Head>
      <SearchBar
        placeholder='Search for TV series'
        searchPath={pathToSearchTV}
      />
      <PageTitle title={name} />
      {data ? (
        <>
          <CollectionSearch
            isGenre
            arr={data.results || []}
            media_type='tv'
          />
          <PaginationImproved
            currentPageAdvance={currentPage + 1}
            currentPage={currentPage}
            prevHref={`/tv/genre/${id}?name=${name}&page=${currentPage - 1}`}
            nextHref={`/tv/genre/${id}?name=${name}&page=${currentPage + 1}`}
            isFirst={isFirst}
            isLast={isLast}
            goToPreviousPage={() => currentPage - 1}
            goToNextPage={() => currentPage + 1}
            totalPages={data.total_pages}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id, name, page } = context.query
  const url = getUrl(discoverTV, id, name, page)
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data,
      id,
      name,
      page,
    },
  }
}
