    function signup() {
        let signup_id = $('#id').val()
        let signup_name = $('#name').val()
        let signup_pwd = $('#passwd').val()
        let signup_pwd2 = $('#passwd2').val()
        let gitcomment = $('#gitcomment').val()
        let gitimage = $('#image').val()

        if (signup_id.trim() == 0 || signup_id.trim() == null) {
            alert("아이디는 공백일 수 없습니다");
            $('#id').focus();
            return;
        }
        if (signup_name.trim() == 0 || signup_name.trim() == null) {
            alert("이름은 공백일 수 없습니다");
            $('#name').focus();
            return;
        }
        if (signup_pwd.trim() == 0 || signup_pwd.trim() == null) {
            alert("비밀번호는 공백일 수 없습니다");
            $('#passwd').focus();
            return;
        }
        if (signup_pwd2.trim() == 0 || signup_pwd2.trim() == null) {
            alert("비밀번호 확인을 해주세요!");
            $('#passwd2').focus();
            return;
        }
        if (signup_pwd != '' && signup_pwd2 == '' ) {
            null;
        } else if (signup_pwd != "" || signup_pwd2 != "") {
            if (signup_pwd == signup_pwd2) {
            } else {
                alert("비밀번호가 일치하지 않아요!");
                $('#passwd2').focus();
                return;
            }
        }
        if (gitcomment.trim() == 0 || gitcomment.trim() == null) {
            alert("코멘트를 입력해 주세요!");
            $('#gitcomment').focus();
            return;
        }

        console.log(signup_id)
        console.log(signup_name)
        console.log(signup_pwd)
        console.log(signup_pwd2)
        console.log(gitcomment)
        console.log(gitimage)

        $.ajax({
            type: 'POST',
            url: '/signup',
            data: {
                account_give: signup_id,
                name_give: signup_name,
                pwd_give: signup_pwd,
                comment_give: gitcomment,
                image_give: gitimage
            },

            success: function (response) {
                alert(response['msg'])
                location.href="/login"
            }
        });
    }
