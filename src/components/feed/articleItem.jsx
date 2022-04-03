import { useState } from "react";
import { favoriteArticleAPI, unfavoriteArticleAPI } from "../../service/article";
import Author from "../author/author";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ArticleItem = ({ data }) => {
  const [isFavorited, setIsFavorited] = useState(data.favorited);
  const [isPending, setIsPending] = useState(false);
  const isAuthorized = useSelector(state => state.user.authorized);
  const navigate = useNavigate();

  const toArticleDetail = () => {
    navigate(`/article/${data.slug}`)
  };

  const onFavorite = e => {
    if (isPending) return;
    setIsPending(prev => !prev);
    if (isAuthorized && isFavorited) {
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
      <div onClick={() => toArticleDetail()} className="feed-tab__content">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
      <div className="feed-tab__cta">
        <span onClick={() => toArticleDetail()} className="feed-tab__read-more">Read more...</span>
        <div className="feed-tab__tags">
          {data.tagList.map(tag => (
            <span onClick={() => toArticleDetail()}>{tag}</span>
          ))
          }
        </div>
      </div>
    </div>
  )
};
export default ArticleItem;