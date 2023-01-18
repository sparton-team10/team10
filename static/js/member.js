$(document).ready(function () {
  //   alert("접속!");
  listening();
});

function listening() {
  $("#user-card").empty();
  $.ajax({
    type: "GET",
    url: "/UserList/call",
    data: {},
    success: function (response) {
      let rows = response["user_call"];
      for (let i = 0; i < rows.length; i++) {
        let name = rows[i]["name"];
        let img = rows[i]["img"];
        let comment = rows[i]["comment"];
        let id = rows[i]["id"];

        let temp_html = ` <div class="card">
                                    <div>
                                        <img src="/static/image/${img}.jpg" class="profile"/>
                                    </div>
                                    <div class="user-info">
                                        <h2>${id}</h2>
                                        <h2>${name}</h2>
                                        <div class="comment">
                                            ${comment}
                                        </div>
                                        <div class="btn">
                                           <button type="button" class="bookmk" style=cursor:pointer;>⭐bookmark</button>
                                        </div>
                                    </div>
                                   </div> `;

        $("#user-card").append(temp_html);
      }
    },
  });
}
