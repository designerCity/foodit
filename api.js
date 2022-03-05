// request 함수들을 모아놓을 파일 
// 비동기함수 async await 사용 
export async function getReviews() {
  const response =await fetch('https://learn.codeit.kr/api/film-reviews')
  const body = await response.json();
  return body;
}