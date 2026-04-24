'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes';


function ThemeToggle() {
  const {theme,setTheme} = useTheme();
 const toggleTheme = ()=>{
  setTheme(theme === 'light' ?'dark':'light')
 }
  return (
    <button onClick={toggleTheme}>
      <Sun className='hidden dark:block'/>
      <Moon className='block dark:hidden'></Moon>
    </button>
  )
}

export default ThemeToggle