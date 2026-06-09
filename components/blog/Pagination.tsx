'use client'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'
import queryString from'query-string'

function Pagination({page,hasMore,isUserProfile}:{page:number,hasMore:boolean,isUserProfile?:boolean}) {

  const searchParams =  useSearchParams();
  const params = useParams();
  const currentQuery = queryString.parse(searchParams.toString());
  const searchParamsUrl = queryString.stringifyUrl({url: '', query: currentQuery})

  if(isUserProfile){
    
    return (
      <>
         <div className='flex justify-between mt-4'>
          {page > 1 && (
            <Link href={`/user/${params.id}/${page - 1}`}>
            
              <span>Prev</span>
            </Link>
          )}
  
          {hasMore && (
            <Link href={`/user/${params.id}/${page + 1}`}>
           
              <span>Next</span>
            </Link>
          )}
        </div></>
    )
  }
  return (
    <>
       <div className='flex justify-between mt-4'>
        {page > 1 && (
          <Link href={`/blog/feed/${page - 1}${searchParamsUrl}`}>
          
            <span>Prev</span>
          </Link>
        )}

        {hasMore && (
          <Link href={`/blog/feed/${Number(page) + 1}${searchParamsUrl}`}>
         
            <span>Next</span>
          </Link>
        )}
      </div></>
  )
  
}

export default Pagination