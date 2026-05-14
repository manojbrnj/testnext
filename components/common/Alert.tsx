import { cn } from '@/lib/utils';
import { BiError } from 'react-icons/bi';
import {IoIosCheckmarkCircleOutline,IoIosInformationCircleOutline} from'react-icons/io';

function Alert({success,error,message}:{success?:boolean,error?:boolean,message?:string}) {
  return (
    <div className={cn('my-2 flex items-center gap-2 p-3 rounded-md',
      success &&'bg-green-500 text-white',
      error &&'bg-red-500 text-white',
      !success && !error &&'bg-gray-500 text-white'
    )}>
      <span>

      {success && <IoIosCheckmarkCircleOutline size={20}></IoIosCheckmarkCircleOutline>}
      {error && <BiError size={20}></BiError>}
      {!success && !error  && <IoIosInformationCircleOutline size={20}></IoIosInformationCircleOutline>}
      </span>
      {message}
    </div>
  )
}

export default Alert