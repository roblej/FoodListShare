function loginWithKakao() {
    Kakao.Auth.authorize({
      // redirectUri: 'http://localhost:3000',
      redirectUri: 'https://main--foodlistshare.netlify.app',
      state: 'userme',
    });
  }

  // 아래는 데모를 위한 UI 코드입니다.
  function displayToken() {
    var token = getCookie('authorize-access-token');
  
    if (token) {
      Kakao.Auth.setAccessToken(token);
      Kakao.Auth.getStatusInfo()
        .then(function(res) {
          if (res.status === 'connected') {
            // 로그인 성공 시 토큰을 표시하고 로그인 버튼을 숨김
            document.getElementById('token-result').innerText = 'login success, token: ' + Kakao.Auth.getAccessToken();
            document.getElementById('kakao-login-btn').style.display = 'none';
            // 추가된 API 버튼 보이기
            document.querySelector('button.api-btn').style.visibility = 'visible';
          } else {
            // getStatusInfo가 'connected'가 아닌 경우 처리 (예: 로그아웃 상태)
            document.getElementById('logout_btn').style.display = 'block';
          }
        })
        .catch(function(err) {
          // 에러 발생 시 토큰 제거
          Kakao.Auth.setAccessToken(null);
        });
    } else {
      // 토큰이 없는 경우의 로직 추가 (예: 로그인 버튼 표시)
      document.getElementById('kakao-login-btn').style.display = 'block';
    }
  }
  
  // 쿠키에서 특정 이름의 값을 얻기 위한 함수는 그대로 유지
  function getCookie(name) {
    var parts = document.cookie.split(name + '=');
    if (parts.length === 2) { return parts[1].split(';')[0]; }
  }
  
  // 통합된 함수 호출
  displayToken();
  
  function requestUserInfo() {
    Kakao.API.request({
      url: '/v2/user/me',
    })
      .then(function(res) {
        alert(JSON.stringify(res));
      })
      .catch(function(err) {
        alert(
          'failed to request user information: ' + JSON.stringify(err)
        );
      });
  }

  Kakao.Auth.logout()
  .then(function(response) {
    console.log(Kakao.Auth.getAccessToken()); // null
  })
  .catch(function(error) {
    console.log('Not logged in.');
  });
  function getCookie(name) {
    var parts = document.cookie.split(name + '=');
    if (parts.length === 2) { return parts[1].split(';')[0]; }
  }
