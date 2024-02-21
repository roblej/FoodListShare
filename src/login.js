function loginWithKakao() {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000',
    });
  }

  // 아래는 데모를 위한 UI 코드입니다.
  displayToken()
  function displayToken() {
    var token = getCookie('authorize-access-token');

    if(token) {
      Kakao.Auth.setAccessToken(token);
      Kakao.Auth.getStatusInfo()
        .then(function(res) {
          if (res.status === 'connected') {
            document.getElementById('token-result').innerText
              = 'login success, token: ' + Kakao.Auth.getAccessToken();
              document.getElementById('kakao-login-btn').style.display = 'none';
            }else{
              document.getElementById('logout_btn').style.display = 'block';
          }
        })
        .catch(function(err) {
          Kakao.Auth.setAccessToken(null);
        });
    }
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
