from flask import Flask, render_template, jsonify, request, redirect, url_for

from pymongo import MongoClient

# JWT 패키지를 사용합니다. (설치해야할 패키지 이름: PyJWT)
import jwt

# 토큰에 만료시간을 줘야하기 때문에, datetime 모듈도 사용합니다.
import datetime

import hashlib

app = Flask(__name__)

import requests
from bs4 import BeautifulSoup

from werkzeug.utils import secure_filename

client = MongoClient('mongodb+srv://test:sparta@cluster0.irjpymr.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


# JWT 토큰을 만들 때 필요한 비밀문자열
# 이 문자열은 서버만 알고있기 때문에, 내 서버에서만 토큰을 인코딩(=만들기)/디코딩(=풀기) 할 수 있습니다.
SECRET_KEY = 'SPARTA'


@app.route('/')
def hello_world():  # put application's code here
    return render_template('main.html')


# 로그아웃 API 부분으로 토큰 시간에 따라 로그아웃을 선택적으로 할 수 있다.
# @app.route('/check')
# def check():
#     token_receive = request.cookies.get('mytoken')
#     try:
#         payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
#         user_info = db.toch.find_one({"id": payload['id']})
#         return render_template('logout.html', nickname=user_info["nick"])
#     except jwt.ExpiredSignatureError:
#         return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
#     except jwt.exceptions.DecodeError:
#         return redirect(url_for("login", msg="로그인 정보가 존재하지 않음."))


@app.route('/login')
def login():
    msg = request.args.get("msg")
    return render_template('login.html', msg=msg)


@app.route('/register')
def register():
    return render_template('register.html')

# [로그인 API]
# id, pw를 받아서 맞춰보고, 토큰을 만들어 발급합니다.
@app.route('/api/login', methods=['POST'])
def api_login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    # id, 암호화된pw을 가지고 해당 유저를 찾습니다.
    result = db.toch.find_one({'id': id_receive, 'pw': pw_hash})

    # 찾으면 JWT 토큰을 만들어 발급합니다.
    if result is not None:
        # JWT 토큰에는, payload와 시크릿키가 필요합니다.
        # 시크릿키가 있어야 토큰을 디코딩(=풀기) 해서 payload 값을 볼 수 있습니다.
        # 아래에선 id와 exp를 담았습니다. 즉, JWT 토큰을 풀면 유저ID 값을 알 수 있습니다.
        # exp에는 만료시간을 넣어줍니다. 만료시간이 지나면, 시크릿키로 토큰을 풀 때 만료되었다고 에러가 납니다.
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=60)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # token을 줍니다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


@app.route('/Main', methods=['GET'])
def search_member():  # put application's code here
    name = request.args.get("name")
    name_list = list(db.gitDB.find({'id': name}, {'_id': False}))
    print(name_list)

    # 크롤링 영역
    #user-repositories-list > ul > li > div.col-10.col-lg-9.d-inline-block > div.d-inline-block.mb-1 > h3 > a
    data = requests.get(f"https://github.com/{name}?tab=repositories", headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    info = soup.select("#user-repositories-list > ul > li > div.col-10.col-lg-9.d-inline-block > div.d-inline-block.mb-1 > h3 > a")
    repo_list = [item.text.strip() for item in info]
    print(repo_list)
    return jsonify({'id_list': name_list, 'repo_list': repo_list})


@app.route('/signup', methods=['POST'])
def sign_up():

    # id_give가 문제라면서 자꾸 오류가 뜨네요. 문제원인을 모르겠어요
    id_receive = request.form['id_give']
    name_receive = request.form['name_give']
    pwd_receive = request.form['pwd_give']
    comment_receive = request.form['comment_give']
    img_receive = request.form['img_give']

    pwd_hash = hashlib.sha256(pwd_receive.encode('utf-8')).hexdigest()

    account = {
        'id': id_receive,
        'name': name_receive,
        'passwd': pwd_receive,
        'comment': comment_receive,
        'img': img_receive
    }
    db.gitDB.insert_one(account)
    return jsonify({'result': 'success'})


@app.route('/Mypage')
def mypage():
    return render_template('mypage.html')


@app.route('/Mypage/modify', methods=['POST'])
def do_modify():
    ff = request.files['image1']
    f = request.form
    print(secure_filename(ff.filename))
    print(f)
    ff.save('./static/image/' + secure_filename(ff.filename))
    return jsonify({'msg': f})


@app.route('/UserList', methods=['GET'])
def users_list():

    return render_template("member.html")

@app.route('/UserList/call', methods=['GET'])
def users_list_call():
    user_list = list(db.gitDB.find({}, {'_id': False}))
    return jsonify({'user_call':user_list})


if __name__ == '__main__':
    app.run(debug=True)
