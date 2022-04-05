import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { followUserAPI, unfollowUserAPI } from "../../service/user";

const Info = ({ userInfo, setUserInfo }) => {
  const [isOwner, setIsOwner] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const username = useSelector(state => state.user?.info?.username);

  useEffect(() => {
    if (userInfo == username == undefined) return;
    if (userInfo.username == username) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [userInfo, username])

  const onFollow = () => {
    if (isPending) { return }
    else { setIsPending(true) };
    if (userInfo.following) {
      unfollowUserAPI(userInfo.username).then(res => {
        if (res.status == 200) {
          setUserInfo(res.data.profile);
          setIsPending(false);
        }
      })
    } else {
      followUserAPI(userInfo.username).then(res => {
        if (res.status == 200) {
          setUserInfo(res.data.profile);
          setIsPending(false);
        }
      })
    }
  }

  return (
    <div className="info__container">
      <div className="info__wrapper">
        <div className="info">
          <img src={userInfo?.image} alt="" />
          <h4>{userInfo?.username}</h4>
          <p>{userInfo?.bio}</p>
        </div>
        {
          isOwner ?
            (
              <button
                onClick={() => navigate('/settings')}
              >
                <i className="ion-gear-a"> </i>
                Edit Profile Settings
              </button>
            )
            :
            (
              <button
                className={`btn --edit 
                ${userInfo.following ? '--followed' : ''} 
                ${isPending ? '--follow-pending' : ''}
                `}
                onClick={() => onFollow()}
              >
                <i className="ion-plus-round"> </i>
                {userInfo.following ? 'Unfollow' : 'Follow'} {userInfo?.username}
              </button>
            )
        }
      </div>
    </div>
  )
};
export default Info;