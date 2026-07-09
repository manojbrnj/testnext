'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useState, useTransition} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import Heading from '../common/Heading';
import FormField from '../common/FormField';
import Alert from '../common/Alert';
import Button from '../common/Button';

import {User} from '@prisma/client';
import {
  EditProfileSchema,
  EditProfileSchemaType,
} from '@/schemas/EditProfileSchema';
import {editUser} from '@/actions/users/edit-user';
import {tags} from '@/lib/tags';
import { deleteUser } from '@/actions/users/delete-user';
import { signOut } from 'next-auth/react';

function EditUserForm({
  user,
  isCredentials,
}: {
  user: User;
  isCredentials: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleting] = useTransition();

  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [deleteSuccess, setDeleteSuccess] = useState<string | undefined>('');
  const [deleteError, setDeleteError] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      bio: user.bio || undefined,
      tags: user.tags || undefined,
    },
  });


 const onDelete = () => {
        setDeleteSuccess('')
        setDeleteError('')
        startDeleting(() => {
            deleteUser(user.id).then(res => {
                setDeleteError(res.error)
                setDeleteSuccess(res.success)
                if (res.success) {
                    setTimeout(() => {
                        signOut();
                    }, 5000);
                }
            })
        })
    };


  const onSubmit: SubmitHandler<EditProfileSchemaType> = (data) => {
    setError('');
    startTransition(() => {
      editUser(data, user.id).then((res) => {
        if (res?.error) {
          setError(res.error);
        }

        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  };

  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 mt-8 m-auto max-w-[500px]'
    >
      <Heading title='Update Profile' lg center></Heading>
      <FormField
        id='name'
        register={register}
        type=''
        placeholder='name'
        inputClassName={''}
        disabled={isPending}
        errors={errors}
        label='Name'
      />
      { <FormField
        id='email'
        register={register}
        type=''
        placeholder='email'
        inputClassName={''}
        disabled={isPending ? true : !isCredentials}
        errors={errors}
        label='Email'
       
      />}
      <FormField
        id='bio'
        register={register}
        type=''
        placeholder='bio'
        inputClassName={''}
        disabled={isPending}
        errors={errors}
        label='Bio'
      />
      <fieldset className='flex flex-col '>
        <legend className='mb-2 pr-2'>Select Tags</legend>
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

      {error && <Alert error message={error}></Alert>}
      {success && <Alert success message={success}></Alert>}

      <Button
        type='submit'
        label={isPending ? 'Saving...' : 'Save Changes'}
        disabled={isPending}
      ></Button>
    </form>
    <div className='max-w-[500px] m-auto mt-12' >
      <div className='text-rose-500'>

       <Heading title='Danger Zone'></Heading>
      </div>
       {deleteError && <Alert error message={deleteError}></Alert>}
      {deleteSuccess && <Alert success message={deleteSuccess}></Alert>}
      <Button label={isPending ? 'Deleting...' : 'Delete Account'} outlined type='button' onClick={onDelete} className='mt-4' disabled={isDeleting}/>
    </div>
    </>
  );
}

export default EditUserForm;
