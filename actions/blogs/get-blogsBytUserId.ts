'use server'
import { auth } from "@/auth";
import {db } from "@/lib/db";
 




export const getBlogsByUserId= async({page=1,limit=5,userId}:{page:number,limit:number,userId:string})=>{
  const offset =(Number(page)-1)*limit;
  //console.log("offset>>>>",offset);
 
  try {
    const blogs = await db.blog.findMany({
      where:{
        userId:userId,
       
      },
      skip:offset,
      take:limit,
      orderBy:{
        createdAt:"desc"
      },
      include:{
        user:{
          select:{
            id:true,
            name:true,
            image:true,
          }
        },
        _count: {
          select: {
            claps: true,
            comments:true
          }
        },
        claps:{
          where:{
            userId:userId,
          },
          select:{
            id:true,
          }
        },
        bookmarks:{
          where:{
            userId:userId,
          },
          select:{
            id:true,
          }
        }

      },
      

    });
  
    const totalBlogCount = await db.blog.count({
      where:{
       userId:userId,
      }
    });

    const hasMore = totalBlogCount > (page)*limit;
    return {success:{blogs,hasMore,totalBlogCount}};

    
  } catch (error) {
    return {error:"error fetching blogs"}
  }


  

}