## 1

### 문제 - <code>동영상 재생기</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)
1. 각 주어진 인자들을 초 단위로 바꿉니다
2. 조건에 맞게 계산합니다.

### 풀이 코드

```jsx
function solution(video_len, pos, op_start, op_end, commands) {
  const toSeconds = time => time.split(':').reduce((m, s) => m * 60 + +s, 0);
  const toTimeString = seconds => [Math.floor(seconds / 60), seconds % 60]
    .map(n => n.toString().padStart(2, '0')).join(':');

  const vidLenSec = toSeconds(video_len);
  const opStartSec = toSeconds(op_start);
  const opEndSec = toSeconds(op_end);
  let curPosSec = toSeconds(pos);

  const movePosition = (pos, delta) => Math.max(0, Math.min(vidLenSec, pos + delta));
  const skipOpening = pos => (opStartSec <= pos && pos <= opEndSec) ? opEndSec : pos;

  for (const cmd of commands) {
    curPosSec = skipOpening(curPosSec);
    curPosSec = cmd === "prev" ? movePosition(curPosSec, -10) : 
                 cmd === "next" ? movePosition(curPosSec, 10) : 
                 curPosSec;
    curPosSec = skipOpening(curPosSec);
  }

  return toTimeString(curPosSec);
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

초단위로 바꾸면 되는 건데 이거를 구현을 하려다 보니 낯설고 어려웠습니다. 
코딩테스트를 좀 소홀히 하다보니 코손실이 많이 온 거 같습니다..

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 2

### 문제 - <code>게임맵최단거리</code>

### 알고리즘 설계

### 풀이 코드

```
jsx
// 풀다가 실패했습니다... ㅠㅠㅠ

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)
다른 분들 코드 보면서 분석해봐야 할 거 같습니다 저한테는 뭔가 어려운 문제였습니다.

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 3

### 문제 - <code>더맵게</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

dfs(dx, dy): 깊이 우선 탐색을 수행하는 재귀 함수입니다.
경계 조건 체크: 지도 범위를 벗어나거나 'X'인 경우 0을 반환합니다.
현재 위치의 값을 가져오고, 해당 위치를 'X'로 표시하여 방문했음을 나타냅니다.
상하좌우 네 방향으로 재귀적으로 DFS를 수행하고 그 결과를 합산합니다.
2중 for 루프로 지도의 모든 위치를 순회합니다.
'X'가 아닌 위치에서 DFS를 시작하고, 그 결과를 result 배열에 추가합니다.

### 풀이 코드

```jsx
function solution(maps) {
    const result = []
    maps = maps.map((m) => m.split(""))
    const rows = maps.length;
    const cols = maps[0].length;
    const dfs = (dx, dy) => {
        if (dx < 0 || dy < 0 || dx >= maps.length || dy >= maps[0].length || maps[dx][dy] === "X") return 0
        const now = parseInt(maps[dx][dy])
        maps[dx][dy] = "X"
        return now + dfs(dx - 1, dy) + dfs(dx + 1, dy) + dfs(dx, dy - 1) + dfs(dx, dy + 1)
    }
    
    for (let x = 0; x < rows; x += 1) {
        for (let y = 0; y < cols; y += 1) {
            if (maps[x][y] !== "X") result.push(dfs(x, y))
        }
    }
    return result.length ? result.sort((a, b) => a - b) : [-1]
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)
재귀로 도움 받아서 해봤는데 익숙만해지면 구현이 훨씬 편해지는 거 같습니다.

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)
