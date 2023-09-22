import React, { useEffect } from 'react'
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
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  let name = props.item[`name`]
  let time = new Date(props.item[`timestamp`])
  return (
    <div
      onClick={() => {
        if (props?.blur == true) {
          props?.setBlur(false)
          return
        }
        let slug = name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
        router.push(`/post-detail/${props.item?.eid}/${slug}/`)
      }}
      key={props.index}
      className={`zoom grid_hover_effect my-3 mt-6 scale-125 cursor-pointer overflow-hidden py-2 ${
        theme === 'dark' ? 'bg-app-semi-dark-blue' : 'bg-app-shady-white'
      } fab zoomcss inline-flex flex-col justify-center   rounded-md  hover:border-primary/50 hover:dark:bg-primary/10 `}
      style={{ width: '200px' }}>
      <div
        className='imagefit mx-auto inline-flex h-44 w-40 items-center justify-center rounded bg-cover brightness-100'
        style={{
          backgroundImage: `url("${
            props.item[`thumbnail`]
              ? props.item[`thumbnail`]
              : props.categoryId === 'XXX'
              ? 'https://i.therarbg.com/xnp.jpg'
              : 'https://i.therarbg.com/np.jpg'
          }")`,
        }}></div>
      <br />
      <div
        className='k long-and-truncated h-auto w-fit break-all pt-1.5 font-light text-black hover:text-app-dark-blue dark:text-white '
        style={{ fontSize: '12px' }}>
        <span>{props?.item?.name}</span>
      </div>
      <div
        className='s long-and-truncated flex h-auto justify-between pt-1.5 font-light text-black hover:text-app-dark-blue dark:text-white '
        style={{ fontSize: '10px' }}>
        <span>{props.item['c'] || props.categoryId}</span>
        <span>・</span>
        <span>
          {time.getDate()}-{time.getMonth() + 1}-{time.getFullYear()}
        </span>
        <span>・</span>
        <span>{formatBytes(props.item['size'] || props.item['s'])}</span>
      </div>
    </div>
  )
}

export default CardExpanded
