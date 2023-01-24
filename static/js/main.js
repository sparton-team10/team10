//global 변수 mytoken? 값 저장해놓기?
//아니면 이벤트시마다  token값불르는 함수 불러와서 전달?
var mytoken = "";

$(document).ready(function () {
  $("#title").on("keyup", function (key) {
    if (key.keyCode == 13) {
      search_member();
    }
  });

  var cookieData = document.cookie;

  function getCookie() {
    return new Promise((resolve, reject) => {
      try {
        console.log("cookie 가져오는중");
        resolve(cookieData.split(" ")[1].split("=")[1]);
      } catch {
        // console.log("실패 reject실행");
        reject("failed");
      }
    });
  }
  getCookie()
    .then(function (data) {
      mytoken = data;
      $("#login").hide();
      $("#logout").show();
      $("#mypage").show();

      console.log(mytoken); // response 값 출력
    })
    .catch(function (err) {
      $("#login").show();
      $("#logout").hide();
      $("#mypage").hide();

      console.error(err); // Error 출력
    });
});

// 메인페이지에서 유저검색하는부분
function search_member() {
  $("#repo_ul").empty();
  let val = $("#title").val();
  $.ajax({
    type: "GET",
    url: "/find?name=" + val,
    data: {},
    success: function (response) {
      //왼쪽 내정보 데이터베이스 가져옴
      $("#my-info").empty();
      let id_list = response["id_list"];
      console.log(id_list);
      temp_html = `
        <div class="card card-id" style="width: 18rem">
          <img src="${id_list[0]["img"]}"
            class="card-img-top mx-auto"
            alt="No Image" />
          <div class="card-body">
            <h5 class="card-title">${id_list[0]["name"]}</h5>
            <!-- 이거 줄수가 늘어나면 카드의 크기가 커져서 제한을 둬야할까? -->
            <p class="card-text">${id_list[0]["comment"]}</p>
            <a href="https://github.com/${id_list[0]["id"]}" class="btn btn-primary">Go github</a>
          </div>
        `;
      $("#my-info").append(temp_html);

      // 데이터 베이스 id 값으로 repo리스트 크롤링해서 출력
      $("#repo_ul").empty();
      let repo_list = response["repo_list"];
      let repo_open = response["repo_open"];
      for (let i = 0; i < repo_list.length; i++) {
        let repo_name = repo_list[i];
        let open_name = repo_open[i];

        // temp_html2 = `<li class="result-repo-item"><a href="https://github.com/${id_list[0]["id"]}/${repo_name}">${repo_name}</a></li>`;
        temp_html2 = `
        <li class="result-repo-item">
        <a href="https://github.com/${id_list[0]["id"]}/${repo_name}">
        ${repo_name}
        </a>
        <span style="float: right;" class="badge bg-secondary">${open_name}</span>
        </li>
        `;

        $("#repo_ul").append(temp_html2);
      }
    },
  });
}
