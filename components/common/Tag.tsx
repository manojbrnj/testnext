'use client';
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import queryString, { StringifiableRecord } from "query-string";
import React, { useCallback } from "react"

interface TagProps{
  children:React.ReactNode,
  selected?:boolean
}

function Tag({children,selected}:TagProps) {
    const router = useRouter(); 
  const params = useSearchParams();
//  console.log("SEARCH PARAMS>>>",queryString.parse(params.toString()));
  const handleClick = useCallback(()=>{
if(children === "ALL"){
  router.push('/blog/feed/1');
}
else{
  let currentQuery ={}
  if(params){
    currentQuery = queryString.parse(params.toString());

  }
  const updatedQuery:StringifiableRecord | undefined ={
    ...currentQuery,
     tag: typeof children === "string" ? children : String(children),
  
  }

  const url =queryString.stringifyUrl({
    url: '/blog/feed/1',
    query:updatedQuery
  },{
    skipNull:true
  })
  router.push(`${url}`);
}

  },[children,router,params])

  return (
    <span className={cn("bg-secondary px-2 py-1 rounded text-sm cursor-pointer",
     selected && "bg-primary text-secondary"
    )} onClick={handleClick}>{children}</span>
  )
}

export default Tag