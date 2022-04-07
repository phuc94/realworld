import { useState, useEffect } from "react";

const Pagination = ({ feedData, onPaginate }) => {
  const [paginationState, setPaginationState] = useState([]);
  useEffect(() => {
    if (feedData == undefined) return;
    const pageCount = Math.ceil(feedData.articlesCount / feedData.limit);
    const curPage = feedData.offset == 0 ? 0 : feedData.offset / 10;
    let paginationArr = [];
    for (let i = 0; i < pageCount; i++) {
      const isCurrent = i == curPage ? true : false;
      paginationArr.push({
        current: isCurrent
      });
    }
    setPaginationState(paginationArr);
    console.log(paginationArr);
  }, [feedData])

  const onPageClick = e => {
    const offset = Number(e.target.innerHTML - 1) * 10;
    onPaginate(offset);
  }

  return (
    <div className="pagination">
      {
        paginationState.map((item, index) => (
          <span
            key={index}
            className={`${item.current ? '--active' : ''}`}
            onClick={e => onPageClick(e)}
          >{index + 1}
          </span>
        ))
      }
    </div>
  )
};
export default Pagination;