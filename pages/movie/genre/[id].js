import Head from 'next/head'
import CollectionSearch from '../../../components/CollectionSearch'
import Loading from '../../../components/Loading'
import PageTitle from '../../../components/PageTitle'
import PaginationImproved from '../../../components/PaginationImproved'
import SearchBar from '../../../components/SearchBar'
import { discoverMovie, getUrl } from '../../../lib/tmdb'
import { pathToSearchMovie } from '../../../utils'

export default function GenreMovie({ data, id, name, page }) {
  const currentPage = Number(page)
  const isFirst = currentPage === 1
  const isLast = currentPage === data.total_pages

  return (
    <div>
      <Head>
        <title>{name} - Movies | Watcho</title>
      </Head>
      <SearchBar
        placeholder='Search for movies'
        searchPath={pathToSearchMovie}
      />
      <PageTitle title={name} />
      {data ? (
        <>
          <CollectionSearch isGenre arr={data.results || []} />
          <PaginationImproved
            currentPageAdvance={currentPage + 1}
            currentPage={currentPage}
            prevHref={`/movie/genre/${id}?name=${name}&page=${currentPage - 1}`}
            nextHref={`/movie/genre/${id}?name=${name}&page=${currentPage + 1}`}
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
  const url = getUrl(discoverMovie, id, name, page)
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: { data, id, name, page },
  }
}
