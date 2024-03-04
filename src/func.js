function addStore(mystore){
    fetch(`/addStore?store=${mystore}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('네트워크 상태가 좋지 않습니다.');
    }
    return response.json();
  })
  .then(data => {
    if (data.message) {
      // 서버에서 전달된 메시지가 있는 경우, 콘솔에 로그를 출력하거나 사용자에게 알림
      console.log(data.message);
      alert(data.message); // 이 경우 "이미 추가된 맛집입니다."가 사용자에게 보여집니다.
    } else {
      console.log("success");
    }
  })
  .catch(error => {
    console.error('에러:', error);
    alert('맛집리스트 추가에 실패했습니다.');
  });
}


function toggleMylist() {
    fetchmylist();
    var mylist = document.querySelector('.mylist');
    mylist.style.opacity = (mylist.style.opacity === '1') ? '0' : '1';
    mylist.style.display = (mylist.style.display === 'block') ? 'none' : 'block';
}

function fetchmylist() {
    fetch(`/showmylist`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const myListDiv = document.querySelector('.mylist .inner');
        myListDiv.innerHTML = ''; // 기존 내용을 비웁니다.

        data.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item.name; // 가정: 데이터베이스에서 가져온 항목의 이름 필드
            myListDiv.appendChild(div);

            const br = document.createElement('br'); // 새로운 br 요소 생성
            myListDiv.appendChild(br); // div 요소 뒤에 br 요소 추가
        });
    })
    .catch(error => console.error('Error:', error));
}
