import FoodList from './FoodList';
import mookItems from '../mock.json';
import { useState } from 'react';

function App() {
// 삭제 버튼을 통해서 브라우저를 재구성하려면 state에 대한 clone 을 만들어둬야 한다. 
  const [items, setIems] = useState(mookItems)
// 최신순을 처음 state 로 만들기 
  const [recentList, setRecentList] = useState('createdAt')
  const sortedItems = items.sort((a, b) => b[recentList] - a[recentList]);
// 즉시실행함수로 정의해야한다. 
  const handleNewestClick = () => setRecentList('createdAt')
  const handleBestClick = () => setRecentList('calorie')

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setIems(newItems)
  }

  return (
    <div>
      <div>
        <button className='btn' onClick={handleNewestClick}> 최신순 </button>
        <button className='btn' onClick={handleBestClick}> 별점순 </button>
      </div>
      <FoodList items={sortedItems} onDelete={handleDelete}/>
    </div>
  );
}

export default App;
