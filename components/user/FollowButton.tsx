'use client'
import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import axios from 'axios';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';







function FollowButton({user,isFollowing:following,isList=false}:{user:User | Pick<User,'id'|'name'|'image'>,isFollowing:boolean,isList?:boolean}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFollowing,setIsFollowing] = useState<boolean>(following);
  const router = useRouter();
  useEffect(()=>{
    setIsFollowing(following)
  },[following])
  const handleFollow = async () => {
   try {
       setLoading(true);
       const res = await axios.post(`/api/follow`,{followId:user.id})
       if(res.data.success === 'followed'){
        setIsFollowing(true);
        //send a notification
       }else if(res.data.success === 'unfollowed'){
        setIsFollowing(false);      

       }
       router.refresh();
   } catch (error) {
     // toast.error(error.response.data.error)
    console.log(error)
   }finally{
    setLoading(false);
   }


  }
  return (
    <Button
      outlined
      label={loading ? 'Loading...' : isFollowing ? 'unFollow' : 'Follow'}
      onClick={handleFollow}
      disabled={loading}
      small={isList}

    ></Button>
  );
}

export default FollowButton;
