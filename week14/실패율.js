function solution(N, stages) {
  let result = [];

  for (let i = 1; i <= N; i++) {
    let reach = stages.filter((x) => x >= i).length; // 스테이지 i에 도달한 플레이어 수
    let curr = stages.filter((x) => x === i).length; // 스테이지 i에서 머물러 있는 플레이어 수
    result.push([i, curr / reach]); // 스테이지 번호와 실패율을 배열에 추가
  }

  result.sort((a, b) => b[1] - a[1]); // 실패율에 따라 내림차순으로 정렬
  return result.map((x) => x[0]); // 정렬된 스테이지 번호만 추출하여 반환
}
