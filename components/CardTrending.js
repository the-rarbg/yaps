import {useRouter} from 'next/router'
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

    const handleClick = (e) => {
        if (e.ctrlKey) {
            if (category === 'movie') {
                window.open(`/movie/${id}`)
            } else if (category === 'tv') {
                window.open(`/tv/${id}`)
            }
        } else {
            if (category === 'movie') {
                router.push(`/movie/${id}`)
            } else if (category === 'tv') {
                router.push(`/tv/${id}`)
            }
        }
    }

    return (
        <a className='relative w-full top-[100%] cursor-pointer' target={"_blank"} onClick={handleClick}>
            <CardImage isTrending src={src} alt={title}/>
            <CardInfo
                isTrending
                id={id}
                category={category}
                rating={rating}
                title={title}
                year={year}
            />
        </a>
    )
}
