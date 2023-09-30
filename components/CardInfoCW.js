import {renderYear} from "../pages/movie/[id]";
import {renderCategoryIcon, renderCategoryText} from "./CardInfo";

export default function CardInfoCW({
                                     category,
                                     title,
                                     rating,
                                     year,
                                 }) {
    return (
        <div
            className={
                'absolute left-4 bottom-4 z-40 h-fit w-full truncate text-ellipsis '
            }
        >
            <div
                className={
                    'mt-2 mb-1 flex text-[11px] font-light text-app-pure-white md:text-[15px]'
                }
            >
                <p>{renderYear(year)}</p>
                <div
                    className={
                        'flex items-center px-[8px] before:content-["•"]'
                    }
                >
                    {renderCategoryIcon(category)}
                    <p className={ 'pl-[6px] pr-[6px]' }>
                        {renderCategoryText(category)}
                    </p>
                </div>
                {/*TODO: Add this back only after I find an appropriate way to get the rating info from TMDB api */}
                {/*<p>{renderRating(rating)}</p> */}
            </div>
            <h2
                className={
                    'md:heading-sm text-ellips w-[200px] truncate text-sm font-bold capitalize text-app-pure-white sm:w-[420px] md:h-6'
                }
            >
                {title}
            </h2>
        </div>
    )
}

