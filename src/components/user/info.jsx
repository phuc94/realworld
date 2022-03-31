import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.user.info);

  return (
    <div className="info__container">
      <div className="info__wrapper">
        <div className="info">
          <img src={userInfo.image} alt="" />
          <h4>{userInfo.username}</h4>
          <p>{userInfo.bio}</p>
        </div>
        <button onClick={() => navigate('/settings')}>
          <i className="ion-gear-a"> </i>
          Edit Profile Settings
        </button>
      </div>
    </div>
  )
};
export default Info;