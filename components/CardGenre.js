import React from 'react'

const CardGenre = React.forwardRef(
  ({ oddBgColor = 'dark:odd:bg-app-greyish-blue ', onClick, href, text }, ref) => {
    return (
      <a
        href={href}
        onClick={onClick}
        ref={ref}
        className={`card-hover-animation m-2 flex h-44 w-44 grow items-center justify-center rounded-lg p-8 text-center text-xl text-pure-white font-light even:bg-gray-600 dark:even:bg-app-semi-dark-blue ${oddBgColor}`}
      >
        {text}
      </a>
    )
  }
)

CardGenre.displayName = 'CardGenre'
export default CardGenre
