import CommentInput from "./input";
import Comment from "./comment";

const CommentSection = () => {
  return (
    <div className="comment__container">
      <CommentInput />
      <Comment />
      <Comment />
    </div>
  )
};
export default CommentSection;