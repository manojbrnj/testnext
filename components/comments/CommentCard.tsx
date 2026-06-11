'use client';
import { useState } from 'react';
import UserSummery from '../blog/UserSummery';

import CommentReactions from './CommentReactions';
import {CommentWithUser} from './ListComments';
import AddCommentsForm from './AddCommentsForm';
import { useSession } from 'next-auth/react';
import ListReplies from './ListReplies';
function CommentCard({comment}:{comment:CommentWithUser}) {
  const session = useSession();
  const userId = session.data?.user.id;
const [showForm,setShowForm] = useState<boolean>(false)
const [showReplies,setShowReplies] = useState<boolean>(false)

  return (
    <div className='border-2 flex flex-col gap-2 p-4 rounded-md mt-6 '>
      <UserSummery user={comment.user} createdDate={comment.createdAt} />
      <p className='bg-slate-100 dark:bg-slate-600 py-2 px-4 rounded-md'>
        {comment.content}
      </p>
      <CommentReactions comment={comment} setShowForm={setShowForm} setShowReplies={setShowReplies}  />
      {(showForm || showReplies) && <div className="border-1-2 pl-2 ml-4">
        {showForm && <AddCommentsForm blogId={comment.blogId} userId={userId} parentId={comment.id} replyToId={comment.userId} placeholder='Add Reply'/>}
        {showReplies && userId && <ListReplies comment={comment} userId={userId}/>}
        </div>}
    </div>
  );
}

export default CommentCard;
