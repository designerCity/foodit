// response 받아와서 쓰는 함수들을 정리할 것이다. 

export async function getList({ order = '', cursor = '', limit }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/api/foods?${query}`);
  const body = await response.json();
  return body;
}
