'use client';
import {zodResolver} from '@hookform/resolvers/zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
import SocialAuth from './SocialAuth';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/RegisterSchema';
import { signUp } from '@/actions/auth/register';
import { useState, useTransition } from 'react';
import Alert from '../common/Alert';
function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterSchemaType>({resolver: zodResolver(RegisterSchema)});

  const [isPending,startTransition] = useTransition();
  const [error,setError] = useState<string | undefined>('');
  const [success,setSuccess] = useState<string | undefined>('');
  const onSubmit : SubmitHandler<RegisterSchemaType> = (data) => {
    setError('');
    setSuccess('');
  startTransition(()=>{
      signUp(data).then((res)=>{
      setSuccess(res.success);
      setError(res.error);
      

    })
  })
   // console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 mt-8 m-auto max-w-[500px]'
    >
      <Heading title='Register to Voiceofamuse' lg center></Heading>
        <FormField
        id='name'
        register={register}
        type=''
        placeholder='name'
        inputClassName={''}
        disabled={false}
        errors={errors}
      />
      <FormField
        id='email'
        register={register}
        type=''
        placeholder='email'
        inputClassName={''}
        disabled={false}
        errors={errors}
      />
      <FormField
        id='password'
        register={register}
        type='password'
        placeholder='password'
        inputClassName={''}
        disabled={false}
        errors={errors}
      />
       <FormField
        id='confirmPassword'
        register={register}
        type='password'
        placeholder='confirmPassword'
        inputClassName={''}
        disabled={false}
        errors={errors}
      />
      <div>
        {error && <Alert error message={error}></Alert>}
        {success && <Alert success message={success}></Alert>}
      </div>
      <Button  type='submit' label={isPending ? "Submitting..." : "Register"} disabled={isPending}></Button>
      <div className='flex flex-col md:flex-row justify-center my-2'>Or</div>
      <SocialAuth/>
    </form>
  );
}

export default RegisterForm;
