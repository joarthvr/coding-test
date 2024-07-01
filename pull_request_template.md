## 1

### 문제 - <code>가장 많이 받은 선물</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

1번 문제는 아직 제 실력으로 온전히 풀 수 있는 문제는 아닌 것 같아 검색을 통해 문제를 해결했습니다.
완벽하게 풀지는 못했습니다 .. 

### 풀이 코드

```
function solution(friends, gifts) {
    // 친구 정보를 저장할 객체 초기화
    let person = {};
    friends.forEach(name => {
        person[name] = {
            send: {},
            receive: {},
            nextReceive: 0,
            point: 0
        };
        friends.forEach(name2 => {
            person[name].send[name2] = 0;
            person[name].receive[name2] = 0;
        });
    });
    // 선물 데이터를 기반으로 선물 주고받은 횟수 및 포인트 계산
    gifts.forEach(data => {
        let d = data.split(' ');
        let sender = d[0];
        let receiver = d[1];
        person[sender].send[receiver]++;
        person[sender].point++;
        person[receiver].receive[sender]++;
        person[receiver].point--;
    });
    for(let i=0; i<friends.length-1; i++){
    for(let k=i+1; k<friends.length; k++){
            if(
                person[friends[i]].send[friends[k]] > person[friends[k]].send[friends[i]]
            ) {
                person[friends[i]].nextReceive++;
            } else if (
                person[friends[i]].send[friends[k]] < person[friends[k]].send[friends[i]]
            ) {
                person[friends[k]].nextReceive++;
            } else if (
                person[friends[i]].send[friends[k]] === person[friends[k]].send[friends[i]]
            ) {
                if(person[friends[i]].point > person[friends[k]].point){
                    person[friends[i]].nextReceive++;
                } else if (person[friends[i]].point < person[friends[k]].point){
                    person[friends[k]].nextReceive++;
                }
            }
    }
}
    let result = Object.entries(person).sort((a, b) => a[1].nextReceive - b[1].nextReceive);
    let answer = result[result.length-1][1].nextReceive;

    
    
    return answer;
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

문제를 접했을 때 인자값을 객체로 받아야할 거 같은데, 어떤 식으로 받아서 저장할지 막막했습니다.




### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

개인적으로 어려웠던 문제였습니다. 반복해서 풀어봐야할 문제라고 생각합니다. 고려해야할 요소들이 좀 까다롭다고 느껴졌습니다.


## 2

### 문제 - <code>체육복</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

1. lost와 reserve를 오름차순으로 정렬
2. 여분의 체육복을 가져왔지만 체육복이 도난당한 경우를 체크합니다
결국 체육복이 있다는 것을 의미하므로 lost배열과 reserve 배열에서 각각 splice를 통해 제거합니다.
3. lost 배열에서 체육복이 없는 경우 reserve 배열에서 lost배열 값의 -1, +1인 값이 reserve 배열에 존재한다면 체육복을 빌릴 수 있다는 것을 의미하므로
체육복을 입을 수 있습니다
4. 3번의 경우에 해당하지 않으면 체육복을 입을 수 없는 사람이 발생한 것을 의미하므로 n에서 한 명을 제외합니다.

구현 순서는 3-4-2-1 순이었습니다. 3번을 했더니 50점 대가 나와서 2번의 경우를 체크하지 않았다는 것을 문제를 다시 읽고 파악했고 그 후 90점 대가 나와서 1번의 경우를 고려하지 않았다는 것을 알았습니다

### 풀이 코드

```
function solution(n, lost, reserve) {
    // 여분의 체육복을 가진 학생과 도난당한 학생을 정렬합니다.
    lost.sort((a, b) => a - b);
    reserve.sort((a, b) => a - b);

    // 여분의 체육복을 가진 학생이 도난당한 경우를 먼저 처리
    for (let i = 0; i < reserve.length; i++) {
        if (lost.includes(reserve[i])) {
            lost.splice(lost.indexOf(reserve[i]), 1);
            reserve.splice(i, 1);
            i--;
        }
    }
    // 도난당한 학생이 여분의 체육복을 빌릴 수 있는지 확인
    for (let i = 0; i < lost.length; i++) {
        if(reserve.includes(lost[i] - 1)) {
            reserve.splice(reserve.indexOf(lost[i] - 1), 1);
            continue;
        } 
        if(reserve.includes(lost[i] + 1)) {
            reserve.splice(reserve.indexOf(lost[i] + 1), 1);
            continue;
        } 
            n--;
    }
    return n;
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

저에게는 조금 쉽게 느껴지는 문제였습니다. 하지만 코드를 제출했을 때 90점만 나와서 의아했습니다. 
그 이유는 lost배열과 reserve배열이 정렬되지 않은 상태로 주어지는 테스트케이스가 있었기 때문입니다.
이 경우를 해결하기 위해서 먼저 lost 배열과 reserve 배열을 오름차순으로 정렬했더니 문제가 해결됐습니다.


### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

문제에서 배열이 정렬된 상태라고 명시하지 않은 상태거나 반복문으로 순차적으로 문제에 접근하는 경우 
먼저 정렬해주고 문제를 푸는 것을 염두에 두어야겠다고 생각했습니다.

## 3

### 문제 - <code>예산</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

1. 오름차순으로 d를 정렬합니다
2. d의 크기 만큼 for문을 동작하면서 금액이 작은 순서대로 budget에 맞게 예산을 신청합니다.

오름차순으로 정렬한 이유 예산에 맞춰 최대로 많은 부서의 물품을 구매해야하기 때문입니다.
작은 예산을 책정한 부서의 물품부터 구매해야 최대한 많은 부서의 물품을 구매할 수 있습니다.

### 풀이 코드

```
function solution(d, budget) {
    d = d.sort((a,b) => a-b);
    let sum = 0;
    let cnt = 0;
    for(let i = 0; i < d.length; i++){
        if(sum + d[i] <= budget){
            sum += d[i];
            cnt++;
        }
        
    }
    return cnt; 
   
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)



### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

