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

document.querySelector('.toggle').addEventListener('click', function() {
    var icon = this.querySelector('.material-symbols-outlined');
    icon.classList.toggle('rotate-icon'); // 클래스 토글로 아이콘 회전 토글
});