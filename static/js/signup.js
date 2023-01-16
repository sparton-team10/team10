
      // 회원가입 란 함수 - 공백이 있을 시 경고 띄우려고 해요. alert 대신 토스트 메시지 하고싶은뎅

      function signup() {
            let id = $('#id').val()
            let name = $('#name').val()
            let pwd = $('#passwd').val()
            let comment = $('#comment').val()
            let image = $('#image')

            $.ajax({
                type: 'POST',
                url: '/signup',
                data: {
                    id_give: id,
                    name_give: name,
                    pwd_give: pwd,
                    comment_give: comment,
                    image_give: image
                    },
                success: function (response) {

                    if (signup_id.replace(/\s| /gi, "").length == 0) {
                        alert("아이디는 공백일 수 없습니다");
                        $('#yourid').focus();
                    }
                    if (signup_name.replace(/\s| /gi, "").length == 0) {
                        alert("이름 공백일 수 없습니다");
                        $('#name').focus();
                    }
                    if (signup_pwd.replace(/\s| /gi, "").length == 0) {
                        alert("비밀번호는 공백일 수 없습니다");
                        $('#comment').focus();
                    }
                    if (comment.replace(/\s| /gi, "").length == 0) {
                        alert("코멘트를 입력해 주세요!");
                        $('#signup_pwd').focus();
                    }
                    else {
                     alert("회원 가입이 완료되었습니다.")
                    }
                    window.location.reload()
                }
            });
        }

            $("signupBtn").click(function(){
                  toastr.options = {
                      closeButton: true,
                      progressBar: true,
                      showMethod: 'slideDown',
                      timeOut: 4000
                  };
                  toastr.success('www.leafcats.com', 'Toastr success!');
    });

