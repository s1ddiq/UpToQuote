'use client'
import { fetchQuotes } from '@/api/api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const QuotesPage = () => {
  const [quotes, setQuotes] = useState<{ quote: string, author: string, category: string }[]>([]);

  useEffect(() => {
    const func = async () => {
        const response = await fetchQuotes();
        setQuotes(response);
        console.log(response);
    }
    func()
  }, [])

  return (
    <div className='flex justify-center items-center w-full h-screen flex-col'>
      {quotes.map((quote, index) => (
        <div key={index} className='w-full px-24 relative'>
            <p className='text-xl text-center'>{quote.quote}</p>
            <p className='float-right text-2xl'> - {quote.author}</p>
            {/* <p className='opacity-80'>{quote.category}</p> */}
        </div>
      ))}
    </div>
  )
}

export default QuotesPage
