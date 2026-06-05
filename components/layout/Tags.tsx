import { tags } from '@/lib/tags'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import Tag from '../common/Tag'
import './Tags.css'
function Tags() {
const params = useSearchParams();
const tag = params.get('tag');
const pathname = usePathname();
   const isFeedPage = pathname.includes('/blog/feed');
  if(!isFeedPage) return null;
  return (
  <div className='border-t'>
    <div className='flex max-w-[1920px] w-full px-4 xl:px-20 mx-auto pt-4 pb-0 items-center '>
      <div className='flex flex-row items-center justify-start gap-6 sm:gap-12 overflow-x-auto pb-4 tags-container '>
        {
        tags.map((item)=>{
          return <Tag key={item} selected={tag===item || (tag===null && item === 'ALL')} >{item}</Tag>
        })
        }
      </div>
    </div>
  </div>
  )
}

export default Tags