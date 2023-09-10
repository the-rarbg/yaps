import useSWR from 'swr'
import { getUrl2 } from '../lib/tmdb'
import { fetcher, renderResults, sliceArray } from '../utils'
import CardNormal from './CardNormal'
import Heading from './Heading'
import Loading from './Loading'

export default function Collection({
  Component = CardNormal,
  endpoint,
  href,
  isHomePage,
  isTrending,
  limit = 8,
  media_type = 'movie',
  title,
  type = 'movie'
}) {
  const { data, error } = useSWR(endpoint, fetcher)

  if (error) return <div>Error occurred</div>

  return (
    <>
      {data ? (
        <section
          className={
            isTrending
              ? 'mb-6 h-full w-full overflow-hidden md:mb-10 lg:overflow-visible'
              : 'mb-6 md:mb-10'
          }>
          <Heading
            title={title}
            href={href}
            isHomePage={isHomePage}
            isTrending={isTrending}
            media_type={type}
          />
          <section
            className={
              isTrending
                ? 'h-scroll relative flex gap-x-4 overflow-x-scroll sm:gap-x-10 2xs:mt-2'
                : 'card-collection-wrapper'
            }>
            {renderResults(
              sliceArray(data.results || [], limit),
              Component,
              media_type
            )}
          </section>
        </section>
      ) : (
        <Loading />
      )}
    </>
  )
}
