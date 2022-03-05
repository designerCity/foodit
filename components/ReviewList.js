import './ReviewList.css'
function formatDate(value) { 
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`
}
// ReviewListItem 은 item prop 과 onDelete prop 을 받는데, 
// ReviewListItem 은 각 영화의 div 를 만든다. 
function ReviewListItem({ item, onDelete }) {
  // handleDeleteClcik 함수는 item 의 id 를 삭제한다.
  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}> 삭제 </button>
      </div>
    </div>
  );
}

// prop 으로 items 라는 배열을 받는 ReviewList component
// 각 영화의 리스트를 짠 RiviewListItem 을 배열로 다루어서 이 div 의 배열은 만드는 component 이다.
function ReviewList({ items, onDelete }) {

// 이 component 의 onDelete 를 설정해주어야 App component 에서 handleDelete 함수가 실행되게끔 해준다. 
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete}/>
          </li>
        );
    })}
  </ul>
  )
}
export default ReviewList;