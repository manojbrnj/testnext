'use server'

import { getAnalytics } from "@/actions/admin/get-analytics";
import { auth } from "@/auth";
import Alert from "@/components/common/Alert";
import Heading from "@/components/common/Heading";
import Container from "@/components/layout/Container";

async function Admin () {
    const session = await auth();
    const isAdmin = (session?.user?.role) === "ADMIN";
    if(!isAdmin){
      return <Alert error message='You are not authorized to view this page.' />
    }
   const res = await getAnalytics();

   if(res.error){
    return <Alert error message={res.error} />
   }

  return (
    <Container>
      <div className="flex flex-col justify-center items-center ">
        <div className=" flex max-w-[1920px] w-full justify-center items-center border-b ">
         
        <Heading  title="Analytics" />
        </div>

        <div className="flex flex-row gap-8 mt-4 justify-center items-center" >

          <div className='flex flex-col justify-center items-center gap-3'>
            <div className="font-bold text-2xl">{res.success?.userCount}</div>
            <div className="font-bold text-2xl">Users</div>
          </div>
          <div className='flex flex-col justify-center items-center gap-3'>
            <div className="font-bold text-2xl ">{res.success?.blogCount}</div>
            <div className="font-bold text-2xl">Blogs</div>
          </div>
        </div>

     
      </div>
    </Container>
  )
}

export default Admin