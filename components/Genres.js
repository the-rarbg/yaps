import Link from 'next/link'
import CardGenre from './CardGenre'

export default function Genres({ arr = [], media_type, oddBgColor }) {
  return (
    <section className='mb-10 flex flex-wrap justify-between'>
      {arr.map(genre => (
        <Link
          key={genre.id}
          href={`/${media_type}/genre/${genre.id}?name=${genre.name}&page=1`}
          passHref>
          <CardGenre oddBgColor={oddBgColor} text={genre.name} />
        </Link>
      ))}
    </section>
  )
}
