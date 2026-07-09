'use client'
import React from 'react'
import Button from '../common/Button'
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';

function EditProfileButton({user}:{user:User}) {
  const router = useRouter();
 
  return (
    <Button label='Edit' onClick={()=>router.push(`/user/edit/${user.id}`)}></Button>
  )
}

export default EditProfileButton