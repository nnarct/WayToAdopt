import { Button } from "antd"
import { Link } from "react-router-dom"


const PostListItem = ({postID} : {postID: string}) => {
  // get postTitle, petPic, petType, petAge to be displayed

  return (
    <>
        <Link to="/myposts/pdetail" state={{ postID: postID }}>   <Button> click to see example post id {postID}</Button>
      </Link> {/* Implement PostListItem Here */}
    </>
  )
}

export default PostListItem