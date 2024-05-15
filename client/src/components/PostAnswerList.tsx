import { AnswerListType } from "@/assets/types";
import UtilsService from "@/services/UtilsService";
const PostAnswerList = ({ user }: { user: AnswerListType }) => {
  // should display user's data

  // Todo: action to read the answers
  return (
    <div>
      PostAnswerList {user.id}: {user.firstName} {user.lastName}
      {UtilsService.formatDate(user.createdAt)}
    </div>
  );
};

export default PostAnswerList;
