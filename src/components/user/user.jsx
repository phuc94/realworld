import Info from "./info";
import Feed from "../feed/feed";
import { useState, useEffect } from "react";
import produce from "immer";
import { getUserAPI } from "../../service/user";

const initState = {
  tag: false,
  activeTab: 'My Articles',
  tabs: [
    'My Articles',
    'Favorited Articles'
  ],
  isLoading: false,
  arr: []
}

const User = ({ username }) => {
  const [userInfo, setUserInfo] = useState({});
  const [feedData, setFeedData] = useState(initState);

  useEffect(() => {
    if (username == undefined) return;
    getUserAPI(username).then(res => {
      if (res.status == 200) {
        setUserInfo(res.data.profile);
      }
    })
  }, [username])

  const tabOnClick = e => {
    setFeedData(produce(draft => {
      draft.activeTab = e.target.innerHTML;
      if (draft.tag == true) {
        draft.tag = false;
        draft.tabs.pop();
      }
    }))
  }

  return (
    <div className="user">
      <Info
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <Feed
        username={username}
        tabOnClick={tabOnClick}
        feedData={feedData}
        setFeedData={setFeedData}
      />
    </div>
  )
};
export default User;