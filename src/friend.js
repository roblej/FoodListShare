function fetchFriendList() {
    fetch('/friendlist')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const foodListDiv = document.querySelector('.friendFoodList .inner')
        foodListDiv.innerHTML = ''; // 기존 내용을 비웁니다.
        const storeDiv = document.createElement('div');
        data.forEach(item => {
            const nameDiv = document.createElement('div');
            const listDiv = document.createElement('div');

            // 이름 요소
            nameDiv.textContent = item.username; // 가정: 데이터베이스에서 가져온 항목의 이름 필드
            nameDiv.classList.add('name');
            foodListDiv.appendChild(nameDiv);

            // 리스트 요소
            listDiv.textContent = '리스트';
            listDiv.classList.add('list');
            listDiv.setAttribute('onclick', `toggleFoodList(${item.id})`); // 클릭 시 toggleFoodList 함수 호출, item.id 전달
            console.log(item.id)
            foodListDiv.appendChild(listDiv);

            const br = document.createElement('br'); // 새로운 br 요소 생성
            foodListDiv.appendChild(br); // div 요소 뒤에 br 요소 추가
        });
        // storeDiv.classList.add('foodlist');
        // foodListDiv.appendChild(storeDiv)
    })
    .catch(error => console.error('Error:', error));
}

function toggleFriendFoodList() {
    fetchFriendList()
    var friendFoodList = document.querySelector('.friendFoodList');
    friendFoodList.style.opacity = (friendFoodList.style.opacity === '1') ? '0' : '1';
    friendFoodList.style.display = (friendFoodList.style.display === 'block') ? 'none' : 'block';
}

// 데이터베이스 연동해서 친구의 맛집목록 가져오기
function fetchFoodList(item) {
    // item 값을 쿼리 매개변수로 추가하여 GET 요청 보내기
    fetch(`/foodlist?item=${item}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const foodListDiv = document.querySelector('.foodlist');
        foodListDiv.innerHTML = ''; // 기존 내용을 비웁니다.
  
        data.forEach(item => {
          const div = document.createElement('div');
          div.textContent = item.name; // 가정: 데이터베이스에서 가져온 항목의 이름 필드
          foodListDiv.appendChild(div);
  
          const br = document.createElement('br'); // 새로운 br 요소 생성
          foodListDiv.appendChild(br); // div 요소 뒤에 br 요소 추가

          // 각 div에 클릭 이벤트 추가
          div.addEventListener('click', function() {
              // 클릭된 div의 텍스트를 가져와서 input 요소에 할당
              document.getElementById("keyword").value = this.textContent;
              // 폼을 자동으로 제출
              document.querySelector('#searchForm button[type="submit"]').click();
          });
        });
      })
      .catch(error => console.error('Error:', error));
}
function toggleFoodList(item) {
    fetchFoodList(item)
    var foodList = document.querySelector('.foodlist');
    foodList.style.opacity = (foodList.style.opacity === '1') ? '0' : '1';
    foodList.style.display = (foodList.style.display === 'block') ? 'none' : 'block';
}


function toggleAddFriend() {
  var addFriend = document.querySelector('#addFriendModal');
  addFriend.style.opacity = (addFriend.style.opacity === '1') ? '0' : '1';
  addFriend.style.display = (addFriend.style.display === 'block') ? 'none' : 'block';
}
// 친구 추가 버튼 클릭 시 모달 표시
document.querySelector('.add_friend_btn').addEventListener('click', function() {
  document.getElementById('addFriendModal').style.display = 'block';
});

// 친구 추가 폼 제출 시 처리
document.getElementById('addFriendForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 폼의 기본 동작 방지

  // 입력된 친구 ID 가져오기
  const friendId = document.getElementById('friendId').value;

  // 친구 추가를 위한 GET 요청 보내기
  fetch(`/addfriend?id=${friendId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('네트워크 상태가 좋지 않습니다.');
      }
      return response.json();
    })
    .then(data => {
      // 추가된 친구 ID 출력
      console.log('추가된 친구 ID:', data.id);
      // 모달 닫기
      document.getElementById('addFriendModal').style.display = 'none';
    })
    .catch(error => {
      console.error('에러:', error);
      // 에러 메시지 출력
      alert('친구 추가에 실패했습니다.');
    });
});

  