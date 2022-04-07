import { useEffect, useState } from "react";
import CommentInput from "./input";
import Comment from "./comment";
import { getCommentAPI } from "../../../service/article";

const CommentSection = ({ slug }) => {
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    if (slug == undefined) return;
    getCommentAPI(slug).then(res => {
      setComments(res.data.comments);
    })
  }, [slug, refetch])

  return (
    <div className="comment__container">
      <CommentInput slug={slug} setRefetch={setRefetch} />
      {
        comments.map(comment => (
          <Comment
            comment={comment}
            key={comment.id}
            slug={slug}
            setRefetch={setRefetch}
          />
        ))
      }
    </div>
  )
};
export default CommentSection;