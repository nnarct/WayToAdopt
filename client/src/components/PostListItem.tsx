import { Button } from "antd";
import { Link } from "react-router-dom";

const PostListItem = ({ postID }: { postID: string }) => {
  // get postTitle, petPic, petType, petAge to be displayed

  if (!postID) {
    return null;
  }

  // Todo : one list should have 2 actions:
  // 1. see post url : /myposts/pdetail/:postID
  // 2. see post answer (submission from other users) url: /myposts/pdetail/answerslist/:postID
  // 3. delete post // link to nothing [ just ui button , not functional]

  return (
    <>
      <Link to={`/myposts/pdetail/${postID}`}>
        <Button> This is list example {postID}</Button>
      </Link>
      {/* Implement PostListItem Here */}
    </>
  );
};

export default PostListItem;
