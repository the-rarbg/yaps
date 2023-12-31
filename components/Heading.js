import Link from 'next/link'


export default function Heading({
                                    href,
                                    isHomePage,
                                    isTrending, // TODO: Do we need this here?
                                    media_type,
                                    clearHistoryFunction,
                                    iscontinue_watching,
                                    title,
                                }) {
    return (
        <div className='mb-4 flex items-end justify-between sm:mb-6'>
            {isHomePage ? (
                <div className='flex items-end'>
                    <h2 className='section-title py-px sm:py-0 text-app-dark-blue dark:text-app-pure-white'>{title}</h2>
                    {media_type && <p
                        className={
                            media_type === 'movie'
                                ? 'ml-2 rounded-md border-2 py-px px-2 text-[8px] font-light border-app-dark-blue dark:border-app-pure-white uppercase tracking-wider text-app-dark-blue dark:text-app-pure-white sm:ml-4 sm:text-[10px]'
                                : 'ml-2 rounded-md border-2 border-app-dark-blue dark:border-app-pure-white dark:bg-app-dark-blue bg-light-white py-px px-2 text-[8px] font-light uppercase tracking-wider dark:text-app-pure-white text-app-dark-blue sm:ml-4 sm:text-[10px] '
                        }>
                        {media_type}
                    </p>}
                </div>
            ) : (
                <h2 className='section-title'>{title}</h2>
            )}
            {iscontinue_watching &&
                <div onClick={clearHistoryFunction}
                     className='cursor-pointer text-xs font-medium uppercase tracking-wide text-app-greyish-blue hover:underline'>
                    Clear history
                </div>
            }
            {href && <Link href={href} as={href} passHref>
                <a className='cursor-pointer text-xs font-medium uppercase tracking-wide text-app-greyish-blue hover:underline'>
                    See more
                </a>
            </Link>}
        </div>
    )
}
