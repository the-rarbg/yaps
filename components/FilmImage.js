import Image from 'next/image'
import { shimmer, TMDB_IMAGE_ENDPOINT, toBase64 } from '../utils'

export default function FilmImage({ src, title }) {
  return (
    <section className='px-20 text-center md:pr-8 md:pl-0 lg:w-2/5'>
      <Image
        className='rounded-lg'
        src={`${TMDB_IMAGE_ENDPOINT}/${src}`}
        alt={title}
        width={350}
        height={530}
        placeholder='blur'
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(350, 530))}`}
        unoptimized
      />
    </section>
  )
}
