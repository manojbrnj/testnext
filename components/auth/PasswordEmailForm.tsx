'use client'

import { PasswordEmailSchema, PasswordEmailSchemaType } from "@/schemas/PasswordEmailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Heading from "../common/Heading";
import FormField from "../common/FormField";
import Alert from "../common/Alert";
import Button from "../common/Button";
import SocialAuth from "./SocialAuth";
import { passwordEmail } from "@/actions/auth/password-email";

function PasswordEmailForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordEmailSchemaType>({resolver: zodResolver(PasswordEmailSchema)});



  const onSubmit: SubmitHandler<PasswordEmailSchemaType> = (data) => {
    setError('');
    startTransition(() => {
      passwordEmail(data).then((res) => {
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
      <Heading title='forgot your Voiceofamuse password?' lg center></Heading>
      <FormField
        id='email'
        register={register}
        type=''
        placeholder='email'
        inputClassName={''}
        disabled={isPending}
        errors={errors}
      />
 
      {error && <Alert error message={error}></Alert>}
      {success && <Alert success message={success}></Alert>}

      <Button
        type='submit'
        label={isPending ? 'Submitting...' : 'send reset email'}
        disabled={isPending}
      ></Button>
    
    </form>
  )
}

export default PasswordEmailForm