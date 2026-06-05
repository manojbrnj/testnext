'use client'

import { PasswordResetSchema, PasswordResetSchemaType } from "@/schemas/PasswordResetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import Alert from "../common/Alert";
import Button from "../common/Button";
import { useSearchParams } from "next/navigation";
import { passwordReset } from "@/actions/auth/password-reset";

function PasswordResetClientForm() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string>('');
  const token = searchParams.get('token')
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordResetSchemaType>({resolver: zodResolver(PasswordResetSchema)});



  const onSubmit: SubmitHandler<PasswordResetSchemaType> = (data) => {
    setError('');
    startTransition(() => {
      passwordReset(data,token).then((res) => {
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
     <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 mt-8 m-auto max-w-[500px]'
    >
      <Heading title='Enter new Voiceofamuse password?' lg center></Heading>
      <FormField
        id='password'
        register={register}
        type='password'
        placeholder='password'
        inputClassName={''}
        disabled={isPending}
        errors={errors}
      />
      <FormField
        id='confirmPassword'
        register={register}
        type='password'
        placeholder='conformPassword'
        inputClassName={''}
        disabled={isPending}
        errors={errors}
      />
 
      {error && <Alert error message={error}></Alert>}
      {success && <Alert success message={success}></Alert>}

      <Button
        type='submit'
        label={isPending ? 'Submitting...' : 'save new password'}
        disabled={isPending}
      ></Button>
    
    </form>
  )
}

export default PasswordResetClientForm