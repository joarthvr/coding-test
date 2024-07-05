function solution(s) {
  // 숫자를 영어로 표현한 단어들을 담은 배열
  const alphabet = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  
  // 배열의 각 단어에 대해 반복
  alphabet.forEach((word, index) => {
    // 문자열 s에 해당 단어가 포함되어 있는 동안 반복
    while (s.includes(word)) {
      // 단어를 해당 숫자로 대체
      s = s.replace(word, index);
    }
  });

  // 문자열을 숫자로 변환하여 반환
  return Number(s);
}