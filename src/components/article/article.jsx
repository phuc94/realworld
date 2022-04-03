import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleAPI } from "../../service/article";
import ArticleCTA from "./cta";
import CommentSection from "./comment/commentSection";

const Article = () => {
  const params = useParams();
  const [state, setState] = useState({});

  useEffect(() => {
    getArticleAPI(params.slug).then(res => {
      if (res.status == 200) {
        setState(res.data.article);
        console.log(res.data.article);
      }
    })
  }, [])

  return (
    <div className="article">
      <div className="article__title">
        <div>
          <h1>{state.title}</h1>
          <ArticleCTA author={state.author} createdAt={state.createdAt} />
        </div>
      </div>
      <div className="article__content">
        <div className="article__body">
          <p></p>
          <div className="article__tag-list">
            {
              state.tagList?.map(tag => <span>{tag}</span>)
            }
          </div>
        </div>
        <div className="article__comment">
          <ArticleCTA author={state.author} createdAt={state.createdAt} />
          <CommentSection />
        </div>
      </div>
    </div>
  )
};
export default Article;