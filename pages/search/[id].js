import Head from 'next/head'
import CollectionSearch from '../../components/CollectionSearch'
import Loading from '../../components/Loading'
import PaginationImproved from '../../components/PaginationImproved'
import SearchBar from '../../components/SearchBar'
import { search } from '../../lib/tmdb'
import { pathToSearchAll } from '../../utils'

export default function Search({ data, id, page }) {
  const currentPage = Number(page)
  const isFirst = currentPage === 1
  const isLast = data ? currentPage === data.total_pages : false

  const filteredResults = data
    ? data.results.filter(item => item.media_type !== 'person')
    : []

  return (
    <>
      <Head>
        <title>{id} - Search Results | Watcho</title>
      </Head>
      <SearchBar
        placeholder='Search for movies or TV series'
        searchPath={pathToSearchAll}
      />
      {data ? (
        <>
          <CollectionSearch
            arr={filteredResults}
            searchTerm={id}
            totalResult={data.total_results}
          />
          <PaginationImproved
            currentPageAdvance={currentPage + 1}
            currentPage={currentPage}
            prevHref={`${pathToSearchAll}${id}?page=${currentPage - 1}`}
            nextHref={`${pathToSearchAll}${id}?page=${currentPage + 1}`}
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
    </>
  )
}

export async function getServerSideProps(context) {
  const { id, page } = context.query
  const url = search(id, page)
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data,
      id,
      page,
    },
  }
}
