import { useSelector } from "react-redux"
import { addCommentAPI } from "../../../service/article";
import { useState } from "react";

const CommentInput = ({ slug, setRefetch }) => {
  const userInfo = useSelector(state => state.user.info);
  const [body, setBody] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const bodyObj = {
      comment: { body }
    }
    addCommentAPI(slug, bodyObj).then(res => {
      if (res.status == 200) {
        console.log('200');
        setRefetch(prev => prev = prev + 1);
      }
    });
  }

  const onChange = (e) => {
    setBody(e.target.value);
  }

  return (
    <form className="comment">
      <div className="comment__textarea">
        <textarea
          onChange={e => onChange(e)}
          value={body}
          rows="3"
          placeholder="Write a comment..."></textarea>
      </div>
      <div className="comment__cta">
        <img src={userInfo?.image} alt="" />
        <button onClick={(e) => onSubmit(e)}
        >Post Comment</button>
      </div>
    </form>
  )
};
export default CommentInput;