## 1

### 문제 - <code>타겟넘버</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

1. dfs 함수는 재귀적으로 모든 가능한 조합을 탐색

index: 현재 처리 중인 숫자의 인덱스
sum: 현재까지의 합계

2. 기저 조건: index가 numbers.length와 같아지면 모든 숫자를 처리한 것

이때 sum이 target과 같으면 유효한 조합을 찾은 것이므로 count를 증가

3. 재귀 단계:

현재 숫자를 더하는 경우와 빼는 경우 두 가지에 대해 재귀 호출

마지막으로 count를 반환하여 목표 값에 도달하는 방법의 수 리턴

### 풀이 코드

```
jsx
function solution(numbers, target) {
    let count = 0;

    function dfs(index, sum) {
        if (index === numbers.length) {
            if (sum === target) {
                count++;
            }
            return;
        }

        dfs(index + 1, sum + numbers[index]);
        dfs(index + 1, sum - numbers[index]);
    }

    dfs(0, 0);
    return count;
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 2

### 문제 - <code>게임맵최단거리</code>

### 알고리즘 설계

### 풀이 코드

```
jsx
function solution(maps) {
    const n = maps.length;
    const m = maps[0].length;
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    function bfs() {
        const queue = [[0, 0, 1]];  // [x, y, distance]
        maps[0][0] = 0;  // 방문 표시

        while (queue.length > 0) {
            const [x, y, dist] = queue.shift();

            if (x === n - 1 && y === m - 1) {
                return dist;  // 도착점에 도달
            }

            for (let i = 0; i < 4; i++) {
                const nx = x + dx[i];
                const ny = y + dy[i];

                if (nx >= 0 && nx < n && ny >= 0 && ny < m && maps[nx][ny] === 1) {
                    queue.push([nx, ny, dist + 1]);
                    maps[nx][ny] = 0;  // 방문 표시
                }
            }
        }

        return -1;  // 도착점에 도달할 수 없는 경우
    }

    return bfs();
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 3

### 문제 - <code>더맵게</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

### 풀이 코드

```
jsx
class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    pop() {
        if (this.isEmpty()) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }

            if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

function solution(scoville, K) {
    const minHeap = new MinHeap();
    for (const scov of scoville) {
        minHeap.push(scov);
    }

    let mixCount = 0;
    while (minHeap.heap[0] < K && minHeap.heap.length > 1) {
        const first = minHeap.pop();
        const second = minHeap.pop();
        const newScov = first + (second * 2);
        minHeap.push(newScov);
        mixCount++;
    }

    return minHeap.heap[0] >= K ? mixCount : -1;
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 4

### 문제 - <code>카펫</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

### 풀이 코드

```
jsx
function solution(brown, yellow) {
    let sum = brown + yellow;
    let y = 0;
    let ans = [];
    for(let i = 3; i < sum; i++){
        y = sum / i;
        if((i-2) * (y-2) === yellow){
            ans.push(y);
            ans.push(i);
            return ans;
        }
    }
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 5

### 문제 - <code>다리를지나는트럭</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

### 풀이 코드

```
jsx
function solution(bridge_length, weight, truck_weights) {
    let time = 0;
    let bridge = Array(bridge_length).fill(0);
    let bridge_sum = 0;

    while (truck_weights.length > 0 || bridge_sum > 0) {
        // 시간 증가
        time++;

        // 다리에서 나가는 트럭 처리
        bridge_sum -= bridge.shift();

        // 새 트럭이 다리에 올라갈 수 있는지 확인
        if (truck_weights.length > 0 && bridge_sum + truck_weights[0] <= weight) {
            let truck = truck_weights.shift();
            bridge.push(truck);
            bridge_sum += truck;
        } else {
            bridge.push(0);
        }
    }

    return time;
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)
