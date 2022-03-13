// response 받아와서 쓰는 함수들을 정리할 것이다. 

export async function getList({ order = '', cursor = '', limit }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/api/foods?${query}`);
  const body = await response.json();
  return body;
}
// request 를 받아서 오는 response 를 json data 로 전환하여, body 에 넘겨준다. 
