import { redirect } from "next/navigation";

async function User({params}:{params:Promise<{id:string}>}) {
   const {id} = await params;
// could fetch data use id params

redirect(`/user/${id}/1`)
}

export default User