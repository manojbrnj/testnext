'use server'
import Link from 'next/link';
import React from 'react';
import {BlogWithUser} from './ListBlogs';
import Image from 'next/image';
import UserSummery from './UserSummery';
import Tag from '../common/Tag';
import Reactions from './Reactions';
import { auth } from '@/auth';

async function BlogCard({
  blog,
  isUserProfile,
}: {
  blog: BlogWithUser;
  isUserProfile?: boolean;
}) {
  // console.log("BLOG", blog);
  //console.log("BLOG _COUNT", blog?._count);
  //console.log("BLOG CLAPS", blog?.claps);
const session = await auth();
const userId = session?.user?.id;
const isOwner = userId === blog.userId;
const isAdmin = session?.user?.role === 'ADMIN';


  return (
    <div className='border-b border-slate-300 dark:border-slate-700 py-6 cursor-pointer '>
      <div className ='flex items-center justify-between'>
        {blog.user && (
          <UserSummery
            user={blog.user}
            createdDate={blog.createdAt}
          ></UserSummery>
        )}
        {isOwner && isUserProfile && !blog.isPublished && <p className='text-rose-500'>Draft</p>}
        {(isOwner || isAdmin) && isUserProfile && <Link href={`/blog/edit/${blog.id}`} className='text-blue-500 hover:underline'>Edit</Link>} {/* This is for editing the blog */}
      </div>

      <div className='my-2 flex justify-between gap-6'>
        <div className='flex flex-col justify-between w-full'>
          <Link
            href={`/blog/details/${blog.id}`}
            className='text-xl sm:text-2xl font-bold'
          >
            {blog.title}
          </Link>
          {!!blog.tags.length && (
            <div className='flex flex-wrap items-center gap-2 py-2'>
              {blog.tags.map((tag) => {
                return (
                  <span key={tag}>
                    <Tag key={tag}>{tag}</Tag>
                  </span>
                );
              })}
            </div>
          )}

          <Reactions blog={blog} />
        </div>
        {!!blog.coverImage && (
          <Link
            href={`/blog/details/${blog.id}`}
            className='w-full max-w-[160px] h-[100px] relative overflow-hidden'
          >
            <Image
              src={blog.coverImage}
              key={blog.title}
              fill
              alt={blog.title}
              className='object-cover rounded-md'
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default BlogCard;
