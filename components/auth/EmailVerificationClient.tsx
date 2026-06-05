'use client'
import { verifyEmail } from '@/actions/auth/email-varification';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Heading from '../common/Heading';
import Alert from '../common/Alert';
import Button from '../common/Button';
import { useRouter } from 'next/navigation';

function EmailVerificationClient() {
  const [error,setError] = useState<string | undefined>('')
  const [success,setSuccess] = useState<string | undefined>('')
  const [pending,setPending] = useState<boolean>(true)
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
 useEffect(()=>{
  setPending(true);
  if(!token) return setError('Missing verification token');
  verifyEmail(token).then((res)=>{
    setSuccess(res.success);
    setError(res.error);
   
  })
  setPending(false);
 },[token])
  return (
    <div className="border-2 rounded-md p-2 flex flex-col gap-2 items-center my-8 max-w-[400px] mx-auto">
      <Heading title='Voam Email verification' center>

      </Heading>
      {pending && <div>verify email...</div>}
    
      {success && <Alert success message={success} ></Alert>}
      {error && <Alert error message={error} ></Alert>}
      {success && <Button type='submit' label='Login' disabled={pending} onClick={()=>{
        router.push('/login')
      }}></Button>}
    </div>
  )
}

export default EmailVerificationClient