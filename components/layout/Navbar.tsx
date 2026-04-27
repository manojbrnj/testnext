import {cn} from '@/lib/utils';
import React from 'react';
import Container from './Container';
import ThemeToggle from './ThemeToggle';
import { MdNoteAlt } from 'react-icons/md';
import { BiPulse } from 'react-icons/bi';
import { PiPulseBold } from 'react-icons/pi';
import Notifications from './Notifications';
import UserButton from './UserButton';
import SearchInput from './SearchInput';
import Link from 'next/link';
import RegisterButton from './RegisterButton';

function Navbar() {
  return (
    <nav className={cn(' w-full sticky top-0 border-b z-50 bg-white dark:bg-slate-950')}>
      <Container>
        {/* logo */}
      <div className={cn('flex justify-between items-center gap-8')}>
        <div className='flex gap-1 items-center cursor-pointer'>
          {/* icon */}
        <PiPulseBold size={24}/>
          {/* name */}
          <div className='font-bold text-xl'>Voam</div>
        </div>
        {/* search input */}
        <SearchInput/>
        {/* three part div */}
        <div className='flex gap-5 items-center sm:gap-8'>
          <ThemeToggle/>
          <Notifications/>
          <UserButton/>
          <>
          <Link href='/login'>Login</Link>
          <Link href='/register'>Register</Link>
          {/* <RegisterButton/> */}
</>
        </div>
      </div>
      </Container>

    </nav>
  );
}

export default Navbar;
