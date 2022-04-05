import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getArticleAPI, deleteArticleAPI } from "../../service/article";
import ArticleCTA from "./cta";
import CommentSection from "./comment/commentSection";

const initialAuthorState = {
  isFavorPending: false,
  isFavorited: false,
  isFollowPending: false,
  isFollow: false
}

const Article = () => {
  const params = useParams();
  const [articleData, setArticleData] = useState(undefined);
  const [authorState, setAuthorState] = useState(initialAuthorState);
  const [isAuthor, setIsAuthor] = useState(false);
  const userInfo = useSelector(articleData => articleData.user.info);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo == articleData == undefined) return
    if (userInfo?.username == articleData?.author?.username) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, [articleData, userInfo])

  useEffect(() => {
    getArticleAPI(params.slug).then(res => {
      if (res.status == 200) {
        setArticleData(res.data.article);
      }
    })
  }, [])

  const onDeleteArticle = () => {
    deleteArticleAPI(articleData.slug).then(res => {
      if (res.status == 204) {
        navigate('/', { replace: true })
      }
    })
  }

  return (
    <>
      {
        !articleData ?
          (
            <p>Loading Article...</p>
          )
          :
          (
            <div className="article">
              <div className="article__title">
                <div>
                  <h1>{articleData.title}</h1>
                  <ArticleCTA
                    isAuthor={isAuthor}
                    articleData={articleData}
                    onDeleteArticle={onDeleteArticle}
                    authorState={authorState}
                    setAuthorState={setAuthorState}
                  />
                </div>
              </div>
              <div className="article__content">
                <div className="article__body">
                  <p>{articleData.body}</p>
                  <div className="article__tag-list">
                    {
                      articleData.tagList?.map(tag => <span>{tag}</span>)
                    }
                  </div>
                </div>
                <div className="article__comment">
                  <ArticleCTA
                    isAuthor={isAuthor}
                    articleData={articleData}
                    onDeleteArticle={onDeleteArticle}
                    authorState={authorState}
                    setAuthorState={setAuthorState}
                  />
                  <CommentSection slug={articleData.slug} isAuthor={isAuthor} />
                </div>
              </div>
            </div>
          )
      }
    </>
  )
};
export default Article;