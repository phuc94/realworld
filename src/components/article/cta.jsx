import Author from "../author/author";

const ArticleCTA = ({ author, createdAt }) => {
  return (
    <div className="author__wrapper">
      <div className="author__cta">
        <Author author={author} createdAt={createdAt} />
        <div>
          <button className="btn --edit">
            <i className="ion-edit"> </i>
            Edit Article
          </button>
          <button className="btn --delete">
            <i className="ion-trash-a"> </i>
            Delete Article
          </button>
        </div>
      </div>
      <div></div>
    </div>
  )
};
export default ArticleCTA;