'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { UserWithFollowers } from './UserProfile';
import UserSummery from '../blog/UserSummery';
import FollowButton from './FollowButton';

function FollowingList({user}:{user:UserWithFollowers}) {
  return (
    <div>
      <Dialog>
  <DialogTrigger>
    <span>
      {user._count.followings} Following
    </span>
  </DialogTrigger>
  <DialogContent className='max-w-[500px] w-[90%]'>
    <DialogHeader>
      <DialogTitle>Follwings</DialogTitle>
      
    </DialogHeader>
<div>
  {user.followings.map((item)=>{
  //.log(item)
    return (<div key={item.following.id} className='flex gap-4 items-center justify-between'>
    <UserSummery user={item.following}/>
    <FollowButton user={item.following}  isFollowing={!!item.following.followers.length} isList={true}/>
    </div>)
  })}
</div>
  </DialogContent>
</Dialog>
  
    </div>
  )
}

export default FollowingList