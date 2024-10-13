function solution(n, t, m, p) {
  let gameSequence = "";
  let num = 0;

  // 게임 시퀀스 생성
  while (gameSequence.length < t * m) {
    gameSequence += num.toString(n).toUpperCase();
    num++;
  }

  // 튜브의 순서에 해당하는 문자 추출
  let result = "";
  for (let i = p - 1; i < gameSequence.length && result.length < t; i += m) {
    result += gameSequence[i];
  }

  return result;
}
