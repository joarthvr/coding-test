## 1

### 문제 - <code>비밀지도</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)
1. 이진수로 각각 변환후 padStart로 빈 부분을 0으로 채워줍니다
2. 순회하며 겹치는 부분을 처리합니다.
### 풀이 코드

```
javascript
function solution(n, arr1, arr2) {
    arr1 = arr1.map(e => e.toString(2).padStart(n, '0'));
    arr2 = arr2.map(e => e.toString(2).padStart(n, '0'));
    let result = [];
    let tmp = ""
    for(let i = 0; i < n; i++){
        tmp = ""
        for(let j = 0; j < n; j++){
            if(arr1[i][j] === '0' && arr2[i][j] === '0'){
                tmp +=" ";
            }
            else{
                tmp +="#";
            }
        }
        result.push(tmp);
    }
    return result
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)
padStart 메서드를 알 수 있었습니다.

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 2

### 문제 - <code>다트게임</code>

### 알고리즘 설계
1. dartResult를 숫자는 숫자로 문자는 문자로 split합니다.
2. 숫자를 기준으로 나눠 새로운 배열에 담았습니다
    2-1 ex-[1,"S",2,"D","*",3,"T"] => [[1,'S'],[2,'D','*'],[3,'T']]
3. 순회하며 논리에 맞게 배열의 첫번째 원소부터 계산해서 다시 배열에 담았습니다.
    3-1 ex- [ 2, 8, 27 ]
4. 3의 배열을 모두 더합니다.
(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

### 풀이 코드

```
javascript
function solution(dartResult) {
  // 문자열을 배열로 변환하고, 숫자는 정수로 변환
  dartResult = dartResult
    .split("")
    .map((e) => (Math.floor(e) >= 0 ? Math.floor(e) : e));
  const result = []; // 최종 결과를 저장할 배열
  let currentGroup = []; // 현재 처리 중인 그룹을 저장할 배열
  const numSave = [];
  let currentNumber = "";

  for (let i = 0; i < dartResult.length; i++) {
    const element = dartResult[i];

    if (typeof element === "number") {
      // 숫자인 경우, 현재 숫자에 추가
      currentNumber += element;
    } else {
      // 문자인 경우, 이전에 처리 중이던 숫자가 있다면 그룹에 추가
      if (currentNumber !== "") {
        // 이전 그룹이 있다면 결과에 추가
        if (currentGroup.length > 0) {
          result.push(currentGroup);
          currentGroup = [];
        }
        currentGroup.push(parseInt(currentNumber));
        currentNumber = "";
      }
      // 현재 문자를 그룹에 추가
      currentGroup.push(element);
    }
  }

  // 마지막 그룹 처리
  if (currentNumber !== "") {
    currentGroup.push(parseInt(currentNumber));
  }
  if (currentGroup.length > 0) {
    result.push(currentGroup);
  }

  // console.log(result[0].length);
  for (let i = 0; i < result.length; i++) {
    const element = result[i];
    let middleResult = 0;
    const num = element[0];

    const pow = element[1];

    if (pow === "S") middleResult += num;
    if (pow === "D") middleResult += Math.pow(num, 2);
    if (pow === "T") middleResult += Math.pow(num, 3);

    if (element.length >= 3) {
      const bonus = element[2];

      if (bonus === "*") {
        middleResult = middleResult * 2;
        numSave[numSave.length - 1]
          ? (numSave[numSave.length - 1] = numSave[numSave.length - 1] * 2)
          : (numSave[numSave.length - 1] = numSave[numSave.length - 1]);
      }
      if (bonus === "#") {
        middleResult = -middleResult;
      }
    }
    numSave.push(middleResult);
  }

  const allSum = numSave.reduce((acc, e) => {
    return (acc += e);
  }, 0);

  return allSum;
}


```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)
제일 어려운 문제였습니다. 문제의 원리를 파악하는 건 수월했지만 구현하기가 저에겐 까다로웠습니다.
도움을 좀 받아서 풀었고 다시 풀어볼 생각입니다.

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 3

### 문제 - <code>로또 최고 순위와 최저 순위</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)
1. 맞춘 개수에 따라 순위를 결정할 수 있게 순위를 담은 배열을 생성합니다.
2. 필터를 통해 당첨 번호와 비교하여 최소로 맞출 수 있는 개수를 저장합니다.
3. 0의 개수를 세서 최대 맞출 수 있는 로또 개수를 계산합니다.
4. 각 개수에 따라 순위를 결정합니다.

### 풀이 코드

```
javascript
function solution(lottos, win_nums) {
    const score = [6, 6, 5, 4, 3, 2, 1];  // 맞춘 개수에 따른 순위 배열
    const min = lottos.filter(num => win_nums.includes(num)).length;  // 최소 맞춘 개수
    const zeroCnt = lottos.filter(num => num === 0).length;  // 0의 개수
    const max = min + zeroCnt;  // 최대로 맞출 수 있는 개수

    return [score[max], score[min]];  // 최고 순위와 최저 순위 반환
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)
풀고나서 date 메서드 쓰신 거보고 그렇게도 풀어봐야겠다 생각했습니다.
