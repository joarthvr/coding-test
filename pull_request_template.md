## 1

### 문제 - <code>올바른괄호</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)
1. 스택을 구현한다
2. 조건에따라 팝한다

### 풀이 코드

```jsx
function solution(s) {
    class Stack {
        constructor() {
            this.storage = {};
            this.size = 0;
        }
        push(element) {
            this.size++;
            this.storage[this.size] = element;
        }
        pop() {
            let removed = this.storage[this.size];
            delete this.storage[this.size];
            this.size--;
            return removed;
        }
        top() {
            return this.storage[this.size];
        }
    }

    s = s.split('');
    const stack = new Stack();
    for (let i = 0; i < s.length; i++) {
        if (stack.top() === "(" && s[i] === ")") {
            stack.pop(); // 올바른 괄호 쌍을 찾으면 스택에서 pop
        } else {
            stack.push(s[i]); // 그 외의 경우에는 스택에 push
        }
    }
    return stack.size > 0 ? false : true
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 2

### 문제 - <code>파일명정렬</code>

### 알고리즘 설계
1. HEAD NUMBER을 분리한다
2. 조건에 따라 정렬한다
### 풀이 코드

```jsx
function solution(files) {
    const parsedFiles = files.map((file, index) => {
        let head = '';
        let number = '';
        let i = 0;

        // HEAD 추출
        while (i < file.length && isNaN(parseInt(file[i]))) {
            head += file[i];
            i++;
        }
    
        // NUMBER 추출
        while (i < file.length && !isNaN(parseInt(file[i])) && number.length < 5) {
            number += file[i];
            i++;
        }

        return { 
            originalIndex: index, 
            head: head.toLowerCase(), 
            number: parseInt(number)
        };
    });
    parsedFiles.sort((a, b) => {
        const headCompare = a.head.localeCompare(b.head);
        if (headCompare !== 0) return headCompare;
        
        if (a.number < b.number) return -1;
        if (a.number > b.number) return 1;
        
        return a.originalIndex - b.originalIndex;
    });

    return parsedFiles.map(file => files[file.originalIndex]);
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

정렬이 생각보다 어려운 문제였습니다 ㅜㅜ

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 3

### 문제 - <code>캐시</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)


### 풀이 코드

```jsx
function solution(cacheSize, cities) {
    let cache = new Array(cacheSize).fill("");
    let time = 0;
    let k = 0
    cities = cities.map((e)=>{return e.toLowerCase();})
    if(cacheSize === 0 )
        return cities.length * 5;
    
    for(let i = 0; i < cities.length; i++){
        if(cache.indexOf(cities[i]) > -1){
            cache.splice(cache.indexOf(cities[i]),1);
            cache.unshift(cities[i]);
            time++;
            continue;
        }
        if(cache.indexOf(cities[i]) === -1){
            k = k % cacheSize;
            cache.pop();
            cache.unshift(cities[i]);
            k++;
            time += 5;
            continue;
        }
        
    }
    return time;
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)
