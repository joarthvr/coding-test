function solution(nums) {
    const uniqueCount = new Set(nums).size;  // 1. 중복된 원소를 제거하여 고유한 폰켓몬의 수를 계산합니다.
    const maxAllowed = nums.length / 2;      // 2. 전체 폰켓몬의 절반만큼 가져갈 수 있으므로 배열 길이의 절반을 계산합니다.
    
    return Math.min(uniqueCount, maxAllowed); // 3. 고유한 폰켓몬의 수와 최대 가져갈 수 있는 폰켓몬의 수 중 작은 값을 반환합니다.
}