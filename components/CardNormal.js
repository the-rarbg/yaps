import { useRouter } from 'next/router'
import CardImage from './CardImage'
import CardInfo from './CardInfo'

export default function CardNormal({ id, category, rating, src, title, year }) {
  const router = useRouter()

  const handleClick = () => {
    if (category === 'movie') {
      router.push(`/movie/${id}`)
    } else if (category === 'tv') {
      router.push(`/tv/${id}`)
    }
  }

  return (
    <div
      className='card-hover-animation mb-4 grow basis-1/5 2xs:w-[130px] xs:w-full cursor-pointer'
      onClick={handleClick}>
      <CardImage src={src} alt={title} />
      <CardInfo
        id={id}
        category={category}
        rating={rating}
        title={title}
        year={year}
      />
    </div>
  )
}
