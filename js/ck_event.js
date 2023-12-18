$(document).on('click', '#btn_start', function(){
  draw_login_page();
});
$(document).on('click', '#btn_login_page', function(){
  draw_login_page();
});

// 로그인버튼 클릭 시
$(document).on('click', '#btn_login', function(){
  let user_id = $('#user_id').val();
  let user_pw = $('#user_pw').val();

  // 맴버리스트의 값을 받아온다
  let pJSON = localStorage.getItem("member_list");
  pJSON = JSON.parse(pJSON);

  let login_state = false;

  $.each(pJSON, function(key, items){
    if(items.mem_id === user_id && String(items.mem_pw) === String(user_pw)){
      login_state = true;
    }
  });

  if(login_state){
    pJSON = pJSON.filter((items) => {
      return items.mem_id === user_id;
    });
    pJSON = pJSON[0];
    setCookie('user', pJSON.mem_name);

    let cookie = getCookie('user');

    draw_index(cookie);
  }else{
    alert('아이디 및 비밀번호가 존재하지 않습니다.');
    return;
  }
  console.log(pJSON.mem_id);
});

// 회원가입 클릭시
$(document).on('click', '#btn_signIn', function(){
  let senJSON = {};
  let user_name = $('#user_name').val();
  let user_id = $('#user_id').val();
  let user_pw = $('#user_pw').val();
  let user_pw_chk = $('#user_pw_chk').val();
  if(isEmpty(user_name)){
    alert('이름을 입력하세요');
    $('#user_name').focus();
    return;
  }
  if(isEmpty(user_id)){
    alert('아이디를 입력하세요');
    $('#user_id').focus();
    return;
  }
  if(isEmpty(user_pw)){
    alert('비밀번호를 입력하세요');
    $('#user_pw').focus();
    return;
  }
  if(user_pw != user_pw_chk){
    alert('입력한 비밀번호와 비밀번호 확인이 맞지 않습니다.');
    $('#user_pw_chk').focus();
    return;
  }
  var isChecked = $("#user_agree_chk").prop("checked");
  if(!isChecked){
    alert('개인정보 처리방침에 동의 해주세요');
    return;
  }

  let pJSON = localStorage.getItem("member_list");
  pJSON = JSON.parse(pJSON);
  g_member_list = pJSON;

  senJSON.mem_id = user_id;
  senJSON.mem_pw = user_pw;
  senJSON.mem_name= user_name;
  g_member_list.push(senJSON);
  localStorage.setItem('member_list', JSON.stringify(g_member_list));

  alert('회원가입이 완료되었습니다');
  draw_login_page();

});

// 로그아웃버튼 클릭시
$(document).on('click', '#btn_logout', function(){
  deleteCookie('user');

  let cookie = getCookie('user');

  draw_index(cookie);
});

// 나가기 클릭 시
$(document).on('click', '#btn_out', function(){

  draw_index();
});

// 회원가입 버튼 클릭시
$(document).on('click', '#btn_signIn_page', function(){
  draw_signIn_page();
});

// 다이어리 쓰기 클릭시
$(document).on('click', '#btn_diary_write', function(){
  $('#aside_write').addClass('active');
  $('#aside_write').load('component/diary_write.html');
});
// 다이어리 쓰기 닫기
$(document).on('click', '#btn_write_close', function(){
  $('#aside_write').empty();
  $('#aside_write').removeClass('active');
});
// 다이어리 작성
$(document).on('click', '#btn_write', function(){
  let value = $('#titles').val();
  let cookie = getCookie('user');
  let sendJSON = {};

  let title = $('#title').val();
  let content = $('#content').val();

  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;

  let date = year + '-' + month + '-' + day;

  if(isEmpty(value)){
    sendJSON.title = title;
    sendJSON.content = content;
    sendJSON.date = date;
    sendJSON.writer = cookie;

    g_diary_list.push(sendJSON);
    localStorage.setItem('diary_list', JSON.stringify(g_diary_list));

    let list = localStorage.getItem('diary_list');
    draw_diary_list(list);
  }else{
    let list = localStorage.getItem('diary_list');
    list = JSON.parse(list);
    $.each(list, function(key,items){
      if(items.title == value){
        items.title = title;
        items.content = content;
      }
    });
    localStorage.setItem('diary_list', JSON.stringify(list));

    let last_list = localStorage.getItem('diary_list');
    draw_diary_list(last_list);
  }

  $('#aside_write').empty();
  $('#aside_write').removeClass('active');
});
// 다이어리 보기버튼 클릭
$(document).on('click', '.btn_view', function(){
  let title = $(this).data('title');
  let last_list = localStorage.getItem('diary_list');
  last_list = JSON.parse(last_list);
  last_list = last_list.filter((items) => {
    return items.title == title;
  });
  last_list = last_list[0];
  $('#aside_write').addClass('active');
  $('#aside_write').load('component/diary_view.html', () => {
    $('#title').text(last_list.title);
    $('#content').text(last_list.content);
  });
});

// 다이어리 수정버튼 클릭
$(document).on('click', '.btn_update', function(){
  let title = $(this).data('title');
  let last_list = localStorage.getItem('diary_list');
  last_list = JSON.parse(last_list);
  last_list = last_list.filter((items) => {
    return items.title == title;
  });
  last_list = last_list[0];
  $('#aside_write').addClass('active');
  $('#aside_write').load('component/diary_write.html', () => {
    $('#titles').val(title);
    $('#title').val(last_list.title);
    $('#content').val(last_list.content);
    $('#btn_write').text('수정하기')
  });
});

// 다이어리 삭제버튼 클릭
$(document).on('click', '.btn_del', function(){
  if(!confirm("삭제하시겠습니까?")){return false}
  let title = $(this).data('title');
  let last_list = localStorage.getItem('diary_list');
  last_list = JSON.parse(last_list);
  last_list = last_list.filter((items) => {
    return items.title != title;
  });
  localStorage.setItem('diary_list', JSON.stringify(last_list));

  let list = localStorage.getItem('diary_list');
  draw_diary_list(list);
});
