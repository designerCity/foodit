import FoodList from './FoodList';
// import mookItems from '../mock.json';
import { useEffect, useState } from 'react';
import { getList } from '../api'


function App() {
// 삭제 버튼을 통해서 브라우저를 재구성하려면 state에 대한 clone 을 만들어둬야 한다. 
  const [items, setIems] = useState([])
  // cursor state 를 사용
  const [cursor, setCursor] = useState(null); 
// 최신순을 처음 state 로 만들기 
  const [recentList, setRecentList] = useState('createdAt')
  const sortedItems = items.sort((a, b) => b[recentList] - a[recentList]);
  // const [hasNext, setHasNext] = useState(false) // 더 보기란을 만들 것인지에 대한 state
  const [isLoading, setIsLoading] = useState(false)
  const [loadingError, setLoadingError] = useState(null);
  // search state 
  const [search, setSearch] = useState('')
// 즉시실행함수로 정의해야한다. 
  const handleNewestClick = () => setRecentList('createdAt')
  const handleBestClick = () => setRecentList('calorie')

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setIems(newItems)
  }
  // network 로 data 를 받아와서 items state 를 변경할 버튼 
  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getList(options);
    } catch(error) {
      setLoadingError(error)
      return
    } finally {
      setIsLoading(false)
    }
    const { foods, paging: { nextCursor }, } = result;
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
      search,
    });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target['search'].value);
  };
  
  useEffect(() => {
    handleLoad({ search, recentList });
  }, [recentList, search])

  return (
    <div>
      <div>
        <button className='btn' onClick={handleNewestClick}> 최신순 </button>
        <button className='btn' onClick={handleBestClick}> 칼로리 순 </button>
      </div>
      <form onSubmit={handleSearchSubmit}>
        <input name='search'></input>
        <button type='submit'> 검색 </button>
      </form>
      <FoodList items={sortedItems} onDelete={handleDelete}/>
      {cursor && <button disabled={isLoading} onClick={ handleLoadMore }>More</button>}
      {loadingError?.message && <p>{loadingError.message}</p>}
    </div>
  );
}

export default App;
