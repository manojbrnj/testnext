'use client';

import {CommentsSchema, CommentsSchemaType} from '@/schemas/CommentsSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTransition} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import Button from '../common/Button';
import TextAreaField from '../common/TextAreaField';
import { addComment } from '@/actions/comments/add-comments';
import {toast} from 'react-hot-toast'
interface IAddCommentProps {
  blogId: string;
  userId?: string;
  parentId?: string;
  replyToId?: string;
  placeholder?: string;
  creatorId?: string;
}
function AddCommentsForm({
  blogId,
  userId,
  parentId,
  replyToId,
  placeholder,
  creatorId,
}: IAddCommentProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<CommentsSchemaType>({
    resolver: zodResolver(CommentsSchema),
  }); 

  const onSubmit:SubmitHandler<CommentsSchemaType> =(data)=>{
    if (!userId) return;
    startTransition(() => {
      addComment({
        values: data,
        userId,
        blogId,
        parentId,
        repliedToUserId: replyToId,
      }).then((res)=>{
       if(res.error){
        return toast.error(res.error);
       }
       if(res.success) {
        toast.success('Comment added successfully');
        reset();
        
      }
      });
    });

  }

  return (
    <form className="flex flex-col my-2" onSubmit={handleSubmit(onSubmit)}>
      <TextAreaField
        id='content'
        placeholder={placeholder ? placeholder : 'Add Comment...'}
        register={register}
        errors={errors}
        disabled={isPending}
      />
      <div>
        <Button
          type='submit'
          label={isPending ? 'Submitting...' : 'Submit'}
          disabled={isPending}
        />
      </div>
    </form>
  );
}

export default AddCommentsForm;
