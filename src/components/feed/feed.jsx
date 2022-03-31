import FeedItem from "./feedItem";
import FeedTabs from "./feedTabs";
import { useEffect } from "react";
import { getFeedAPI } from "../../service/article";
import produce from "immer";
import { useSelector } from "react-redux";

const Feed = ({ tabOnClick, feedData, setFeedData }) => {
  const user = useSelector(state => state.user?.info?.username);

  const pathSelector = (activeTab) => {
    switch (activeTab) {
      case 'Global Feed':
        return '/articles';
      case 'Your Feed':
        return '/feed';
      case 'My Articles':
        return `/articles?author=${user}`;
      case 'Favorited Articles':
        return `/articles?favorited=${user}`;
      default:
        return 'articles';
    }
  }

  useEffect(() => {
    setFeedData(produce(draft => { draft.isLoading = true }));
    const controller = new AbortController;
    let query;
    let path;

    if (feedData.tag == true) {
      query = {
        tag: feedData.activeTab
      }
    }
    path = pathSelector(feedData.activeTab);
    console.log(path);

    getFeedAPI(path, query, controller)
      .then(res => {
        if (res) {
          const newState = produce(draft => {
            draft.isLoading = false;
            draft.arr = res?.data?.articles
          })
          setFeedData(newState);
        }
      });

    return () => {
      controller.abort();
    };

  }, [feedData.activeTab])

  return (
    <div className="feed">
      <FeedTabs
        activeTab={feedData.activeTab}
        tabs={feedData.tabs}
        tabOnClick={tabOnClick}
      />
      <div className="feed__content">
        {
          !feedData.isLoading && feedData.arr.length == 0 && (
            <p className="feed__loading">No article are here...yet.</p>
          )
        }
        {
          feedData.isLoading
            ?
            (
              <p className="feed__loading">Loading articles...</p>
            )
            :
            feedData.arr.map(item =>
              <FeedItem key={item.slug} data={item} />
            )
        }
      </div>
    </div>
  )
};
export default Feed;