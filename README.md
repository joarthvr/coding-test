## 1

### 문제 - <code>피로도</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)
순서 상관없이 생성 가능한 조합을 검사해서 피로도에 따라 최대로 탐색할 수 있는 경우의 수를 찾아내야 합니다.

1. dfs 형식으로 인덱스를 기준으로 재귀를 통해 배열을 탐색
2. 피로도 조건 검사
3. 최대 탐색 수 리턴

### 풀이 코드

```jsx
function dfs(k, dungeons, explored = []) { // 기본 매개변수 
  let maxExplored = explored.length;
  for (let i = 0; i < dungeons.length; i++) {
    if (k >= dungeons[i][0]) { // 필요한 피로도
      let newK = k - dungeons[i][1]; // 소진한 피로도
      const newDungeons = dungeons.filter((_, index) => index !== i); // 해당 인덱스의 원소를 제거한 배열을 생성
      const newExplored = [...explored, dungeons[i]]; // 해당 인덱스의 원소 결합
      dfs(newK, newDungeons, newExplored); // 재귀
      const result = dfs(newK, newDungeons, newExplored);
      maxExplored = Math.max(maxExplored, result);
    }
  }
  return maxExplored;
}

function solution(k, dungeons) {
  return dfs(k, dungeons);
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

push() 메서드는 배열의 길이를 반환하는데. 처음에 const newDungeons = dungeons.push(dungeons[i]); 
이렇게 코드를 작성했는데 newDungeons는 새 배열이 아니라 숫자를 반환합니다.

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 2

### 문제 - <code>뉴스클러스터링</code>

### 알고리즘 설계
다중집합이라는 개념에 대해서 처음 접해보는 문제였던 거 같습니다.
그냥 집합으로 하면 set으로 하면 되는데 그게 안되서 까다로웠습니다.
1. Map으로 정리
2. 합집합 교집합 계산
3. 자카드 유사도 계산

### 풀이 코드

```jsx
function isRealEng(char) {
  const code = char.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function splitter(word) {
  const result = [];
  for (let i = 0; i < word.length - 1; i++) {
    if (isRealEng(word[i]) && isRealEng(word[i + 1])) {
      result.push(word.slice(i, i + 2).toLowerCase());
    }
  }
  return result;
}

function calculateJaccardSimilarity(arr1, arr2) {
  const JACCARD_CONST = 65536;

  const countMap1 = new Map();
  const countMap2 = new Map();

  arr1.forEach((item) => countMap1.set(item, (countMap1.get(item) || 0) + 1));
  arr2.forEach((item) => countMap2.set(item, (countMap2.get(item) || 0) + 1));

  let intersection = 0;
  let union = 0;

  for (const [item, count1] of countMap1) {
    const count2 = countMap2.get(item) || 0;
    intersection += Math.min(count1, count2);
    union += Math.max(count1, count2);
  }

  for (const [item, count2] of countMap2) {
    if (!countMap1.has(item)) {
      union += count2;
    }
  }

  if (union === 0) return JACCARD_CONST;

  return Math.floor((intersection / union) * JACCARD_CONST);
}

function solution(str1, str2) {
  const arr1 = splitter(str1);
  const arr2 = splitter(str2);
  return calculateJaccardSimilarity(arr1, arr2);
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

const code = char.charCodeAt(0);
() 안의 숫자에 해당하는 인덱스를 변환한다는 사실을 알았습니다.

```jsx
// 교집합 구하는 방식들
// 방법 1: Set과 filter 사용
function intersection1(arr1, arr2) {
  const set = new Set(arr2);
  return arr1.filter((x) => set.has(x));
}

// 방법 2: Set과 Array.from 사용
function intersection2(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return Array.from(new Set([...set1].filter((x) => set2.has(x))));
}

// 방법 3: reduce와 includes 사용
function intersection3(arr1, arr2) {
  return arr1.reduce((acc, cur) => {
    if (arr2.includes(cur) && !acc.includes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);
}
```

다중집합에 대해서 누락해서 헤맸던 문제입니다

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)
아스키코드 [a,A] = 65, 97이고 알파벳 25개니까 외워두면 쓰실 날이 올거라 믿습니다.

## 3

### 문제 - <code>n진수게임</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)
1. 전체 게임 진행 횟수:
각 플레이어가 한 번씩 말할 때마다 한 라운드가 끝납니다.
튜브가 t번 말하려면, 전체 게임은 최소 t번의 라운드를 진행해야 합니다.
한 라운드당 생성되는 문자 수:
한 라운드에서 m명의 플레이어가 각각 한 문자씩 말합니다.
따라서 한 라운드당 m개의 문자가 생성됩니다.
2. 

### 풀이 코드

```jsx
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
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

```jsx
// const를 사용한 버전 (배열 메서드 사용)
function solutionWithConst(n, t, m, p) {
  const gameAnticipation = []; // 
  for (let i = 0; i < 50; i++) {
    const tmp = i.toString(n).split("");
    gameAnticipation.push(...tmp); // push 메서드 사용
  }
  // 나머지 로직...
}

// let을 사용한 버전 (재할당 허용)
function solutionWithLet(n, t, m, p) {
  let gameAnticipation = []; // 
  for (let i = 0; i < 50; i++) {
    const tmp = i.toString(n).split("");
    gameAnticipation = [...gameAnticipation, ...tmp]; // 재할당
  }
  // 나머지 로직...
}
```
const 배열을 생성한 뒤 스프레드 연산자로 할당했었는데 오류가 나서 보니까 
스프레드 연산자는 얕은 복사로 새로운 배열을 만드는 거라서 gameAnticipation 원본 배열에 다시 넣는다고 생각하고 넣었는데 재할당으로 한 거였더군요 
위의 경우에 let으로 선언해서 해야합니다.
재할당 방식이 되서 let이 되야 하는데 const로 하고 오류 났어서 공유합니다..

```jsx
function solution(n, t, m, p) {
  // 진법 n, 미리 구할 숫자의 갯수 t, 게임에 참가하는 인원 m, 튜브의 순서 p 가 주어진다.
  const result = [];
  const gameAnticipation = [];
  let index = 0;
  while (result.length != t) {
    let tmp = [...index.toString(n).split("")];
    gameAnticipation.push(...tmp);
    if ((index + 1) % m === p) {
      result.push(gameAnticipation[index].toUpperCase());
    }
    index++;
  }
  return result.join("");
}
```

이렇게 풀었는데 런타임 에러가 나서 다시 풀었습니다 자바스크립트로 풀다가 처음으로 배열의 길이를 넘어봤네요

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)
이번 문제는 문자열로 조작하는 게 배열로 하는 거 보다 효율적이었던 거 같습니다.
문자열 vs 배열:
JavaScript에서 문자열 조작이 배열 조작보다 더 효율적일 수 있습니다.
특히 큰 데이터를 다룰 때 이 차이가 큽니다.
