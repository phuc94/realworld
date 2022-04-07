import ArticleItem from "./articleItem";
import FeedTabs from "./feedTabs";
import { useEffect } from "react";
import { getFeedAPI } from "../../service/article";
import produce from "immer";
import Pagination from "./pagination";

const Feed = ({ tabOnClick, feedData, setFeedData, username }) => {
  const pathSelector = (activeTab) => {
    switch (activeTab) {
      case 'Global Feed':
        return '/articles';
      case 'Your Feed':
        return '/articles/feed';
      case 'My Articles':
        return `/articles?author=${username}`;
      case 'Favorited Articles':
        return `/articles?favorited=${username}`;
      default:
        return '/articles';
    }
  }

  useEffect(() => {
    setFeedData(produce(draft => { draft.isLoading = true }));
    const controller = new AbortController;
    let query = {
      offset: feedData.offset,
      limit: feedData.limit
    }
    let path;

    if (feedData.tag == true) {
      query.tag = feedData.activeTab;
    }
    path = pathSelector(feedData.activeTab);

    getFeedAPI(path, query, controller)
      .then(res => {
        if (res) {
          if (res.status == 200) {
            const newState = produce(draft => {
              draft.isLoading = false;
              draft.arr = res?.data?.articles
              draft.articlesCount = res?.data?.articlesCount;
            })
            setFeedData(newState);
          }
        }
      });

    return () => {
      controller.abort();
    };

  }, [feedData.activeTab])

  const onPaginate = (offset) => {
    setFeedData(produce(draft => {
      draft.isLoading = true
    }));
    const controller = new AbortController;
    const path = pathSelector(feedData.activeTab);
    const query = {
      limit: feedData.limit,
      offset
    }
    getFeedAPI(path, query, controller).then(res => {
      if (res.status == 200) {
        const newState = produce(draft => {
          draft.isLoading = false;
          draft.arr = res?.data?.articles;
          draft.offset = offset;
        })
        setFeedData(newState);
      }
    })
  }

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
              <ArticleItem key={item.slug} data={item} />
            )
        }
        {
          feedData.articlesCount > feedData.limit ?
            (
              <Pagination feedData={feedData} onPaginate={onPaginate} />
            )
            :
            (<></>)
        }
      </div>
    </div>
  )
};
export default Feed;