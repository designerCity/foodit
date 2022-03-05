import ReviewList from './ReviewList';
// import mockItems from '../mock.json';
import { useState } from 'react';
import './App.css'
import { getReviews } from '../api';


// 별점이 높은 순으로 정렬하는 것
function App() {
  // mockItems를 여러 부분으로 사용할 수 있게끔 미리 clone 을 만들어둔다. 
  const [items, setItems] = useState([]);

  // 정렬 기준을 선택할 수 있게끔 state 를 활용하는 방법.
  const [order, setOrder] = useState('createAt')
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  
  // button 태그를 통해 최신순이나 별점순을 선택할 수 있게끔 하는 것. // 표현에 주의하자 // 즉시실행함수로 표현해야함.
  const handleNewestClick = () => setOrder('createdAt')
  const handleBestClick = () => setOrder('rating')
  
  // ReviewList component 에서 handleDeleteClcik 함수는 item 의 id 를 삭제하면, 
  // 그 div 의 id 가 사라진거지, 모든 것이 사라진 것이 아닌데, 원래의 items 의 각 id 와 삭제된 id 가 같지 않으면,
  // filter method 를 통해서 true 인 값만은 callback 하는 함수 를 통해서 삭제한 state 를 nextItems 에 저장하여, browser 에 보여준다. 
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems)
  }
  
  // click 하면 network 로 data 를 받아와서 items state 를 변경할 버튼
  const handleLoadClick = async () => {
    // response body 에 있는 reviews 라는 값을 destructuring 
    const { reviews } = await getReviews();
    // state 를 변경 
    setItems(reviews);
  }
  return (
    <div>
      <div>
        <button className='btn' onClick={handleNewestClick}>최신순</button>
        <button className='btn' onClick={handleBestClick}>별점순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete}/>
      <button onClick={handleLoadClick}>불러오기</button>
    </div>
  );
}

export default App;
