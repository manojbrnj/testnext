'use server'
import { auth } from "@/auth";
import {db } from "@/lib/db";
export interface PaginationType{
  page:number;
  limit:number;
  offset?:number;
  searchObject:{
    tag:string,
    title?:string
  }
}




export const getPublishedBlogs= async({page=1,limit=5,searchObject}:PaginationType)=>{
  const offset =(Number(page)-1)*limit;
  //console.log("offset>>>>",offset);
  const {tag,title} = searchObject;
  const session = await auth();
  const userId = session?.user.id;
  try {
    const blogs = await db.blog.findMany({
      where:{
         title:{
          contains:title,
          mode:"insensitive",
          
        },
        isPublished:true,
        ...(tag?{tags:{has:tag}}:{}),
       
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
            comments: true,
            
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
        isPublished:true,
         ...(tag?{tags:{has:tag}}:{}),
        title:{
          contains:title,
          mode:"insensitive",
          
        },
      }
    });

    const hasMore = totalBlogCount > (page)*limit;
    return {success:{blogs,hasMore,totalBlogCount}};

    
  } catch (error) {
    return {error:"error fetching blogs"}
  }


  

}