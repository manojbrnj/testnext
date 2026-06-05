import {User} from '@prisma/client';
import Link from 'next/link';
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar';
import {UserRound} from 'lucide-react';
import moment from 'moment';

export interface UserSummeryProps  {
user :Pick<User,'id' | 'name' | 'image'>,
createdDate?:Date
}

function UserSummery({user, createdDate}: UserSummeryProps) {
  return (
    <Link href={`/user/${user.id}/1`} className='flex gap-2 items-center'>
      <Avatar>
        <AvatarImage src={user.image || ''} alt={user.name || ''} />
        <AvatarFallback className='border-2 border-slate-500 dark:boder-slate-50'>
          <UserRound />
        </AvatarFallback>
      </Avatar>
      <div className='text-sm flex items-center gap-2'>
    <p className="">    {user.name}</p>
        {createdDate && <p>{moment(new Date(createdDate)).fromNow()}</p> }

      </div>
    </Link>
  );
}

export default UserSummery;
