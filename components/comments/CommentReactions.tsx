'use client'
import { cn } from '@/lib/utils';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { CommentWithUser } from './ListComments';
import { FaHandsClapping } from 'react-icons/fa6';
import { BsReply } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { deleteComment } from '@/actions/comments/delete-comment';
import toast from 'react-hot-toast';
import { PiHandsClapping } from 'react-icons/pi';
import { clamComment } from '@/actions/comments/clap-comment';

interface CommentReactionsProps{
  comment:CommentWithUser
  isReply?:boolean
  setShowForm: Dispatch<SetStateAction<boolean>>
  setShowReplies?: Dispatch<SetStateAction<boolean>>    
}


function CommentReactions({comment,setShowForm,setShowReplies,isReply}:CommentReactionsProps) {
const session = useSession();
const userId = session.data?.user.id;
const [clapCount,setClapCount] =  useState<number>(comment._count.claps);
const [userHasClapped,setUserHasClapped] = useState<boolean>(!!comment.claps.length);

const handleReply = () => {
  if(!userId){
    return toast.error("You must be logged in to reply");
  }
  setShowForm(prev =>!prev);
  //setShowReplies(false);
};

const handleShowReplies = () => {
 
  if(setShowReplies){
    setShowReplies(prev =>!prev);
   // setShowForm(false);
  }
};

//delete comment 
const handleDelelte = async ()=>{
  if(userId){
    const res = await deleteComment(comment.id);
    if(typeof res !== 'string' && res.success){
      toast.success("comment deleted successfully");

    } 

  }
}

//handle clap

const handleClap =async()=>{
  if(!userId){
    alert("Please login to clap");
    return;
  }
  setClapCount((prevCount)=> userHasClapped ? prevCount - 1 : prevCount + 1);
  setUserHasClapped((prevHasClapped)=> !prevHasClapped);
  await clamComment(comment.id,userId);
 
}

  return (
    <div className={cn('flex justify-between items-center w-full text-sm mt-2 gap-4 ',isReply && 'justify-start ml-2')}>
      <div className="flex items-center gap-4">
        <span onClick={handleClap} className="flex items-center gap-1 cursor-pointer">
         {userHasClapped ? <FaHandsClapping size={20}/> : <PiHandsClapping size={20}/>}
         {clapCount}
        </span>
        
        {!isReply && <span onClick={handleShowReplies} className="flex item-center gap-1 cursor-pointer"><FaRegComment size={20} /> Replies {comment._count.replies}</span>}
      </div>
      <div className="flex items-center">
        <span onClick={handleReply} className="flex items-center gap-1 cursor-pointer mr-4 "><BsReply size={20} />Reply</span>
        {userId === comment.userId && <span onClick={handleDelelte} className='cursor-pointer'><MdDeleteOutline size={20}/></span>}
      </div>
    </div>
  );
}

export default CommentReactions;
