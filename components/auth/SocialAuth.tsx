import { FaGithub, FaGoogle } from 'react-icons/fa'
import Button from '../common/Button'
import { signIn } from 'next-auth/react'
import { LOGIN_REDIRECT } from '@/routes'

function SocialAuth() {
  const handleOnClick =((provider:'google'|'github')=>{
    signIn(provider,{redirectTo:LOGIN_REDIRECT})

  })
  return (
    <div className='flex justify-between gap-2 flex-col md:flex-row'>
      <Button type='button' label='Continue with Github' outlined icon={FaGithub} onClick={()=>{handleOnClick('github')}}/>
      <Button type='button' label='Continue with Google' outlined icon={FaGoogle}  onClick={()=>{handleOnClick('google')}}/>
      
    </div>
  )
}

export default SocialAuth