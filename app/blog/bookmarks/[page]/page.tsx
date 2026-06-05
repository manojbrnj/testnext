'use server'
import Alert from "@/components/common/Alert";
import ListBlogs from "@/components/blog/ListBlogs";
import { getBookmarks } from "@/actions/blogs/get-bookmarks";
import Heading from "@/components/common/Heading";
interface BlogFeedProps{
  params:Promise<{page:number}>,

}
async function Bookmarks ({params}:BlogFeedProps) {
  const {page} = await params;

const {success,error} = await getBookmarks({page,limit:5});
if(error){
 return <Alert error message={error}/>;
}
if(!success) return <Alert message="No Posts!"></Alert>
const {blogs,hasMore } = success;
 //console.log("CURRENT PAGE>>>>",success.totalBlogCount)
  return (
    <div className="max-w-[800px] m-auto mt-4 px-4 ">
      <Heading title="Bookmarks">

      </Heading>
      <ListBlogs blogs={blogs} hasMore={hasMore}  page={page}/></div>
  )
}

export default Bookmarks