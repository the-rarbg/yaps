import React from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const CardCompact = props => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  let name = props.item[`n`]
  let time = new Date(props.item[`a`] * 1000)
  return (
    <div
      onClick={() => {
        let slug = name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
        router.push(`/post-detail/${props.item?.pk}/${slug}/`)
      }}
      key={props.index}
      style={{ marginBottom: '10px' }}
      className={`my-2 w-full overflow-visible  ${
        props?.page === 'dashboard' ? '' : 'cursor-pointer'
      } py-2  ${
        theme === 'dark' ? 'bg-card' : 'bg-app-shady-white'
      }   hover_effect flex flex-col justify-center rounded-md  hover:border-primary/50  hover:dark:bg-app-dark-blue  md:flex-row`}>
      <div className='flex p-2'>
        <div
          className='imagefit movie_image mx-auto ml-2 inline-flex items-center justify-center rounded bg-cover'
          style={{
            backgroundImage: `url("${
              props.item[`t`]
                ? props.item[`t`]
                : props.categoryId === 'XXX'
                ? 'https://i.therarbg.com/xnp.jpg'
                : 'https://i.therarbg.com/np.jpg'
            }")`,
            width: '50px',
            height: '50px',
          }}></div>

        <div className='line-clamp-1 flex h-auto w-full items-center overflow-visible  text-ellipsis break-all pl-4 pt-1.5 text-left text-[13px] font-extralight '>
          <span className='text-black dark:text-white'>{name}</span>
        </div>
      </div>

      <div
        className='shift-right long-and-truncated   flex h-auto items-center gap-4 pt-1.5 font-extralight text-black dark:text-white'
        style={{ fontSize: '14px' }}>
        <span className='w-14'>{props.item['c'] || props.categoryId}</span>
        <span>・</span>
        <span className='w-14'>
          {time.getDate()}-{time.getMonth() + 1}-{time.getFullYear()}
        </span>
        <span>・</span>
        <span className='w-14'>{formatBytes(props.item['s'])}</span>
      </div>
    </div>
  )
}

export default CardCompact
