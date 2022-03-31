import { useState } from "react";
import { favoriteArticleAPI, unfavoriteArticleAPI } from "../../service/article";
import Author from "../author/author";

const ArticleItem = ({ data }) => {
  const [isFavorited, setIsFavorited] = useState(data.favorited);
  const [isPending, setIsPending] = useState(false);
  const onFavorite = e => {
    setIsPending(prev => !prev);
    if (isFavorited) {
      unfavoriteArticleAPI(data.slug).then(res => {
        if (res.status == 200) {
          setIsFavorited(prev => !prev);
          setIsPending(prev => !prev);
        }
      })
    } else {
      favoriteArticleAPI(data.slug).then(res => {
        if (res.status == 200) {
          setIsFavorited(prev => !prev);
          setIsPending(prev => !prev);
        }
      })
    }

  };
  console.log(data);
  return (
    <div className="feed-tab">
      <div className="feed-tab__info">
        <Author author={data.author} createdAt={data.createdAt} />
        <button
          onClick={e => onFavorite(e)}
          className={`feed-tab__favorite
            ${isFavorited ? '--favorited' : ''}
            ${isPending ? '--pending' : ''}
            `}
        >
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
export default ArticleItem;