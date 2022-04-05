import { favoriteArticleAPI, unfavoriteArticleAPI } from "../../service/article";
import { followUserAPI, unfollowUserAPI } from "../../service/user";
import { useEffect } from "react";
import produce from "immer";

import Author from "../author/author";

const ArticleCTA = (props) => {
  const { articleData,
    isAuthor,
    onDeleteArticle,
    authorState,
    setAuthorState
  } = props;

  useEffect(() => {
    if (!articleData) return;
    setAuthorState(produce(draft => {
      draft.isFollow = articleData.author.following;
      draft.isFavorited = articleData.favorited;
    }));
  }, [articleData])

  const onFavorite = () => {
    if (authorState.isFavorPending == true) return;
    setAuthorState(produce(draft => {
      draft.isFavorPending = true;
    }));
    if (authorState.isFavorited) {
      unfavoriteArticleAPI(articleData.slug).then(res => {
        if (res.status == 200) {
          console.log(res);
          setAuthorState(produce(draft => {
            draft.isFavorPending = false;
            draft.isFavorited = false;
          }))
        }
      })
    } else {
      favoriteArticleAPI(articleData.slug).then(res => {
        if (res.status == 200) {
          console.log(res);
          setAuthorState(produce(draft => {
            draft.isFavorPending = false;
            draft.isFavorited = true;
          }))
        }
      })
    }
  };

  const onFollow = () => {
    if (authorState.isFollowPending == true) return;
    setAuthorState(produce(draft => {
      draft.isFollowPending = true;
    }));
    if (authorState.isFollow) {
      unfollowUserAPI(articleData.author.username).then(res => {
        if (res.status == 200) {
          console.log(res);
          setAuthorState(produce(draft => {
            draft.isFollowPending = false;
            draft.isFollow = false;
          }))
        }
      })
    } else {
      followUserAPI(articleData.author.username).then(res => {
        if (res.status == 200) {
          console.log(res);
          setAuthorState(produce(draft => {
            draft.isFollowPending = false;
            draft.isFollow = true;
          }))
        }
      })
    }
  };

  return (
    <div className="author__wrapper">
      <div className="author__cta">
        <Author author={articleData.author} createdAt={articleData.createdAt} />
        {
          isAuthor ?
            (
              <div>
                <button className="btn --edit">
                  <i className="ion-edit"> </i>
                  Edit Article
                </button>
                <button
                  onClick={() => onDeleteArticle()}
                  className="btn --delete"
                >
                  <i className="ion-trash-a"> </i>
                  Delete Article
                </button>
              </div>
            )
            :
            (
              <div>
                <button
                  onClick={() => onFollow()}
                  className={`btn --edit 
                  ${authorState.isFollow ? '--followed' : ''} 
                  ${authorState.isFollowPending ? '--follow-pending' : ''}
                  `}
                >
                  <i className="ion-plus-round"> </i>
                  {authorState.isFollow ? 'Unfollow' : 'Follow'} {articleData?.author?.username}
                </button>
                <button
                  onClick={() => onFavorite()}
                  className={`btn --follow 
                  ${authorState.isFavorited ? '--favourited' : ''} 
                  ${authorState.isFavorPending ? '--favorite-pending' : ''}
                  `}
                >
                  <i className="ion-heart"> </i>
                  Favorite Article {articleData.favoritesCount}
                </button>
              </div>
            )
        }

      </div>
      <div></div>
    </div>
  )
};
export default ArticleCTA;