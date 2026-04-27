async function User({params}:{params:Promise<{id:string}>}) {
   const {id} = await params;
// could fetch data use id params
  
  return (
    <div>UserProfile {id}</div>
  )
}

export default User