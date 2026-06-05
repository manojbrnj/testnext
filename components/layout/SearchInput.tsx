'use client';
import { Search } from 'lucide-react'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { Input } from '../ui/input'
import queryString from 'query-string';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounceValue } from '@/hooks/useDebounceValue';


function SearchInput() {
  const params = useSearchParams();
  const title = params.get('title');
  const [value,setValue] = useState<string>(title || '');
  const router = useRouter();
  const debouncedValue = useDebounceValue<string>(value);
  
  const handleChange:ChangeEventHandler<HTMLInputElement> = (e)=>{

setValue(e.target.value);
  }
  // debouncing 
  useEffect(()=>{
  
    //console.log("called>>>>>")

        let currentQuery ={}
          if(params){
            currentQuery = queryString.parse(params.toString());
        
          }
          const updatedQuery:any ={
            ...currentQuery,
            title:debouncedValue
          
          }
        
          const url =queryString.stringifyUrl({
            url: window.location.href,
            query:updatedQuery
          },{
            skipNull:true,
            skipEmptyString:true
          })
          router.push(`${url}`);

  
     
   
  },[debouncedValue])

  

  
  return (
    <div className='relative hidden sm:block '>
      <Search className='absolute top-2.5 left-4 w-4  h-4 text-muted-foreground'/>
      <Input placeholder='Search...' className='pl-10 bg-primary/10 ' onChange={handleChange} value={value}/>
    </div>
  )
}

export default SearchInput