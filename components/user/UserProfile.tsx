'use server'
import {User} from '@prisma/client';
import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar';
import {Calendar, CalendarHeart, UserRound} from 'lucide-react';
import moment from 'moment';
import { getBlogsByUserId } from '@/actions/blogs/get-blogsBytUserId';
import Alert from '../common/Alert';
import ListBlogs from '../blog/ListBlogs';
import EditProfileButton from './EditProfileButton';
import Tag from '../common/Tag';

async function UserProfile({user, page}: {user: User; page: string}) {
  const currentPage  = parseInt(page,10)||1;
  const {success,error} = await getBlogsByUserId({page:currentPage,limit:5, userId: user?.id})
  return (
    <div className='max-w-[1200px] m-auto p-4'>
      <div className='flex justify-between gap-6 '>
        <div className='flex items-start sm:items-center gap-6 flex-col sm:flex-row'>
          <Avatar className='w-20 h-20  '>
            <AvatarImage src={user?.image ? user?.image : ''} />
            <AvatarFallback className='border-2 border-slate-500 dark:border-slate-50'>
              <UserRound />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-2'>
            <h1 className=' text-lg sm:text-3xl font-bold'>{user?.name}</h1>
            {user?.bio && <p>{user.bio}</p>}
            <div className='flex items-center gap-2'>
              <span>Followers</span>
              <span>Following</span>
            </div>
          </div>
        </div>

        <div>
          <EditProfileButton  user={user}></EditProfileButton>
        </div>
      </div>
      <div className='flex gap-4 flex-col items-center justify-center p-6 border-y mt-6 flex-wrap'>
        <div className='flex gap-6 items-center justify-center flex-wrap' >
           <span >
            Id: <span className='bg-secondary ml-2 py-1 px-2 rounded text-sm tracking-widest'>{user?.id}</span> 
           </span>
           <span >
            Email: <span className='bg-secondary ml-2 py-1 px-2 rounded text-sm tracking-widest'>{user?.email}</span> 
           </span>
          
        </div>
        <div className='flex justify-center items-center gap-2'>
          <Calendar  size={18} /> Member Since {moment(user?.createdAt).format('DD MM YYYY')}
        </div>
      </div>
        <div>
          {!!user.tags.length && <div className='flex items-center justify-center p-6 border-b mb-6 gap-4 flex-wrap'>
            {user.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>}
        </div>
        <div>
          {error && <Alert error message='error fetching user blog'/>}
          {success && <ListBlogs blogs={success.blogs} hasMore={success.hasMore} page={currentPage} isUserProfile={true} />}
          
        </div>
    </div>
  );
}

export default UserProfile;
