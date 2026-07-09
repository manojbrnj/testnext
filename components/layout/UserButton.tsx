'use client'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Pencil, Shield, User, UserRound } from 'lucide-react'
import { FaRegBookmark } from 'react-icons/fa'
import {signOut, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'

function UserButton() {
  const session = useSession();
  const imageurl = session.data?.user.image;
  const isAdmin = (session.data?.user.role) === 'ADMIN';
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {imageurl ? (
            <AvatarImage src={imageurl} alt="User avatar" />
          ) : (
            <AvatarFallback className='border-2 border-slate-500 dark:border-slate-50'>
              <UserRound />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button onClick={()=> router.push(`/user/${session.data?.user.id}/1`)} className='flex items-center gap-2'>
            <User size={18}></User> Profile
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <button onClick={()=> router.push('/blog/create')
          } className='flex items-center gap-2'>
            <Pencil size={18}></Pencil> Create Post
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <button onClick={()=> router.push('/blog/bookmarks/1')} className='flex items-center gap-2'>
            <FaRegBookmark size={18}></FaRegBookmark> Bookmark
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        {isAdmin && <DropdownMenuItem>
          <button onClick={()=>{router.push('/admin')}} className='flex items-center gap-2'>
            <Shield size={18}></Shield> Admin
          </button>
        </DropdownMenuItem>}
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <button className='flex items-center gap-2' onClick={()=>signOut()}>
            <User size={18}></User> Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton