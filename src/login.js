function loginWithKakao() {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000',
      // redirectUri: 'https://main--foodlistshare.netlify.app',
      state: 'userme',
    });
  }
  
    // 아래는 데모를 위한 UI 코드입니다.
    function displayToken() {
      var token = getCookie('authorize-access-token');
  
      if(token) {
        Kakao.Auth.setAccessToken(token);
        Kakao.Auth.getStatusInfo()
          .then(function(res) {
            if (res.status === 'connected') {
              document.getElementById('token-result').innerText
                = 'login success, token: ' + Kakao.Auth.getAccessToken();
                console.log("success")
            }else{
              console.log("failed")
            }
            
          })
          .catch(function(err) {
            Kakao.Auth.setAccessToken(null);
          });
      }
      else{
        // console.log("asd")
      }
    }
  
    function getCookie(name) {
      var cookies = document.cookie.split('; ');
      for (var i = 0; i < cookies.length; i++) {
        var part = cookies[i].split('=');
        if (part[0] === name) {
          return part[1];
        }
      }
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
  
  
    // Kakao.Auth.logout()
    // .then(function(response) {
    //   console.log(Kakao.Auth.getAccessToken()); // null
    // })
    // .catch(function(error) {
    //   console.log('Not logged in.');
    // });
    
    document.addEventListener('DOMContentLoaded', function() {
      // 로그아웃 버튼에 대한 참조를 가져옵니다.
      var logoutBtn = document.getElementById('logout_btn');
    
      // 로그아웃 버튼이 존재하는지 확인합니다.
      if (logoutBtn) {
        // 로그아웃 버튼에 클릭 이벤트 리스너를 추가합니다.
        logoutBtn.addEventListener('click', function() {
          console.log("logout message")
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