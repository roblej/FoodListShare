function toggleFriendFoodList() {
    var friendFoodList = document.querySelector('.friendFoodList');
    friendFoodList.style.opacity = (friendFoodList.style.opacity === '1') ? '0' : '1';
}
function toggleFoodList() {
    var foodList = document.querySelector('.foodlist');
    foodList.style.opacity = (foodList.style.opacity === '1') ? '0' : '1';
}
document.querySelector('.left .toggle').addEventListener('click', function() {
    var leftElement = document.querySelector('.left');
    // .left 요소의 현재 left 값 확인
    var leftValue = leftElement.style.left;

    // left 값이 0px이면 -377px로, 아니면 0px로 설정
    if (leftValue === '0px' || leftValue === '') { // 초기 상태 또는 0px인 경우
        leftElement.style.left = '-377px';
    } else {
        leftElement.style.left = '0px';
    }
});
