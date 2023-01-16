$(document).ready(function () {
  listening();
});

function listening() {
  $("#repo_ul").empty();
  $.ajax({
    type: "GET",
    url: "/Mypage/favorite",
    data: {},
    success: function (response) {
      let rows = response["fav_list"];
      for (let i = 0; i < rows.length; i++) {
        console.log(rows[i]);
        temp_html = `
            <li class="result-repo-item">
            <img
              class="mypage-img"
              src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU"
            />
            <span> ${rows[i]}</span>
            <span><button class="btn-cancel btn-danger">cancel</button></span>
          </li>`;

        $("#repo_ul").append(temp_html);
      }
    },
  });
}

function modify_me() {
  // 로그인 정보 id를 가져와야합니다.
  //let val = 로그인ID
  let val = "akfangus";
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
      
    </div>
  </form>
  <button onclick="modify_cancel()" class="btn btn-danger">
        cancel
      </button>
</div>`;

  $("#my-info").append(temp_html);
}

function modify_cancel() {
  window.location.reload();
}
