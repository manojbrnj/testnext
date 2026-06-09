'use server'
import { auth } from '@/auth'
import Heading from '../common/Heading';
import { BlogWithUser } from '../blog/ListBlogs';
import AddCommentsForm from './AddCommentsForm';
import { getComments } from '@/actions/comments/get-comments';
import ListComments from './ListComments';


async function Comments({blog}:{blog:BlogWithUser}) {
  const session = await auth();
  const userId = session?.user.id;
 // console.log(userId);
const {success} = await getComments(blog.id,null,userId)
  return (
    <div>
      <Heading title="Comments" />
    {/* add comment form */}
  {userId && <AddCommentsForm blogId={blog.id} userId={userId} creatorId={blog.userId}/>}
    {/* list comments */}
    {!!success?.comments.length && <ListComments comments={success.comments}/>}

    </div>
  )
}

export default Comments