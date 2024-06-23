function solution(name, yearning, photo) {
  let result = []; // 결과를 저장할 배열
  
  // name과 yearning을 매핑한 객체 생성
  let yearningMap = {}; // 이름을 키로, 갈망 점수를 값으로 하는 객체
  for (let i = 0; i < name.length; i++) {
      yearningMap[name[i]] = yearning[i]; // 각 이름에 해당하는 갈망 점수를 매핑
  }
  console.log(yearningMap)
  // photo 배열을 순회하며 결과 계산
  for (let i = 0; i < photo.length; i++) {
      let tmp = 0; // 각 사진에 대한 총 갈망 점수를 저장할 임시 변수
      for (let j = 0; j < photo[i].length; j++) {
          if (yearningMap[photo[i][j]] !== undefined) { // 현재 이름이 yearningMap에 존재하는지 확인
              tmp += yearningMap[photo[i][j]]; // 존재하면 해당 갈망 점수를 더함
          }
      }
      result.push(tmp); // 각 사진에 대한 총 갈망 점수를 결과 배열에 추가
  }
  
  return result; // 최종 결과 반환
}