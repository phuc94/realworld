import { getTagAPI } from '../../service/tag';
import { useEffect, useState } from 'react';
import produce from 'immer';

const Tags = ({ tagOnClick }) => {
  const [tags, setTags] = useState({ arr: undefined });

  useEffect(() => {
    getTagAPI().then(res => {
      setTags(produce(draft => {
        draft.arr = res.data.tags;
      }))
    })
  }, [])

  return (
    <div className='tags__wrapper'>
      <div className="tags">
        <p>Popular tags</p>
        <div className="tags__content">
          {
            (tags.arr == undefined) ?
              (
                <p>Loading tags...</p>
              )
              :
              (
                tags.arr.map((tag, index) => (
                  <span
                    onClick={e => tagOnClick(e)}
                    key={index}
                  >
                    {tag}
                  </span>
                ))
              )
          }
        </div>
      </div>
    </div>
  )
};
export default Tags;