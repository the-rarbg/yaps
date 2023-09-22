import React from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

export function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const CardExpanded = props => {
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
      className={` my-3 mt-6 inline-flex md:h-44 cursor-pointer flex-col justify-center overflow-hidden rounded-md py-2 ${
        theme === 'dark' ? 'bg-card ' : ' bg-app-shady-white'
      }   fab zoomcss grid_hover_effect hover:border-primary/50`}
      style={{ width: '200px' }}>
      <div
        className='imagefit mx-auto  inline-flex h-44 w-44 items-center justify-center rounded bg-cover '
        style={{
          backgroundImage: `url("${
            props.item[`t`]
              ? props.item[`t`]
              : props.categoryId === 'XXX'  
              ? 'https://i.therarbg.com/xnp.jpg'
              : 'https://i.therarbg.com/np.jpg'
          }")`,
        }}></div>
      <br />
      <div
        className='long-and-truncated h-auto w-fit break-all pt-1.5 text-[12px] font-light text-black dark:text-white'
        style={{ fontSize: '12px' }}>
        <span>{name}</span>
      </div>
      <div
        className='long-and-truncated flex h-auto justify-between pt-1.5 text-[10px] font-light text-black dark:text-white'
        style={{ fontSize: '10px' }}>
        <span>{props.item['c'] || props.categoryId}</span>
        <span>・</span>
        <span>
          {time.getDate()}-{time.getMonth() + 1}-{time.getFullYear()}
        </span>
        <span>・</span>
        <span>{formatBytes(props.item['s'])}</span>
      </div>
    </div>
  )
}

export default CardExpanded
