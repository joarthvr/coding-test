## 1

### 문제 - <code>모의고사</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

### 풀이 코드

```
javascript
function solution(answers) {
    let a = [1, 2, 3, 4, 5];
    let b = [2, 1, 2, 3, 2, 4, 2, 5];
    let c = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    // 맞춘 개수를 저장할 객체
    let cnt = { 1: 0, 2: 0, 3: 0 };

    // 각 답안 패턴과 정답을 비교하여 맞춘 개수 세기
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === a[i % a.length]) cnt[1]++;
        if (answers[i] === b[i % b.length]) cnt[2]++;
        if (answers[i] === c[i % c.length]) cnt[3]++;
    }

    // 최대 맞춘 개수 찾기
    let maxScore = Math.max(cnt[1], cnt[2], cnt[3]);

    // 최대 맞춘 개수를 가진 사람 찾기
    let result = [];
    for (let key in cnt) {
        if (cnt[key] === maxScore) {
            result.push(Number(key));
        }
    }

    return result;
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 2

### 문제 - <code>공원 산책</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)
1. 객체로 첫 시작점을 세팅합니다. (나중에 호출하기 편하게)
2. 서쪽 동쪽의 경우 열에서 열(<-, ->)로 이동하고 북쪽 남쪽의 경우 배열의 원소 간 행에서 행(ㅅ,v)으로 이동하므로 두 부류를 함수로 구현했습니다. 
2-1. 동쪽의 경우 오른쪽으로 이동하므로 시작점 col에서 더해서 크기를 벗어나는지 확인하고 가는 길 중간에 X가 있는지 slice로 경로를 잘라와 확인합니다.
2-2. 서쪽의 경우 왼쪽으로 이동하므로 시작점 col에서 빼서 크기를 벗어나는지 확인하고 가는 길 중간에 X가 있는지 slice로 경로를 잘라와 확인합니다.
2-3. 북쪽의 경우 위쪽으로 이동하므로 시작점 row에서 빼서 크기를 벗어나는지 확인하고 가는 길 중간에 X가 있는지 slice로 경로를 잘라와 확인합니다.
2-4. 남쪽의 경우 아래쪽으로 이동하므로 시작점 row에서 더해서 크기를 벗어나는지 확인하고 가는 길 중간에 X가 있는지 slice로 경로를 잘라와 확인합니다.
3. 반복문을 통해 조건에 따라 함수들을 호출합니다.
### 풀이 코드

```
javascript
function solution(park, routes) {
    let START;

    // 시작 위치 찾기
    park.forEach((e, i) => {
        const location = e.split("").findIndex(char => char === "S");
        if (location !== -1) {
            START = { row: i, col: location }; // 행과 열의 위치를 저장
        }
    });

    const eastOrWest = (way) => {
        let howManyToGo = parseInt(way[2]);
        if (way[0] === "E") {
            if (START.col + howManyToGo >= park[0].length ||
                park[START.row].slice(START.col, START.col + howManyToGo + 1).includes("X")) {
                return;
            }
            START.col += howManyToGo;
        }
        if (way[0] === "W") {
            if (START.col - howManyToGo < 0 ||
                park[START.row].slice(START.col - howManyToGo, START.col).includes("X")) {
                return;
            }
            START.col -= howManyToGo;
        }
    };

    const northOrSouth = (way) => {
        let howManyToGo = parseInt(way[2]);
        if (way[0] === "N") {
            if (START.row - howManyToGo < 0 ||
                park.slice(START.row - howManyToGo, START.row).some(row => row[START.col] === "X")) {
                return;
            }
            START.row -= howManyToGo;
        }
        if (way[0] === "S") {
            if (START.row + howManyToGo >= park.length ||
                park.slice(START.row, START.row + howManyToGo + 1).some(row => row[START.col] === "X")) {
                return;
            }
            START.row += howManyToGo;
        }
    };

    // 주어진 경로를 순회하며 이동
    routes.forEach((e) => {
        if (e[0] === "E" || e[0] === "W") {
            eastOrWest(e);
        }
        if (e[0] === "N" || e[0] === "S") {
            northOrSouth(e);
        }
    });

    return [START.row, START.col]; // 최종 위치를 반환
}



```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 3

### 문제 - <code>붕대 감기</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

1. 어택 배열을 보기좋게 객체로 받아왔습니다
2. 문제의 조건에 맞게 for문을 호출하여 healthRecoveryCount의 값을 1씩 올립니다
3. counter의 값에 따라 어택이 발생한 경우 데미지를 주고 카운터를 초기화 시킵니다
4. 보너스 회복의 경우 추가 체력을 회복하고 맥스값이 넘지 않게 설정합니다.
5. 0이하로 내려갈 경우 -1을 반환합니다.

### 풀이 코드

```
javascript
function solution(bandage, health, attacks) {
  const TOTAL_TIME = attacks[attacks.length - 1][0];
  const attackTimes = attacks.reduce((acc, [time, damage]) => {
    acc[time] = damage;
    return acc;
  }, {});

  const [maintainTime, recoveryAmount, bonusRecovery] = bandage;
  let healthRecoveryCounter = 0;
  const MAX_HEALTH = health;

  // 함수: 공격을 처리하고, 체력을 감소시키는 함수
  const applyAttack = (currentHealth, damage) => {
    currentHealth -= damage;
    return currentHealth;
  };

  // 함수: 체력을 회복시키는 함수
  const recoverHealth = (currentHealth, amount) => {
    currentHealth += amount;
    return Math.min(currentHealth, MAX_HEALTH); // 최대 체력을 넘지 않도록 함
  };

  for (let time = 0; time <= TOTAL_TIME; time++) {
    healthRecoveryCounter++;

    // 공격이 있는 경우
    if (attackTimes[time]) {
      healthRecoveryCounter = 0;
      health = applyAttack(health, attackTimes[time]);
      if (health <= 0) return -1;
      continue;
    }

    // 체력 유지 시간이 경과한 경우
    if (healthRecoveryCounter === maintainTime) {
      healthRecoveryCounter = 0;
      health = recoverHealth(health, recoveryAmount + bonusRecovery);
      if (health <= 0) return -1;
      continue;
    }

    // 0 이하일 경우
    health = recoverHealth(health, recoveryAmount);
    if (health <= 0) return -1;
  }

  return health;
}


```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

for문으로 길게 작성해서 풀었지만, 반복되는 코드가 있었고 가독성이 좋지 않다고 여겨 함수로 분할해서 정리했습니다.


### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)
풀고나서 date 메서드 쓰신 거보고 그렇게도 풀어봐야겠다 생각했습니다.
