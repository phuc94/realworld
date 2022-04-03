import Feed from "../feed/feed";
import Tags from "./tags";
import Banner from "./banner";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import produce from "immer";

const initState = {
  tag: false,
  activeTab: 'Global Feed',
  tabs: [
    'Global Feed'
  ],
  isLoading: false,
  arr: []
}

const Home = () => {
  const [feedData, setFeedData] = useState(initState);
  const isAuthorized = useSelector(state => state.user.authorized);

  useEffect(() => {
    if (isAuthorized == true) {
      setFeedData(produce(draft => {
        draft.tabs.unshift('Your Feed');
        draft.activeTab = 'Your Feed';
      }))
    }
  }, [isAuthorized])

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
  const tagOnClick = e => {
    console.log(feedData)
    setFeedData(produce(draft => {
      if (draft.tag == true) {
        draft.tabs.pop();
      }
      draft.tabs.push(e.target.innerHTML);
      draft.activeTab = e.target.innerHTML;
      draft.tag = true;
    }))
  }

  return (
    <div className="home__wrapper">
      {
        isAuthorized ?
          (<span></span>)
          :
          (<Banner />)
      }
      <div className="home">
        <Feed
          tabOnClick={tabOnClick}
          feedData={feedData}
          setFeedData={setFeedData}
        />
        <Tags
          tagOnClick={tagOnClick}
        />
      </div>
    </div>
  )
};
export default Home;