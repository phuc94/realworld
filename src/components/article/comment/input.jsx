import { useSelector } from "react-redux"

const CommentInput = () => {
  const userInfo = useSelector(state => state.user.info);

  return (
    <div className="comment">
      <div className="comment__textarea">
        <textarea name="" id="" rows="3" placeholder="Write a comment..."></textarea>
      </div>
      <div className="comment__cta">
        <img src={userInfo?.image} alt="" />
        <button>Post Comment</button>
      </div>
    </div>
  )
};
export default CommentInput;