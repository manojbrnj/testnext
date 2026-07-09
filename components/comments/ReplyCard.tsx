'use client'
import { useState } from 'react';
import UserSummery from '../blog/UserSummery';
import CommentReactions from './CommentReactions';
import {CommentWithUser} from './ListComments';
import { useSession } from 'next-auth/react';
import AddCommentsForm from './AddCommentsForm';





function ReplyCard({reply}: {reply:CommentWithUser}) {
  const session = useSession();
  const userId = session.data?.user.id;
  const [showForm,setShowForm] = useState<boolean>(false)
  return (
    <div className='p-4 pr-0 flex flex-col gap-2'>
      <UserSummery user={reply.user} createdDate={reply.createdAt} />
      <p>{reply.repliedToUser && <span className="bg-secondary px-2 py-1 rounded text-sm cursor-pointer">
        @{reply.repliedToUser.name}
      
        </span>}{reply.content}</p>
        <CommentReactions comment={reply} setShowForm={setShowForm}  isReply={true}/>
        {showForm && <div className="border-1-2 pl-2 ml-4">
          
          {userId && showForm && <AddCommentsForm blogId={reply.blogId} userId={userId} parentId={reply.parentId ? reply.parentId :undefined} replyToId={reply.userId} placeholder='Add Reply'/>}
          </div>}
    </div>
  );
}

export default ReplyCard;
