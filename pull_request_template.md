## 1

### 문제 - <code>숫자짝궁</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

1. X, Y를 스플릿 한 후 오름 차순으로 정렬합니다(중간 계산할 때 편해서 이렇게 처리했습니다)
2. 빈도수를 계산하기 위한 함수를 구현했습니다
3. X,Y 안의 숫자들이 반복된 값을 객체로 저장합니다
   3.1 ex- X [1,1,1,2,2] => { '1':3, '2':2}
4. X를 기준으로 키값만 저장된 배열을 추출합니다 => keys
5. keys를 기준으로 X,Y 빈도수가 저장된 객체를 비교합니다
5.1. const A = frequencyCalc(X)[keyToCompare];
     const B = frequencyCalc(Y)[keyToCompare];
     A,B 두 객체에 같은 키값의 밸류가 겹치면 빈도수를 비교해 더 적은 빈도수를 result 배열에 푸시합니다
6. result 배열을 내림차순으로 정렬하고 조인합니다
7. 0만 있는지, 안겹치는지에 따라 분류하고 리턴합니다.

### 풀이 코드

```
jsx
function solution(X, Y) {
    X = X.split("").sort((a,b)=>a-b);
    Y = Y.split("").sort((a,b)=>a-b);
   let result = [];

    //빈도수 계산하는 함수
   const frequencyCalc = (arr) => {
       const frequency = {};
       for(let i = 0; i < arr.length; i++){
           const char = arr[i];
          if (frequency[char]) {
                frequency[char]++;
            } else {
                frequency[char] = 1;
            }
       }
       return frequency;
   }
    frequencyCalc(X);
    frequencyCalc(Y);

    //키값만 가지고 있는 배열
    const keys = Object.keys(frequencyCalc(X));
    for(let i = 0 ; i < keys.length; i++){
        const keyToCompare = keys[i];
        const A = frequencyCalc(X)[keyToCompare];
        const B = frequencyCalc(Y)[keyToCompare];
        if(A && B){
             let min = Math.min(A , B);
                while(min--){
                    result.push(keyToCompare);
                }
        }
    }
    result = result.sort((a,b)=>b-a).join("");
    if(result[0] === '0') return result[0];
    return result.length === 0 ?  "-1" :  result;

}



```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

최대 배열의 길이가 300만이었기 떄문에 이중 반복문을 사용할 경우 반드시 시간초과가 날 것이라고 생각해서 다른 방안을 찾던 중 빈도수로 비교하면 될 것 같아 이 방식으로 접근했습니다.

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 2

### 문제 - <code>햄버거만들기</code>

### 알고리즘 설계

1. ingredient를 순회하며 1231순서를 충족했는지 검사합니다
2. 충족하면 result++ 하고 index를 -3합니다.


### 풀이 코드

```
jsx
function solution(ingredient) {
  let result = 0;
  let i = 0;
  while (i < ingredient.length) {
    if (
      ingredient[i - 3] === 1 &&
      ingredient[i - 2] === 2 &&
      ingredient[i - 1] === 3 &&
      ingredient[i] === 1
    ) {
      result++;
      ingredient.splice(i - 3, 4);
      i = i - 3;
    }
    i++;
  }
  return result;
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)


### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 3

### 문제 - <code>의상</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

1. 의상 종류 추출:

입력으로 받은 clothes 배열에서 의상의 종류만을 추출합니다.
각 의상 항목의 두 번째 요소(인덱스 1)가 의상의 종류를 나타냅니다.

2. 의상 종류별 빈도 계산:

추출한 의상 종류 배열을 순회하면서 각 종류가 몇 번 등장하는지 계산합니다.
이 정보를 객체 형태로 저장합니다. 키는 의상 종류, 값은 해당 종류의 의상 개수입니다.

3. 의상 종류별 개수 배열 생성:

빈도를 계산한 객체에서 값(의상 개수)만 추출하여 새로운 배열을 만듭니다.
이 배열은 각 의상 종류별 의상의 개수를 나타냅니다.

4. 조합 수 계산:

의상 종류별 개수 배열을 이용하여 가능한 모든 조합의 수를 계산합니다.
각 의상 종류별로 (해당 종류의 의상 개수 + 1)을 모두 곱합니다.
'+1'을 하는 이유는 해당 종류의 의상을 입지 않는 경우도 하나의 선택으로 포함하기 위함입니다.

5. 계산된 전체 조합의 수에서 1을 뺍니다.
1을 빼는 이유는 모든 종류의 의상을 입지 않는 경우(알몸)를 제외하기 위함입니다.

### 풀이 코드

```
jsx
function solution(clothes) {
  let arr = [];
  for (let i = 0; i < clothes.length; i++) {
    arr.push(clothes[i][1]);
  }
  
  const frequency = arr.reduce((accu, curr) => {
    accu[curr] = (accu[curr] || 0) + 1;
    return accu;
  }, {});
 
  const repeatedCounts = Object.values(frequency).filter((count) => count > 0);
  const ans = repeatedCounts.reduce((a, e) => {
    return a * (e + 1);
  }, 1);
  return ans - 1;
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

