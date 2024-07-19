## 1

### 문제 - <code>같은숫자는싫어</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

### 풀이 코드

```
javascript
function solution(arr)
{
    let ans = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === arr[i+1])
            continue;
            ans.push(arr[i]);
    }
   return ans;
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 2

### 문제 - <code>K번째수</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)

### 풀이 코드

```
javascript
function solution(array, commands) {
    let ans = [];
    let tmpArr = [];
    for(let i = 0; i < commands.length; i++){
       tmpArr = array.slice(commands[i][0]-1,commands[i][1]).sort((a,b) => a-b);
       ans[i] = tmpArr[commands[i][2]-1]
    }
    return ans;
}
```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

## 3

### 문제 - <code>대충 만든 자판</code>

### 알고리즘 설계

(왜 이렇게 코드를 작성했는지 이유를 적어주세요)
1단계 new*id의 모든 대문자를 대응되는 소문자로 치환합니다.
2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(*), 마침표(.)를 제외한 모든 문자를 제거합니다.
3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다.
4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.

문제에서 너무 친절하게 단계별로 설명해줍니다.

### 풀이 코드

```
javascript
function solution(new_id) {
    //1단계 모든 대문자를 소문자로 변경
    new_id = new_id.toLowerCase()

    new_id = new_id.split("") // 계산하기 쉽게 스플릿

    // 2단계 new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거합니다.
    for(let i =0; i < new_id.length; i++){
        if(isNaN(new_id[i])){
            if(new_id[i] === '-' ||
               new_id[i] === '_' ||
               new_id[i] === '.' ||
               (new_id[i].charCodeAt() >=97 && new_id[i].charCodeAt() <= 122)){
                continue;
            }
            else{
                new_id.splice(i,1);
                i--;
            }
        }
        else{
            continue;
        }
    }
    let id2 = [] //3단계를 위해 옮겨탈 새로운 배열 선언

    //3단계 new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환합니다
    for(let i = 0; i < new_id.length; i++){
        if(id2[id2.length-1] === new_id[i] && new_id[i] === '.')
            continue;
        id2.push(new_id[i])
    }

    //4단계 new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거합니다.
    if(id2[0] === '.' )
        id2.shift();
    if(id2[id2.length-1] === '.')
        id2.pop()

    //5단계 new_id가 빈 문자열이라면, new_id에 "a"를 대입합니다.
    if(id2.length === 0)
        id2.push('a')

    // 6단계 new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거합니다.
    // 만약 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거합니다.
    if(id2.length >= 16){
        id2 = id2.slice(0,15);
        if(id2[id2.length-1] === '.')
            id2.pop();
    }

    // 7단계 new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙입니다.
    if(id2.length <= 2){
        const addItem = id2[id2.length-1];
        while(id2.length < 3)
            id2.push(addItem)
    }
    return id2.join("");
}

```

### 개인적인 회고와 다른 풀이

(풀이 중 힘든 점이 있었다면 왜 힘들었고 어떻게 해결했는지, 아니면 이외의 좋을 것 같은 다른 풀이법이 있다면 같이 작성해주세요)

### 느낀 점

(풀면서 느낀점 이외에도 기억할 점이나 같이 논의하고 싶은 부분 등이 있다면 자유롭게 적어주세요)

하라는 대로 했더니 문제가 풀렸습니다...
뭔가 이전에 풀어봤을법한 문제를 전부 해보라는 느낌을 받았습니다
