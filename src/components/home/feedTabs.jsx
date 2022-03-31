const FeedTabs = ({ tabOnClick, tabs, activeTab }) => {
  return (
    <ul className="feed__tabs">
      {
        tabs.map((item, index) => (
          <li
            key={index}
            className={activeTab == item ? 'active' : ''}
            onClick={(e) => tabOnClick(e)}
          >
            {item}
          </li>
        ))
      }
    </ul>
  )
};
export default FeedTabs;