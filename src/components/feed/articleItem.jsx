import { useState, useEffect } from "react";
import { favoriteArticleAPI, unfavoriteArticleAPI } from "../../service/article";
import Author from "../author/author";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ArticleItem = ({ data }) => {
  const [itemData, setItemData] = useState({});

  useEffect(() => {
    if (data == undefined) return;
    setItemData(data);
  }, [data])

  const [isPending, setIsPending] = useState(false);
  const isAuthorized = useSelector(state => state.user.authorized);
  const navigate = useNavigate();

  const toArticleDetail = () => {
    navigate(`/article/${itemData.slug}`)
  };

  const onFavorite = e => {
    if (isPending) return;
    setIsPending(prev => !prev);
    if (isAuthorized && itemData.favorited) {
      unfavoriteArticleAPI(itemData.slug).then(res => {
        if (res.status == 200) {
          setItemData(res.data.article);
          setIsPending(prev => !prev);
        }
      })
    } else {
      favoriteArticleAPI(itemData.slug).then(res => {
        if (res.status == 200) {
          setItemData(res.data.article);
          setIsPending(prev => !prev);
        }
      })
    }
  };

  return (
    <div className="feed-tab">
      <div className="feed-tab__info">
        <Author author={itemData.author} createdAt={itemData.createdAt} />
        <button
          onClick={e => onFavorite(e)}
          className={`feed-tab__favorite
            ${itemData.favorited ? '--favorited' : ''}
            ${isPending ? '--pending' : ''}
            `}
        >
          <i className="ion-heart"></i>
          <span> {itemData.favoritesCount} </span>
        </button>
      </div>
      <div onClick={() => toArticleDetail()} className="feed-tab__content">
        <h1>{itemData.title}</h1>
        <p>{itemData.description}</p>
      </div>
      <div className="feed-tab__cta">
        <span onClick={() => toArticleDetail()} className="feed-tab__read-more">Read more...</span>
        <div className="feed-tab__tags">
          {itemData?.tagList?.map(tag => (
            <span onClick={() => toArticleDetail()}>{tag}</span>
          ))
          }
        </div>
      </div>
    </div>
  )
};
export default ArticleItem;