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
function cleanMovieNames(movieName) {
  const pattern =
    /(2160p|1080p|720p|360p|4320p|H265|BluRay|Rip|10 bit|DV|HDR10|ita|eng|AC3|5\.1|sub|Licdom|UpScaled|5 1|su)/gi

  const cleanedNames = movieName.replace(pattern, '').trim()

  return cleanedNames
}

const Card = props => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  let name = props.item[`name`]
  let time = new Date(props.item[`timestamp`])
  return (
    <div
      onClick={() => {
        if (props?.page === 'dashboard' || props?.blur) {
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
      style={{ marginBottom: '20px' }}
      className={` my-2 ${
        props?.page === 'dashboard' ? '' : 'cursor-pointer'
      } ${
        theme === 'dark' ? 'bg-card' : 'bg-app-shady-white'
      }  hover_effect flex w-full  flex-col justify-center !overflow-visible rounded-md py-2 hover:border-primary/50 hover:bg-primary/50  md:flex-row `}>
      <div className='flex  p-2'>
        <div
          className='imagefit  mx-auto ml-2 inline-flex items-center justify-center rounded bg-cover'
          style={{
            backgroundImage: `url("${
              props.item[`thumbnail`]
                ? props.item[`thumbnail`]
                : props.categoryId === 'XXX'
                ? 'https://i.therarbg.com/xnp.jpg'
                : 'https://i.therarbg.com/np.jpg'
            }")`,
            width: '50px',
            height: '50px',
          }}></div>

        <div
          className={`flex  h-auto w-[90%] items-center overflow-visible  text-ellipsis break-all pl-4 pt-1.5 text-left text-[14px] font-light text-black  dark:text-white `}>
          {cleanMovieNames(props?.item?.name)}
        </div>
      </div>

      <div
        className='shift-right long-and-truncated  flex  h-auto items-center gap-4 pt-1.5 text-[14px] font-light text-app-dark-blue dark:text-white'
        style={{ fontSize: '12px' }}>
        <span className='w-14'>{props.item['c'] || props.categoryId}</span>

        <span className='w-14'>
          {time.getDate() || ''}-{time.getMonth() + 1 || ''}-
          {time.getFullYear() || ''}
        </span>

        <span className='w-14'>{formatBytes(props.item['size'])}</span>
        {props?.page === 'dashboard' ? (
          <span
            onClick={() => {
              router.push(`/upload?data=${JSON.stringify(props?.item)}`)
            }}
            className='cursor-pointer font-light text-primary'>
            Edit
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default Card
