'use server'
import { auth } from '@/auth'
import Heading from '../common/Heading';
import { BlogWithUser } from '../blog/ListBlogs';
import AddCommentsForm from './AddCommentsForm';


async function Comments({blog}:{blog:BlogWithUser}) {
  const session = await auth();
  const userId = session?.user.id;
  console.log(userId);

  return (
    <div>
      <Heading title="Comments" />
    {/* add comment form */}
  {userId && <AddCommentsForm blogId={blog.id} userId={userId} creatorId={blog.userId}/>}
    {/* list comments */}
    </div>
  )
}

export default Comments