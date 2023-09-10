import Head from 'next/head'
import CollectionSearch from '../../../components/CollectionSearch'
import Loading from '../../../components/Loading'
import PaginationImproved from '../../../components/PaginationImproved'
import SearchBar from '../../../components/SearchBar'
import { searchMovie } from '../../../lib/tmdb'
import { pathToSearchMovie } from '../../../utils'

export default function SearchMovie({ data, id, page }) {
  const currentPage = Number(page)
  const isFirst = currentPage === 1
  const isLast = data ? currentPage === data.total_pages : false

  return (
    <>
      <Head>
        <title>{id} - Search Results | Watcho</title>
      </Head>
      <SearchBar
        placeholder='Search for movies'
        searchPath={pathToSearchMovie}
      />
      {data ? (
        <>
          <CollectionSearch
            arr={data ? data.results || [] : []}
            searchTerm={id}
            totalResult={data.total_results}
          />
          <PaginationImproved
            currentPageAdvance={currentPage + 1}
            currentPage={currentPage}
            prevHref={`${pathToSearchMovie}${id}?page=${currentPage - 1}`}
            nextHref={`${pathToSearchMovie}${id}?page=${currentPage + 1}`}
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
  const url = searchMovie(id, page)
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
