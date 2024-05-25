import { Button } from "antd";
import { Link } from "react-router-dom";

const PostListItem = ({ post }: { post: any }) => {
  // get postTitle, petPic, petType, petAge to be displayed

  if (!post) {
    return null;
  }

  // Todo : one list should have 2 actions:
  // 1. see post url : /myposts/pdetail/:postID
  // 2. see post answer (submission from other users) url: /myposts/pdetail/answerslist/:postID
  // 3. delete post // link to nothing [ just ui button , not functional]

  return (
    <>
      <Link to={`/myposts/pdetail/${post.id}`}>
        <Button> This is list example {post.postTitle}</Button>
      </Link>
      {/* Implement PostListItem Here */}
    </>
  );
};

export default PostListItem;
