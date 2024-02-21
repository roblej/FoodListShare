function toggleFriendFoodList() {
    var friendFoodList = document.querySelector('.friendFoodList');
    friendFoodList.style.opacity = (friendFoodList.style.opacity === '1') ? '0' : '1';
    friendFoodList.style.display = (friendFoodList.style.display === 'block') ? 'none' : 'block';
}
function toggleFoodList() {
    var foodList = document.querySelector('.foodlist');
    foodList.style.opacity = (foodList.style.opacity === '1') ? '0' : '1';
    // foodList.style.display = (foodList.style.display === 'block') ? 'none' : 'block';
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

document.querySelector('.toggle').addEventListener('click', function() {
    var icon = this.querySelector('.material-symbols-outlined');
    icon.classList.toggle('rotate-icon'); // 클래스 토글로 아이콘 회전 토글
});

// 데이터베이스 연동해서 친구의 목록 가져오기
function fetchFoodList() {
    fetch('/foodlist')
      .then(response => response.json())
      .then(data => {
        const foodListDiv = document.querySelector('.foodlist');
        foodListDiv.innerHTML = ''; // 기존 내용을 비웁니다.
  
        data.forEach(item => {
          const div = document.createElement('div');
          div.textContent = item.name; // 가정: 데이터베이스에서 가져온 항목의 이름 필드
          foodListDiv.appendChild(div);
  
          const br = document.createElement('br'); // 새로운 br 요소 생성
          foodListDiv.appendChild(br); // div 요소 뒤에 br 요소 추가
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
  // 페이지 로드 시 foodlist 데이터를 가져오도록 설정
//   document.addEventListener('DOMContentLoaded', fetchFoodList);
  
//   document.body.appendChild('whoRec');
//   targetElement.style.position = 'fixed';
//   targetElement.style.zIndex = '9999';
  