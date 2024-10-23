## 1

### 문제 - <code></code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

1. 토핑의 가짓수 저장
2. 순차적으로 topping을 돌면서 basket에 넣고, basket에 있는 토핑의 가짓수와 토핑의 가짓수가 같아지면 result를 증가시킨다.
3. 토핑의 가짓수를 저장하는 counter를 만들어서 토핑을 돌면서 counter를 감소시킨다.
4. counter가 0이 되면 toppingKindSet에서 삭제한다.
5. toppingKindSet과 basket의 크기가 같아지면 result를 증가시킨다.
6. result를 반환한다.

### 풀이 코드

```jsx
function solution(topping) {
  let result = 0;
  let toppingKindSet = new Set(topping);
  let basket = new Set();
  let counter = new Array(10001).fill(0);

  if (topping.length === 1) {
    return result;
  }

  topping.forEach((e) => {
    counter[e]++;
  });

  topping.forEach((v) => {
    if (counter[v] >= 1) {
      counter[v]--;
    }
    if (counter[v] === 0) {
      toppingKindSet.delete(v);
    }
    basket.add(v);
    if (toppingKindSet.size === basket.size) {
      result++;
    }
  });

  return result;
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

백만이라 시간 복잡도에 유의해야한다는 것을 알았지만 일단 slice로 처음 풀었습니다 그 덕분에 slice의 시간복잡도가 O(n)이라는 사실을 알았습니다.

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 2

### 문제 - <code>N-Queens</code>

### 알고리즘 설계

1. 퀸이 같은 행에 있을 수 없다.
2. 퀸이 같은 열에 있을 수 없다.
3. 퀸이 같은 대각선에 있을 수 없다.
4. isValid 함수를 만들어서 위의 조건을 만족하는지 확인
   - 같은 열에 있는지 확인
   - 대각선에 있는지 확인

### 풀이 코드

```jsx
function solution(n) {
  let results = 0;
  const queens = new Array(n).fill(-1);

  function isValid(row) {
    for (let i = 0; i < row; i++) {
      if (
        Math.abs(row - i) === Math.abs(queens[row] - queens[i]) ||
        queens[i] === queens[row]
      ) {
        return false;
      }
    }
    return true;
  }

  function backtrack(row) {
    if (row === n) results++;

    for (let col = 0; col < n; col++) {
      queens[row] = col;
      if (isValid(row)) {
        backtrack(row + 1);
      }
    }
  }

  backtrack(0);
  return results;
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 3

### 문제 - <code></code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)


### 풀이 코드

```jsx
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
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < this.heap.length &&
        this.heap[leftChild] < this.heap[smallest]
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.heap.length &&
        this.heap[rightChild] < this.heap[smallest]
      ) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
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
    const newScov = first + second * 2;
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
