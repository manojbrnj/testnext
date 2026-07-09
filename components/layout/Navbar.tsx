'use client'
import {cn} from '@/lib/utils';
import React, { useEffect } from 'react';
import Container from './Container';
import ThemeToggle from './ThemeToggle';
import { PiPulseBold } from 'react-icons/pi';
import Notifications from './Notifications';
import UserButton from './UserButton';
import SearchInput from './SearchInput';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Tags from './Tags';

function Navbar() {
  const session = useSession();
  const isLoggedIn = session?.status === 'authenticated';
  const path = usePathname();
  const router = useRouter();
    const isFeedPage = path.includes('/blog/feed');
 
  //console.log("session>>>>",session);
  useEffect(()=>{
    if(!isLoggedIn && path){
    const updateSession = async ()=>{
      await session.update();
    }
    updateSession();
    }

  },[path,isLoggedIn])
  //console.log(session);
  return (
    <nav className={cn(' w-full sticky top-0 border-b z-50 bg-white dark:bg-slate-950')}>
      <Container>
        {/* logo */}
      <div className={cn('flex justify-between items-center gap-8')}  >
        <div className='flex gap-1 items-center cursor-pointer' onClick={()=>router.push("/blog/feed/1")}>
          {/* icon */}
        <PiPulseBold size={24}/>
          {/* name */}
          <div className='font-bold text-xl'>Voam</div>
        </div>
        {/* search input */}
        {isFeedPage && <SearchInput/>}
    
        {/* three part div */}
        <div className='flex gap-5 items-center sm:gap-8'>
          <ThemeToggle/>
          {isLoggedIn && <Notifications/>}
         {isLoggedIn && <UserButton/>}
         {!isLoggedIn &&  <>
          <Link href='/login'>Login</Link>
          <Link href='/register'>Register</Link>
          {/* <RegisterButton/> */}
</>}
        </div>
      </div>
      </Container>
<Tags></Tags>
    </nav>
  );
}

export default Navbar;
