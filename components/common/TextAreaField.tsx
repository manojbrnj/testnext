import {cn} from '@/lib/utils';
import {FieldErrors, FieldValues, Path, UseFormRegister} from 'react-hook-form';
// interface LoginValues{
// email:string;
// password:string;

// }

interface TextAreaFieldProps<T extends FieldValues> {
  id: string;
  placeholder: string;
  label?: string;
  inputClassName?: string;
  disabled: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

function TextAreaField<T extends FieldValues>({
  id,
  placeholder,
  label,
  inputClassName,
  disabled,
  register,
  errors,
}: TextAreaFieldProps<T>) {
  const message = errors[id]?.message as string;
  return (
    <div>
      {label && <span className='text-sm block'>{label}</span>}
      <textarea
      autoFocus
      autoComplete='off'
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          'w-full p-3 my-2 outline-none rounded-md disabled:opacity-70 disabled:cursor-not-allowed border-2 border-slate-300 min-h-[28px] dark:border-slate-700',
          errors[id] && 'border-rose-500',
          inputClassName,
        )}
        {...register(id as Path<T>)}
      ></textarea>
      {message && (
        <span className='text-rose-500 text-sm block mt-1 h-5 min-h-5'>
          {message}
        </span>
      )}
    </div>
  );
}

export default TextAreaField;
