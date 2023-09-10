import Head from 'next/head'
import CollectionSearch from '../../../components/CollectionSearch'
import Loading from '../../../components/Loading'
import PaginationImproved from '../../../components/PaginationImproved'
import SearchBar from '../../../components/SearchBar'
import { searchTv } from '../../../lib/tmdb'
import { pathToSearchTV } from '../../../utils'

export default function SearchTV({ data, id, page }) {
  const currentPage = Number(page)
  const isFirst = currentPage === 1
  const isLast = data ? currentPage === data.total_pages : false

  return (
    <>
      <Head>
        <title>{id} - Search Results | Watcho</title>
      </Head>
      <SearchBar
        placeholder='Search for TV series'
        searchPath={pathToSearchTV}
      />
      {data ? (
        <>
          <CollectionSearch
            arr={data ? data.results : []}
            media_type='tv'
            searchTerm={id}
            totalResult={data.total_results}
          />
          <PaginationImproved
            currentPageAdvance={currentPage + 1}
            currentPage={currentPage}
            prevHref={`${pathToSearchTV}${id}?page=${currentPage - 1}`}
            nextHref={`${pathToSearchTV}${id}?page=${currentPage + 1}`}
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
  const url = searchTv(id, page)
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
