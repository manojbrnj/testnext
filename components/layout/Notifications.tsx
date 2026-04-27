import React from 'react';
import {DropdownMenu, DropdownMenuTrigger,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuSeparator} from '../ui/dropdown-menu';
import { Bell } from 'lucide-react';

function Notifications() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className='relative'>
          <div className='absolute bg-rose-500 h-6 w-6 rounded-full text-sm flex items-center justify-center bottom-2 left-2'>
            <span >5</span>
          </div>
          {/* NOTIFICATION ICON */}
          <Bell size={20}></Bell>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[100%] max-w-[400px]'>
          <div className='flex gap-4 justify-between mb-2 p-2' >
            <h3 className='font-bold text-lg'>Notification</h3>
            <button> Mark all as read</button>
          </div>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Notifications;
