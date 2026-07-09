'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { UserWithFollowers } from './UserProfile';
import UserSummery from '../blog/UserSummery';
import FollowButton from './FollowButton';

function FollowersList({user}:{user:UserWithFollowers}) {
  return (
    <div>
      <Dialog>
  <DialogTrigger>
    <span>
      {user._count.followers} Followers
    </span>
  </DialogTrigger>
  <DialogContent className='max-w-[500px] w-[90%]'>
    <DialogDescription>
      
    </DialogDescription>
    <DialogHeader>
      <DialogTitle>Follwers</DialogTitle>
      
    </DialogHeader>
<div>
  {user.followers.map((item)=>{
 // console.log(item)
    return (<div key={item.follower.id} className='flex gap-4 items-center justify-between'>
    <UserSummery user={item.follower}/>
    <FollowButton user={item.follower}  isFollowing={!!item.follower.followers.length} isList={true}/>
    </div>)
  })}
</div>
  </DialogContent>
</Dialog>
  
    </div>
  )
}

export default FollowersList