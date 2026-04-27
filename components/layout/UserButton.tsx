import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Shield, User, UserRound } from 'lucide-react'
import { FaRegBookmark } from 'react-icons/fa'

function UserButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src='#'>
          </AvatarImage>
            <AvatarFallback className='border-2 border-slate-500 dark:border-slate-50' >
              <UserRound>
              
              </UserRound>
            </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <button className='flex items-center gap-2'>
            <User size={18}></User> Profile
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <button className='flex items-center gap-2'>
            <FaRegBookmark size={18}></FaRegBookmark> Bookmark
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <button className='flex items-center gap-2'>
            <Shield size={18}></Shield> Admin
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <button className='flex items-center gap-2'>
            <User size={18}></User> Sign out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton