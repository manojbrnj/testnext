'use client';

import {BlogSchema, BlogSchemaType} from '@/schemas/BlogSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSession} from 'next-auth/react';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormField from '../common/FormField';
import AddCover from './AddCover';
import {useEffect, useState, useTransition} from 'react';
import CoverImage from './CoverImage';
import {tags} from '@/lib/tags';
import BlockNoteEditor from './editor/BlogNoteEditor';
import Button from '../common/Button';
import Alert from '../common/Alert';
import {createBlog} from '@/actions/blogs/create-blog';
import {Blog} from '@prisma/client';
import {editBlog} from '@/actions/blogs/edit-blog';
import {deleteBlog} from '@/actions/blogs/delete-blog';
import {useEdgeStore} from '@/lib/edgestore';
import { useRouter } from 'next/navigation';

import type { Block } from "@blocknote/core";

function CreateBlogForm({blog}: {blog?: Blog}) {
  const session = useSession();
  const userId = session.data?.user.id;
  const [uploadedCover, setUploadedCover] = useState<string>();
  const [content, setContent] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPublishing, startPublishing] = useTransition();
  const [isSavingAsDraft, startSavingAsDraft] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const {edgestore} = useEdgeStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
    defaultValues: blog
      ? {
          userId: blog.userId,
          title: blog.title,
          content: blog.content,
          tags: blog.tags,
          coverImage: blog.coverImage || undefined,
          isPublished: blog.isPublished,
        }
      : {
          isPublished: false,
          userId,
        },
  });
  useEffect(() => {
    if (uploadedCover) {
      setValue('coverImage', uploadedCover, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [uploadedCover]);

  useEffect(() => {
    if (typeof content === 'string') {
      setValue('content', content, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [content]);

  useEffect(() => {
    if (blog?.coverImage) {
      setUploadedCover(blog.coverImage);
      // setValue("coverImage",blog.coverImage,{shouldValidate:true,shouldDirty:true,shouldTouch:true});
    }
  }, [blog?.coverImage]);

  const onChange = (newContent: string) => {
    const oldBlocks = JSON.parse(content || '[]');
    const newBlocks = JSON.parse(newContent || '[]');

    // const getImages = (blocks: Block[]) => {
    //   const urls: string[] = [];
    //   blocks.forEach((block) => {
    //     if (block.type === 'image' || block.type === 'video' || block.type === 'audio'|| block.type === 'file') {
    //       if (block.props?.url) urls.push(block.props.url);
    //     }
    //     if (block.content && Array.isArray(block.content)) {
    //       urls.push(...getImages(block.content));
    //     }
    //   });
    //   return urls;
    // };
    

const getImages = (blocks: Block[]) => {
  const urls: string[] = [];

  blocks.forEach((block) => {
    if (
      block.type === "image" ||
      block.type === "video" ||
      block.type === "audio" ||
      block.type === "file"
    ) {
      const url = (block.props as { url?: string }).url;

      if (url) {
        urls.push(url);
      }
    }

    if (block.children?.length) {
      urls.push(...getImages(block.children));
    }
  });

  return urls;
};

    const oldUrls = getImages(oldBlocks);
    const newUrls = getImages(newBlocks);

    const deletedUrls = oldUrls.filter((url) => !newUrls.includes(url));

    deletedUrls.forEach(async (url) => {
      try {
        await edgestore.publicFiles.delete({url});
      } catch (error) {
        console.error('Failed to delete file from edgestore:', error);
      }
    });

    setContent(newContent);

  };
  const onPublish: SubmitHandler<BlogSchemaType> = async (data) => {
    //console.log(data);
    setSuccess('');
    setError('');
    if (data.tags && data.tags.length > 4) {
      return setError('Select up to 4 tags only!');
    }
    startPublishing(() => {
      if (blog) {
        editBlog({...data, isPublished: true}, blog.id).then((data) => {
          if (data && data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        });
      } else {
        createBlog({...data, isPublished: true}).then((data) => {
          if (data && data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        });
      }
    });
  };
  const onSaveDraft: SubmitHandler<BlogSchemaType> = async (data) => {
    //console.log(data);
    setSuccess('');
    setError('');

    startSavingAsDraft(() => {
      if (blog) {
        editBlog({...data, isPublished: false}, blog.id).then((data) => {
          if (data && data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        });
      } else {
        createBlog({...data, isPublished: false}).then((data) => {
          if (data && data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        });
      }
    });
  };

  // onDelete
  const onDelete: SubmitHandler<BlogSchemaType> = async (data) => {
    //console.log(data);
    setSuccess('');
    setError('');

    startDeleting(async () => {
      // code here
      if (data.coverImage) {
        await edgestore.publicFiles.delete({url: data.coverImage});
      }
      if (blog) {
        deleteBlog(blog.id).then((res)=>{
           if(typeof res !== 'string' && res.error){
            setError(res.error);                    
           }
           if(typeof res !== 'string' && res.success){
            setSuccess(res.success);                    
           }

        })
        //router here
        router.push('/blog/feed/1');
      }
    });
  };

  return (
    <form
      className='flex flex-col justify-between max-w-[1200px] m-auto min-h-[85vh]'
      onSubmit={handleSubmit(onPublish)}
    >
      <div>
        {!!uploadedCover && (
          <CoverImage
            url={uploadedCover}
            isEditor={true}
            setUploadedCover={setUploadedCover}
          />
        )}
        {!uploadedCover && <AddCover setUploadedCover={setUploadedCover} />}

        <FormField
          id='title'
          register={register}
          errors={errors}
          placeholder='Blog Title '
          disabled={false}
          inputClassName='border-none text-5xl font-bold bg-transparent px-0'
        ></FormField>
        <fieldset className='flex flex-col border-y mb-4 py-2'>
          <legend className='mb-2 pr-2'>Select 4 Tags</legend>
          <div className='flex gap-4 flex-wrap w-full '>
            {tags.map((tag) => {
              if (tag === 'ALL') {
                return null;
              }
              return (
                <label key={tag} className='flex items-center space-x-2 '>
                  <input
                    type='checkbox'
                    value={tag}
                    {...register('tags')}
                    disabled={false}
                  />
                  <span>{tag}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <BlockNoteEditor
          onChange={onChange}
          initialContent={blog?.content ? blog.content : ''}
        ></BlockNoteEditor>
        {errors.content && errors.content.message && (
          <span className='text-sm text-rose-400'>
            {errors.content.message}
          </span>
        )}
      </div>
      <div className='border-t pt-2'>
        {errors.userId && errors.userId.message && (
          <span className='text-sm text-rose-400'>Missing a userId</span>
        )}
        {success && <Alert message={success} success />}
        {error && <Alert message={error} error />}

        <div className='flex items-center justify-between gap-6'>
          {blog && (
            <div>
              <Button
                onClick={handleSubmit(onDelete)}
                label={isDeleting ? 'Deleting...' : 'Delete'}
                type='button'
              />
            </div>
          )}
          <div className='flex gap-4'>
            <Button
              type='submit'
              label={isPublishing ? 'Publishing...' : 'Publish'}
              className='bg-blue-700'
            />
            <Button
              type='button'
              label={isSavingAsDraft ? 'Saving as draft...' : 'Save as draft'}
              onClick={handleSubmit(onSaveDraft)}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateBlogForm;
