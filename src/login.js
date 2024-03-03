function loginWithKakao() {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000',
      state: 'userme',
    });
  }
  
  // URL에서 인가 코드를 추출하고 로그인 여부를 판단하는 함수
  function getAuthorizationCodeAndDisplayUI() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
  
    if (code && state === 'userme') {
      console.log('인가 코드:', code);
      // 인가 코드가 있을 경우 UI 업데이트
      document.getElementById('token-result').innerText = 'login success, code: ' + code;
      document.getElementById('kakao-login-btn').style.display = 'none';
      document.getElementById('token-result').style.display = 'none';
      document.getElementById('logout_btn').style.display = 'inline';
      document.querySelector('button.api-btn').style.visibility = 'visible';
      
      // 서버에 인가 코드를 전송하여 액세스 토큰 요청 (이 부분은 서버 측 코드 필요)
      // requestAccessToken(code);
    } else {
      console.log('인가 코드가 없거나 상태 값이 일치하지 않습니다.');
      document.getElementById('kakao-login-btn').style.display = 'block';
    }
  }
  
  // 페이지 로딩 시 인가 코드 확인 및 UI 업데이트
  getAuthorizationCodeAndDisplayUI();
  
  function requestUserInfo() {
    // 사용자 정보 요청 로직 (액세스 토큰 필요)
  }
  
  Kakao.Auth.logout()
  .then(function(response) {
    console.log(Kakao.Auth.getAccessToken()); // null
  })
  .catch(function(error) {
    console.log('Not logged in.');
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // 로그아웃 버튼에 대한 참조를 가져옵니다.
    var logoutBtn = document.getElementById('logout_btn');
  
    // 로그아웃 버튼이 존재하는지 확인합니다.
    if (logoutBtn) {
      // 로그아웃 버튼에 클릭 이벤트 리스너를 추가합니다.
      logoutBtn.addEventListener('click', function() {
        // 카카오 로그아웃 함수를 호출합니다.
        Kakao.Auth.logout().then(function(response) {
          console.log(Kakao.Auth.getAccessToken()); // null이 출력되어야 합니다.
          alert('로그아웃 되었습니다.'); // 사용자에게 로그아웃되었음을 알립니다.
          // 여기에서 추가적인 로그아웃 처리 로직을 구현할 수 있습니다.
          // 예: 로그인 페이지로 리다이렉트, UI 상태 업데이트 등
        }).catch(function(error) {
          console.log('Not logged in.');
          alert('로그아웃할 수 없습니다. 이미 로그아웃 상태이거나 오류가 발생했습니다.');
        });
      });
    }
  });
  