## 1

### 문제 - <code>문자열 내 마음대로 생성하기</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

### 풀이 코드

```
javascript
function solution(strings, n) {

    return strings.sort((s1, s2) => s1[n] === s2[n] ?
                        s1.localeCompare(s2) : s1[n].localeCompare(s2[n]));
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 2

### 문제 - <code>기사단원의무기</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)
1. number 크기의 배열 cnt를 0으로 초기화합니다. 이 배열은 각 숫자의 약수 개수를 저장합니다.
2. 각 숫자 i에 대해 1부터 √(i+1)까지 반복하여 약수의 개수를 계산합니다.
	•	(i+1) % k === 0인 경우, k가 i+1의 약수임을 의미합니다.
	•	k가 i+1의 제곱근인 경우 약수 개수를 1 증가시키고, 그렇지 않은 경우 약수 개수를 2 증가시킵니다.
	•	이렇게 계산한 약수 개수를 배열 cnt의 i번째 요소에 저장합니다.
3. 배열 cnt의 각 요소에 대해 limit을 초과하는 경우 해당 요소를 power로 대체합니다.
4. 배열 cnt의 모든 요소의 합을 계산하여 result에 저장합니다.
### 풀이 코드

```
javascript
function solution(number, limit, power) {
  // 각 숫자의 약수 개수를 저장할 배열
  let cnt = new Array(number).fill(0);

  // 약수 개수 계산
  for (let i = 0; i < number; i++) {
    let divisorsCount = 0;
    for (let k = 1; k <= Math.sqrt(i + 1); k++) {
      if ((i + 1) % k === 0) {
        if (k === (i + 1) / k) {
          divisorsCount++; // 제곱근일 때
        } else {
          divisorsCount += 2; // 서로 다른 약수일 때
        }
      }
    }
    cnt[i] = divisorsCount;
  }

  cnt = cnt.map((element) => {
    if (element > limit) {
      return power;
    }
    return element;
  });

  // 배열의 합 계산
  let result = cnt.reduce((a, e) => a + e, 0);

  return result;
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 3

### 문제 - <code>개인정보 수집 유효 기간</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

1. 오늘 날짜를 년 월 일로 잘라 배열에 저장합니다.
2. 약관별 유효기간을 공백을 기준으로 나눕니다
3. 개인정보 유효기간을 공백을 기준으로 나누고 '.'를 기준으로 나눕니다;
4. 유효기간을 넘은 것을 골라냅니다.

### 풀이 코드

```
javascript
function solution(today, terms, privacies) {
    let result = [];
    const todaySplitArr = today.split('.').map((element) => +element); // 오늘 날짜를 숫자로 변환하여 배열에 저장
    const expireDateMap = new Map();

    // 약관별 유효기간을 Map 객체에 저장
    for (let i = 0; i < terms.length; i++) {
        let [key, value] = terms[i].split(" "); // 공백을 기준으로 분리
        expireDateMap.set(key, +value); // 키는 문자 그대로, 값은 정수로 변환하여 Map에 저장
    }

    // 개인정보별 유효기간을 확인하여 결과에 추가
    for (let i = 0; i < privacies.length; i++) {
        let [date, key] = privacies[i].split(" "); // 공백을 기준으로 분리
        let [year, month, day] = date.split('.').map(Number); // 날짜를 년, 월, 일로 분리하여 숫자로 변환

        // 유효기간 더하기
        month += expireDateMap.get(key); // 월에 유효기간을 더함
        year += Math.floor(month / 12); // 년도를 월 수에 따라 증가
        month = month % 12 || 12; // 12월을 초과하면 월을 1~12 사이로 조정

        if (month === 12) year--; // 월이 12인 경우에는 다음 년도로 넘어가지 않도록 조정

        // 날짜 비교
        if (year < todaySplitArr[0] ||
           (year === todaySplitArr[0] && month < todaySplitArr[1]) ||
           (year === todaySplitArr[0] && month === todaySplitArr[1] && day <= todaySplitArr[2])) {
            result.push(i + 1);
        }
    }

    return result;
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)
주어진 값을 내가 원하는 대로 정리하는것이 관건이었습니다. 좀더 문법에 능숙해져야할 거 같습니다

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)
풀고나서 date 메서드 쓰신 거보고 그렇게도 풀어봐야겠다 생각했습니다.
