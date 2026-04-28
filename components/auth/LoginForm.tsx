'use client';
import {loginSchemaType, LoginSchema} from '@/schemas/LoginSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import FormField from '../common/FormField';
import Button from '../common/Button';
import Heading from '../common/Heading';
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<loginSchemaType>({resolver: zodResolver(LoginSchema)});

  const onSubmit : SubmitHandler<loginSchemaType> = (data) => {
    console.log(data);
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
      <Button  type='submit' label='Login'></Button>
    </form>
  );
}

export default LoginForm;
