import { useNavigate } from "react-router-dom";

const FeedItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="feed-tab">
      <div className="feed-tab__info">
        <div className="feed-tab__profile">
          <div>
            <img src={data.author.image} alt="profile" />
          </div>
          <div>
            <p>{data.author.username}</p>
            <span>{data.createdAt}</span>
          </div>
        </div>
        <button className="feed-tab__heart">
          <i className="ion-heart"></i>
          <span> {data.favoritesCount} </span>
        </button>
      </div>
      <div className="feed-tab__content">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
      <div className="feed-tab__cta">
        <span className="feed-tab__read-more">Read more...</span>
        <div className="feed-tab__tags">
          {data.tagList.map(tag => (
            <span>{tag}</span>
          ))
          }
        </div>
      </div>
    </div>
  )
};
export default FeedItem;