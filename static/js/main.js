$(document).ready(function () {
  $("#title").on("keyup", function (key) {
    if (key.keyCode == 13) {
      search_member();
    }
  });
});

// 메인페이지에서 유저검색하는부분
function search_member() {
  let val = $("#title").val();
  $.ajax({
    type: "GET",
    url: "/Main?name=" + val,
    data: {},
    success: function (response) {
      //왼쪽 내정보 데이터베이스 가져옴
      $("#my-info").empty();
      let id_list = response["id_list"];

      console.log(id_list);

      temp_html = `
      
        <div class="card card-id" style="width: 18rem">
          <img
            src="${id_list[0]["img"]}"
            class="card-img-top mx-auto"
            alt="No Image"
          />
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
      for (let i = 0; i < repo_list.length; i++) {
        let repo_name = repo_list[i];

        temp_html2 = `<li class="result-repo-item">${repo_name}</li>`;

        $("#repo_ul").append(temp_html2);
      }
    },
  });
}
