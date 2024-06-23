## 1

### 문제 - <code>118666 성격 유형 검사하기</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

성격 유형 별로 점수가 같이 딸려 오기 때문에 객체를 이용해 이를 구조화했다.
그 후 점수를 담은 배열을 생성한 후,
반복문을 통해 survey에 저장된 순서에 맞게 점수를 객체에 할당한다.
그 후 큰 점수를 가진 성격 유형을 결과에 더해 출력한다.

### 풀이 코드

```
function solution(survey, choices) {
    let result = '';
    
    // 성격 유형 점수를 저장할 객체
    let scores = {
        'R': 0, 'T': 0,
        'C': 0, 'F': 0,
        'J': 0, 'M': 0,
        'A': 0, 'N': 0
    };
    
    // 각 선택지에 대한 점수
    let scoreMap = [3, 2, 1, 0, 1, 2, 3];
    
    // 설문 조사 결과를 바탕으로 점수 계산
    for (let i = 0; i < survey.length; i++) {
        let type = survey[i];
        let choice = choices[i];
        
        if (choice < 4) {
            scores[type[0]] += scoreMap[choice - 1];
        } else if (choice > 4) {
            scores[type[1]] += scoreMap[choice - 1];
        }
    }
    
    // 최종 성격 유형 계산
    result += scores['R'] >= scores['T'] ? 'R' : 'T';
    result += scores['C'] >= scores['F'] ? 'C' : 'F';
    result += scores['J'] >= scores['M'] ? 'J' : 'M';
    result += scores['A'] >= scores['N'] ? 'A' : 'N';
    
    return result;
}


```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

survey의 순서가 섞여 있고 원소 안의 관계도 규칙적이지 않았기 때문에 반복문 안에서 한번에 처리하도록 만드는 방법이 까다로웠다.
그렇다고 if문을 많이 사용하여 케이스 별로 나누고 싶지 않았기 때문에 효율적인 방법이 무엇일지 고민했다.

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

구현적인 문제라고 생각하기 때문에 실제 시험에서 이런 문제를 만날 경우를 대비해 빠르게 해결할 수 있도록 풀이구조를 암기하는 것이 좋을 것 같다고 생각한다.


## 2

### 문제 - <code>176963 추억 점수.js</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)
이름에 따라 점수가 할당 되어 있기에 이를 나타내는 객체를 생성한다
반복문을 통해 photo에 해당 이름이 있을 경우 이름에 부여된 점수를 결과에 더한다
그 후 총 점수를 출력한다


### 풀이 코드

```
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
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)




### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

구현적인 문제라고 생각하기 때문에 실제 시험에서 이런 문제를 만날 경우를 대비해 빠르게 해결할 수 있도록 풀이구조를 암기하는 것이 좋을 것 같다고 생각한다.