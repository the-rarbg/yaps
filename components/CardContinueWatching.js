import {useRouter} from 'next/router'
import CardImageCW from "./CardImageCW";
import CardInfoCW from "./CardInfoCW";
import {AiOutlineClose} from "react-icons/ai";

export default function CardContinueWatching({
                                                 id,
                                                 category,
                                                 year,
                                                 src,
                                                 clearHistoryFunction,
                                                 title,
                                             }) {
    const router = useRouter()

    const handleClick = (e) => {
        if (e.target.tagName !== "svg") {
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
        else{
            e.preventDefault()
        }
    }

    return (
        <div className='relative w-full cursor-pointer test'>
            <div className={"relative continue-card w-full transition duration-400 ease-in-out"}  onClick={handleClick}>
                <CardImageCW isTrending src={src}/>
                <CardInfoCW
                    id={id}
                    category={category}
                    title={title}
                    year={year}
                />
            </div>
            <div onClick={() => {
                clearHistoryFunction(id, category)
            }}
                 data-id={"close-btn"}
                 className={"text-black grid place-items-center close-button w-6 h-6 opacity-20 bg-app-shady-white top-2 right-2 rounded-full absolute"}>
                <AiOutlineClose/>
            </div>
        </div>
    )
}
