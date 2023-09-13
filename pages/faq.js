import React, { useState } from 'react'
import { useRouter } from 'next/router'
const faqData = [
  {
    question: 'torrent',
    answer: 'answer',
  },
  {
    question: 'torrent',
    answer: 'answer',
  },
  {
    question: 'torrent',
    answer: 'answer',
  },
  {
    question: 'torrent',
    answer: 'answer',
  },
]

const FAQ = () => {
  // const router = useRouter()
  const [openIndices, setOpenIndices] = useState([])

  const toggleAnswer = index => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter(i => i !== index))
    } else {
      setOpenIndices([...openIndices, index])
    }
  }
  return (
    <div>
      <h1 className='mb-10 text-2xl font-bold text-center text-white'>
        FAQ Page
      </h1>
      <div className='mx-auto w-[80vw]'>
        <div className='grid grid-cols-1 gap-x-2 gap-y-6 md:grid-cols-2'>
          {faqData.map((item, index) => {
            return (
              <div
                key={index}
                className={` cursor-pointer rounded-lg bg-[#171E31] px-4 py-5 shadow-md `}
                onClick={() => toggleAnswer(index)}>
                <div className='flex items-center justify-between '>
                  <h3 className='text-xl font-medium text-white '>
                    {item.question}
                  </h3>
                </div>
                {openIndices.includes(index) && (
                  <div className='mt-6 text-gray-500'>{item.answer}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FAQ
