import { getBlogById } from "@/actions/blogs/get-blogById";
import CreateBlogForm from "@/components/blog/CreateBlogForm";
import Alert from "@/components/common/Alert";
import Container from "@/components/layout/Container";
import { Blog } from "@prisma/client";

interface BlogEditProps{
  params : Promise<{id:string}>
}

async function BlogEdit({params}:BlogEditProps) {
  const {id} = await params;
  const res = await getBlogById({blogId:id})
  if (!res.success) {
    return <Alert error message="Error fetching blog content" />
  }
  const blog = res.success.blog;
  return (
    <Container>
      <CreateBlogForm blog={blog as Blog} />
    </Container>
  )
}

export default BlogEdit