import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleAPI } from "../../service/article";
import Author from "./author";

const Article = () => {
  const params = useParams();
  const [state, setState] = useState({});
  console.log(params);

  useEffect(() => {
    getArticleAPI(params.slug).then(res => {
      if (res.status == 200) {
        setState(res.data.article);
      }
    })
  }, [])

  return (
    <div className="article">
      <h1>{state.title}</h1>
      <Author author={state.author} />
    </div>
  )
};
export default Article;