'use client'
import { useRouter } from "next/navigation";
function RegisterButton() {
  const router =useRouter();
  return (
    <button onClick={()=>router.replace('/register')}>RegisterButton</button>
  )
}

export default RegisterButton