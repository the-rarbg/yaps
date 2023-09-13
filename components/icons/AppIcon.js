import { useRouter } from "next/router"

export default function AppIcon() {
  const router = useRouter()
  return (
    <svg
      className={`h-[20px] w-[25px] lg:h-[25.6px] lg:w-[32px] ${router.pathname == '/' ? 'active-link' : 'icon-nav'}`}
      data-tooltip-id="my-tooltip"
      data-tooltip-content="Home"
      width='1em'
      height='1em'
      viewBox='0 0 33 27'
      fill='currentColor'
      
    >
      <path
         d='m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z'
        
      />
    </svg>
  )
}
