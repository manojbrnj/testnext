async function User({params}:{params:Promise<{id:string}>}) {
   const {id} = await params;
// could fetch data use id params

type User = {
  email:String;
  name:String;
  image?:String;
}

const user:User={
  email:'charles@gmail.com',
  name:'chales'
  
}
  
  return (
    <div>UserProfile {id}</div>
  )
}

export default User