import Image from 'next/image'
import { shimmer, toBase64 } from '../utils'

export default function CardImage({ isTrending, src, alt }) {
  return (
    <div className='relative w-full rounded-lg'>
      <div
        className={
          isTrending
            ? 'relative h-[140px] w-[240px] after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 after:bg-app-dark-blue after:opacity-50 after:content-[""] sm:h-[230px] sm:w-[470px]'
            : 'relative h-[133px] md:h-[140px] lg:h-[174px]'
        }>
        <Image
          className='rounded-lg'
          src={src}
          alt={alt}
          layout='fill'
          objectFit='cover'
          placeholder='blur'
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(240, 140)
          )}`}
          unoptimized
        />
      </div>
      {/* TODO: Add this back only after the bookmark feature is implemented */}
      {/* <div className="group absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-app-dark-blue opacity-50 hover:bg-app-pure-white hover:opacity-100">
        <IconBookmarkEmpty className="group-hover:app-transition fill-transparent stroke-app-pure-white group-hover:stroke-black" />
      </div> */}
    </div>
  )
}
