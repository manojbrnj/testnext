import { cn } from '@/lib/utils';
import { FieldErrors,Path,UseFormRegister } from 'react-hook-form'
interface LoginValues{
email:string;
password:string;

}
interface FormFieldProps {
  id:string;
  type:string;
  placeholder:string;
  label?:string;
  inputClassName:string;
  disabled:boolean;
  register:UseFormRegister<LoginValues>;
  errors:FieldErrors;
}


function FormField({id,type,placeholder,label,inputClassName,disabled,register,errors}:FormFieldProps) {
  const message = errors[id]?.message as string;
  return (
    <div>
      {label && <span className='text-sm block'>{label}</span>}
      <input id={id} disabled={disabled} type={type} placeholder={placeholder} className={cn('w-full p-3 my-2 outline-none rounded-md disabled:opacity-70 disabled:cursor-not-allowed border-2 border-slate-300 dark:border-slate-700', errors[id] && 'border-rose-500',inputClassName)} {...register(id as Path<LoginValues>)}>
       </input>
      {message && <span className='text-rose-500 text-sm block mt-1 h-5 min-h-5'>{message}</span>}
    </div>
  )
}

export default FormField