import {Blog, User} from '@prisma/client';

import BlogCard from './BlogCard';
import Pagination from './Pagination';
export type BlogWithUser = Blog & {
  user: Pick<User, 'id' | 'name' | 'image'>;
  _count: {
    claps: number;
    comments: number;    
  };
  claps: { id: string }[];
  bookmarks: { id: string }[];
  
 
};

interface ListBlogsProps {
  blogs: BlogWithUser[];
  hasMore: boolean;
  totalBlogCount
  ?: number;
  page: number;
  isUserProfile?: boolean;
}

function ListBlogs({
  blogs,
  hasMore,  
  page,
  isUserProfile,
}: ListBlogsProps) {
  //console.log("BLOGLIST",blogs);
  return (
    <div className='flex flex-col max-w-[800px] m-auto justify-between min-h-[85vh] px-4 pt-2'>
      <section>
        {blogs.map((blog) => {
          return <BlogCard blog={blog} key={blog.id} isUserProfile={isUserProfile}></BlogCard>
        })}
      </section>
<Pagination page={page} hasMore={hasMore} isUserProfile={isUserProfile} ></Pagination>
      
   
    </div>
  );
}

export default ListBlogs;
