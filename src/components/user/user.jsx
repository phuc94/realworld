import Info from "./info";
import Feed from "../feed/feed";
import { useState } from "react";
import produce from "immer";

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

const User = () => {
  const [feedData, setFeedData] = useState(initState);

  const tabOnClick = e => {
    console.log(feedData)
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
      <Info />
      <Feed
        tabOnClick={tabOnClick}
        feedData={feedData}
        setFeedData={setFeedData}
      />
    </div>
  )
};
export default User;