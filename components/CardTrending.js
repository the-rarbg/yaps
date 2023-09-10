import { useRouter } from 'next/router'
import CardImage from './CardImage'
import CardInfo from './CardInfo'

export default function CardTrending({
  id,
  category,
  rating,
  src,
  title,
  year,
}) {
  const router = useRouter()

  const handleClick = () => {
    if (category === 'movie') {
      router.push(`/movie/${id}`)
    } else if (category === 'tv') {
      router.push(`/tv/${id}`)
    }
  }

  return (
    <div className='relative w-full cursor-pointer' onClick={handleClick}>
      <CardImage isTrending src={src} alt={title} />
      <CardInfo
        isTrending
        id={id}
        category={category}
        rating={rating}
        title={title}
        year={year}
      />
    </div>
  )
}
