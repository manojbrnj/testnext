'use client';
import {loginSchemaType, LoginSchema} from '@/schemas/LoginSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import SocialAuth from './SocialAuth';
import { useState, useTransition} from 'react';
import {login} from '@/actions/auth/login';
import Alert from '../common/Alert';
import {useRouter, useSearchParams} from 'next/navigation';
import {LOGIN_REDIRECT} from '@/routes';

import Link from 'next/link';
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<loginSchemaType>({resolver: zodResolver(LoginSchema)});

  const onSubmit: SubmitHandler<loginSchemaType> = (data) => {
    setError('');
    startTransition(() => {
      login(data).then((res) => {
        if (res?.error) {
          router.replace('/login');
          setError(res.error);
        }
        if (!res?.error) {
           router.replace(LOGIN_REDIRECT);
        }
        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 mt-8 m-auto max-w-[500px]'
    >
      <Heading title='Login to Voiceofamuse' lg center></Heading>
      <FormField
        id='email'
        register={register}
        type=''
        placeholder='email'
        inputClassName={''}
        disabled={isPending}
        errors={errors}
      />
      <FormField
        id='password'
        register={register}
        type='password'
        placeholder='password'
        inputClassName={''}
        disabled={isPending}
        errors={errors}
      />
      {error && <Alert error message={error || urlError}></Alert>}
      {success && <Alert success message={success}></Alert>}

      <Button
        type='submit'
        label={isPending ? 'Submitting...' : 'Login'}
        disabled={isPending}
      ></Button>
      <div className='flex justify-center my-2'>Or</div>
      {urlError && <Alert error message={error || urlError}></Alert>}
      <SocialAuth />
      <div className='flex items-end'> 
<Link href='/password-email-form' className='mt-2 text-sm underline text-slate-700 dark:text-slate-200'>Forgot password?</Link>
      </div>
    </form>
  );
}

export default LoginForm;
