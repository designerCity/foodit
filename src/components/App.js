import FoodList from './FoodList';
// import mookItems from '../mock.json';
import { useEffect, useState } from 'react';
import { getList } from '../api'

const LIMIT = 5;


function App() {
// 삭제 버튼을 통해서 브라우저를 재구성하려면 state에 대한 clone 을 만들어둬야 한다. 
  const [items, setIems] = useState([])
  // cursor state 를 사용
  const [cursor, setCursor] = useState(null); 
// 최신순을 처음 state 로 만들기 
  const [recentList, setRecentList] = useState('createdAt')
  const sortedItems = items.sort((a, b) => b[recentList] - a[recentList]);
  // const [hasNext, setHasNext] = useState(false) // 더 보기란을 만들 것인지에 대한 state

// 즉시실행함수로 정의해야한다. 
  const handleNewestClick = () => setRecentList('createdAt')
  const handleBestClick = () => setRecentList('calorie')

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setIems(newItems)
  }
  // network 로 data 를 받아와서 items state 를 변경할 버튼 
  const handleLoad = async (options) => {
    const { foods, paging: { nextCursor }, } = await getList(options);
    if (!options.cursor) {
      setIems(foods);
    } else {
      setIems((prevItems) => ([...prevItems, ...foods]))
    }  
    setCursor(nextCursor);
    // 더 보기란을 만들 것인지에 대한 state
  }
  const handleLoadMore = () => {
    handleLoad({
      recentList,
      cursor,
    });
  };
  useEffect(() => {
    handleLoad({ offset: 0, limit: LIMIT });
  }, [recentList])

  return (
    <div>
      <div>
        <button className='btn' onClick={handleNewestClick}> 최신순 </button>
        <button className='btn' onClick={handleBestClick}> 별점순 </button>
      </div>
      <FoodList items={sortedItems} onDelete={handleDelete}/>
      {cursor && <button onClick={ handleLoadMore }>More</button>}
    </div>
  );
}

export default App;
