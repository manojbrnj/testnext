'use server';

import {auth} from '@/auth';
import Alert from '@/components/common/Alert';
import EditUserForm from '@/components/user/EditUserForm';
import { db } from '@/lib/db';
import {getUserById} from '@/lib/user';

async function EditUser({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  console.log(id);
  const user = await getUserById(id);
  if (!user) {
    return <Alert error message='User not found' />;
  }

  const session = await auth();
  if (session?.user.id !== user.id) {
    return <Alert error message='You are not authorized to edit this user' />;
  }

   const account = await db.account.findFirst({
    where:{
      userId:user.id
    }
   })
   
   const isOAuth = account?.provider === 'google' || account?.provider === 'github';

   const isCredentials = !isOAuth

   console.log(isCredentials, isOAuth) 


  return (<EditUserForm user={user} isCredentials={isCredentials}/>);
}

export default EditUser;
