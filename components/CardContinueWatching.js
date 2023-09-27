import {useRouter} from 'next/router'
import CardImageCW from "./CardImageCW";
import CardInfoCW from "./CardInfoCW";

export default function CardContinueWatching({
                                                 id,
                                                 category,
                                                 year,
                                                 src,
                                                 title,
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
        <a className='relative w-full cursor-pointer' target={"_blank"} onClick={handleClick}>
            <CardImageCW isTrending src={src}/>
            <CardInfoCW
                id={id}
                category={category}
                title={title}
                year={year}
            />
        </a>
    )
}
