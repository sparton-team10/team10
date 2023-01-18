$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://spartacodingclub.shop/sparta_api/weather/seoul",
    data: {},
    success: function (response) {
      let temper = response['temp']
      $('#temp').text(temper);

      let orgurl = this.url;
      let spurl1 = orgurl.split("/");
      let wanturl = spurl1[spurl1.length - 1];
      document.getElementById("region").innerHTML = wanturl
    }
  })
});

function logout() {
  $.removeCookie('mytoken');
  alert('로그아웃!')
  window.location.href = '/login'
}