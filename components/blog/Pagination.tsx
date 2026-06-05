'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import queryString from'query-string'

function Pagination({page,hasMore}:{page:number,hasMore:boolean}) {

  const params =  useSearchParams();
  const currentQuery = queryString.parse(params.toString());
  const searchParams = queryString.stringifyUrl({url: '', query: currentQuery})
  return (
    <>
       <div className='flex justify-between mt-4'>
        {page > 1 && (
          <Link href={`/blog/feed/${page - 1}${searchParams}`}>
          
            <span>Prev</span>
          </Link>
        )}

        {hasMore && (
          <Link href={`/blog/feed/${Number(page) + 1}${searchParams}`}>
         
            <span>Next</span>
          </Link>
        )}
      </div></>
  )
}

export default Pagination