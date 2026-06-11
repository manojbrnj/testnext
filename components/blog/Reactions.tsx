'use client'

import { useState } from "react";
import { FaBookmark, FaRegBookmark, FaRegComment } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { PiHandsClapping } from "react-icons/pi";
import { BlogWithUser } from "./ListBlogs";
import { useSession } from "next-auth/react";
import { clapBlog } from "@/actions/blogs/clap-blog";
import { useRouter } from "next/navigation";
import { bookmarkBlog } from "@/actions/blogs/bookmark-blog";

function Reactions({blog}:{blog:BlogWithUser}) {

  //console.log("REaction Blog LIst",blog)
  const session = useSession();
  const router = useRouter();
  
  const userId = session.data?.user.id;
//console.log("BLOG CLSP",blog._count)

const [ clapCount,setClapCount] = useState<number>(blog._count.claps);
const [ userHasClapped,setUserHasClapped] = useState<boolean>(!!blog.claps.length);
const [ userHasBookmarked,setUserHasBookMarked] = useState<boolean>(!!blog.bookmarks.length);
const handleClap =async()=>{
  if(!userId){
    alert("Please login to clap");
    return;
  }
  setClapCount((prevCount)=> userHasClapped ? prevCount - 1 : prevCount + 1);
  setUserHasClapped((prevHasClapped)=> !prevHasClapped);
  await clapBlog(blog.id,userId);
  router.refresh();
}
const handleBookmark =async()=>{
  if(!userId){
    alert("Please login to Bookmarks");
    return;
  }
 // setClapCount((prevCount)=> userHasBookmarked ? prevCount - 1 : prevCount + 1);
  setUserHasBookMarked((prevHasBookmarked)=> !prevHasBookmarked);
  await bookmarkBlog(blog.id,userId);
  router.refresh();
}

  return (
    <div className="flex items-center justify-between w-full text-sm">
      <div className="flex items-center gap-2">
        <span onClick={handleClap} className="mr-4 flex items-center gap-1 cursor-pointer">
          {userHasClapped ? <FaHandsClapping size={20}/> : <PiHandsClapping size={20}/>}
        
           {clapCount}
        </span>
        <span className="mr-4 flex items-center gap-1 cursor-pointer">
          <FaRegComment size={18}/>
          {blog._count.comments}
        </span>
      </div>
      <div>
        <span onClick={handleBookmark}>
          {userHasBookmarked ? <FaBookmark  size={18}/> : <FaRegBookmark  size={18}/>}
        </span>
        {/* <FaRegBookmark size={18}/> */}
      </div>
    </div>
  )
}

export default Reactions