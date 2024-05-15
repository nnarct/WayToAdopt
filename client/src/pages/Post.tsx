import PostDetail from '@/components/PostDetail';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {}

const Post = (props: Props) => {
  const location = useLocation();
  const postID = location.state ? location.state.postID : <Navigate to="/"/>;

  return (
    <div>Post id : {postID} <PostDetail postId={postID}/></div>
  )
}

export default Post