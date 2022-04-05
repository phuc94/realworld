import { useNavigate } from "react-router-dom";

const Author = ({ author, createdAt }) => {
  const navigate = useNavigate();

  return (
    <div className="author ">
      <div className="author__img">
        <img src={author?.image} alt="profile" />
      </div>
      <div>
        <p
          onClick={() => { navigate(`/@${author?.username}`) }}
        >{author?.username}</p>
        <span>{createdAt}</span>
      </div>
    </div>
  )
};
export default Author;