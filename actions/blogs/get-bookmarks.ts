'use server'

import { auth } from "@/auth";


import { db } from "@/lib/db";
interface PaginationType{
  page:number;
  limit:number;
  offset?:number;

}
export const getBookmarks = async ({ page = 1, limit = 5 }: PaginationType) => {
  const offset = (Number(page) - 1) * limit;
  //console.log("offset>>>>",offset);
  // const {tag,title} = searchObject;
  const session = await auth();
  const userId = session?.user.id;  
  if (!userId) return { error: "User not found" };
  try {
    const bookmarks = await db.bookmark.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        blog: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              }
            },
            _count: {
              select: {
                claps: true,
                comments:true
              }
            },
            claps: {
              where: {
                userId: userId,
              },
              select: {
                id: true,
              }
            },
            bookmarks: {
              where: {
                userId: userId,
              },
              select: {
                id: true,
              }
            }
          }
        }
      },
      where: {
        userId
      },


    })

const blogs = bookmarks.filter((bookmark)=> bookmark.blog!==null).map((bookmark)=>bookmark.blog);
const totalBookmarks = await db.bookmark.count({
  where: {
    userId
  }

})

const hasMore = totalBookmarks > page * limit;

return { success: { blogs, hasMore }};
  } catch (error) {
    return { error: "error fetching bookmarks" }
  }

}