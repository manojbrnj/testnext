import { getPublishedBlogs } from "@/actions/blogs/get-published-blog";
import ListBlogs from "@/components/blog/ListBlogs";
import Alert from "@/components/common/Alert";
import { get } from "http";
 interface BlogFeedProps{
  params:Promise<{page:number}>,
  searchParams:Promise<{
    tag:string,
    title:string
  }>
}
async function BlogFeed({params,searchParams}:BlogFeedProps) {
 const {page} = await params;
 const searchObject =await searchParams;
const {success,error} = await getPublishedBlogs({page,limit:5,searchObject});
if(error){
 return <Alert error message={error}/>;
}
if(!success) return <Alert message="No Posts!"></Alert>
const {blogs,hasMore } = success;
 //console.log("CURRENT PAGE>>>>",success.totalBlogCount)
  return (
    <div><ListBlogs blogs={blogs} hasMore={hasMore} totalBlogCount={success.totalBlogCount} page={page}/></div>
  )
}

export default BlogFeed