import { useState } from "react";
import produce from "immer";
import { createArticleAPI } from "../../service/article";
import { useNavigate } from "react-router-dom";

const formInitialState = {
  article: {
    title: '',
    description: '',
    body: '',
    tagList: '',
  }
};

const EditorForm = () => {
  const [formState, setFormState] = useState(formInitialState);
  const navigate = useNavigate();

  const onInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const newFormState = produce(formState, draft => {
      draft.article[name] = value;
    });
    setFormState(newFormState);
  }

  const onFormSubmit = e => {
    e.preventDefault();
    let formData;
    formData = JSON.parse(JSON.stringify(formState));
    formData.article.tagList = formData.article.tagList.split(/[, ]+/);
    createArticleAPI(formData).then(res => {
      if (res.status == 200 || res.status == 204) {
        navigate("/");
      }
    });
  }

  return (
    <div className="form editor-form">
      <form action="" onSubmit={e => onFormSubmit(e)}>
        <fieldset>
          <input
            type="text"
            placeholder="Article Title"
            name="title"
            value={formState.article.title}
            onChange={e => onInputChange(e)}
          />
        </fieldset>
        <fieldset>
          <input
            type="text"
            className="form--smaller"
            name="description"
            value={formState.article.description}
            onChange={e => onInputChange(e)}
            placeholder="What's this article about?"
          />
        </fieldset>
        <fieldset>
          <textarea
            className="form--smaller"
            rows="8"
            name="body"
            value={formState.article.body}
            onChange={e => onInputChange(e)}
            placeholder="Write your article (in markdown)"></textarea>
        </fieldset>
        <fieldset>
          <input
            type="text"
            className="form--smaller"
            name="tagList"
            value={formState.article.tagList}
            onChange={e => onInputChange(e)}
            placeholder="Enter tagList" />
        </fieldset>
        <button className="btn" type="submit">Publish Article</button>
      </form>
    </div>
  )
};
export default EditorForm;