import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { deleteCommentAPI } from "../../../service/article";

const Comment = ({ comment, slug }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const username = useSelector(state => state.user.info.username);

  useEffect(() => {
    if (comment == username == undefined) return;
    if (username == comment.author.username) {
      setIsAuthor(true);
    }
  }, [comment, username])

  const onDeleteComment = () => {
    deleteCommentAPI(slug, comment.id).then(res => {
      if (res.status == 204) {
        console.log('deleted');
      }
    })
  }

  return (
    <div className="comment">
      <div className="comment__textarea">
        <p>{comment.body}</p>
      </div>
      <div className="comment__cta --author">
        <div className="comment__author">
          <img src={comment.author.image} alt="" />
          <span className="comment__author">{comment.author.username}</span>
          <span className="comment__date">{comment.createdAt}</span>
        </div>
        {
          isAuthor ?
            (
              <i
                onClick={() => onDeleteComment()}
                className="ion-trash-a"></i>
            )
            :
            (
              <i></i>
            )
        }
      </div>
    </div>
  )
};
export default Comment;