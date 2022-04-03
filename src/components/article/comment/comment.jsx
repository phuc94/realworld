const Comment = () => {
  return (
    <div className="comment">
      <div className="comment__textarea">
        <p> comment content</p>
      </div>
      <div className="comment__cta --author">
        <div className="comment__author">
          <img src="" alt="" />
          <span className="comment__author">yuriquy</span>
          <span className="comment__date">April 3, 2022</span>
        </div>
        <i className="ion-trash-a"></i>
      </div>
    </div>
  )
};
export default Comment;