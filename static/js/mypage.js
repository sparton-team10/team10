var mytoken = "";
$(document).ready(function () {
  // 나중에 이 두개 합쳐야함 프로필칸, 즐겨찾기칸 따로 구성해서 나중에 합칠예정.
  // modify_me();
  open_profile();

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

function open_profile() {}

function modify_me() {
  // 로그인 정보 id를 가져와야 합니다.
  //let val = 로그인ID
  let val = "akfangus";
  let val2 = mytoken;
  $("#my-info").empty();
  temp_html = `<div class="card card-id" style="width: 18rem">
  <form
    action="/Mypage/modify"
    method="post"
    enctype="multipart/form-data"
  >
    <img
      src="https://avatars.githubusercontent.com/u/39788340?v=4"
      class="card-img-top mx-auto rounded-circle"
      alt="No Image"
    />
    <div class="form-group">
      <label for="exampleFormControlFile1">Example file input</label>
      <input
        type="file"
        class="form-control-file"
        id="exampleFormControlFile1"
        name="image1"
      />
    </div>

    <div class="form-group">
      <input class="form-control" type="text" placeholder="nickname" name="nickname1" />
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Example textarea</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        name="textarea1"
      ></textarea>
    </div>
    <div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <button onclick="modify_cancel()" class="btn btn-danger">
        cancel
      </button>
    </div>
  </form>
</div>`;

  $("#my-info").append(temp_html);
}
