const Author = ({ author, createdAt }) => {
  return (
    <div className="author feed-tab__profile">
      <div>
        <img src={author.image} alt="profile" />
      </div>
      <div>
        <p>{author.username}</p>
        <span>{createdAt}</span>
      </div>
    </div>
  )
};
export default Author;