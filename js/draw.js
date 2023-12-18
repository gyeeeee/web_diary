function draw_login_page(){
  $('#header').empty();
  $('#footer').empty();
  $('#section').empty();
  $('#section').load('component/login.html', () => {

  });
}

function  draw_signIn_page(){
  $('#header').empty();
  $('#footer').empty();
  $('#section').empty();
  $('#section').load('component/sign.html', () => {

  });
}

function draw_diary_list(list){
  let target = $('#diary_div');
  let cookie = getCookie('user');
  let tempHTML = "";
  if(isEmpty(list)){
    tempHTML = `<h2 class='w-full text-center text-sm md:text-lg text-pink-600'>다이어리가 없습니다. 다이어리를 작성해보세요</h2>`;
  }else{
    let tempJSON = JSON.parse(list);
    g_diary_list = tempJSON;
    let my_list = tempJSON.filter((items) => {
      return items.writer == cookie;
    });
    $.each(my_list, function(key, items){
      tempHTML = tempHTML + `<div class="border-1 rounded p-5">
            <h1 class="text-lg md:text-2xl font-bold mb-2">${items.title}</h1>
            <p class="mb-5">작성일 : ${items.date}</p>
            <div class="w-full gap-2 flex items-center justify-end">
              <button class="text-sm md:text-base py-2 px-4 bg-pink-600 rounded text-white font-bold btn_view" data-title='${items.title}'>보기</button>
              <button class="text-sm md:text-base py-2 px-4 bg-pink-600 rounded text-white font-bold btn_update" data-title='${items.title}'>수정</button>
              <button class="text-sm md:text-base py-2 px-4 bg-gray-200 rounded text-pink-600 font-bold btn_del" data-title='${items.title}'>삭제</button>
            </div>
          </div>`;
    });
  }
  target.html(tempHTML);
}

function draw_index(userCookie = ""){
  $('#header').empty();
  $('#footer').empty();
  $('#section').empty();

  $('#header').load('component/header.html', () => {
    let tempHTML = "";
    if(isEmpty(userCookie)){
      tempHTML = `<button class='bg-pink-600 cursor-pointer py-2 px-4 text-white rounded text-xs md:text-sm' id='btn_login_page'>로그인</button>`;
    }else{
      tempHTML = `<span>${userCookie}</span><button class='ml-1 bg-pink-600 cursor-pointer py-2 px-4 text-white rounded text-xs md:text-sm' id='btn_logout'>로그아웃</button>`;
    }

    $('#btn_box').html(tempHTML);
  });
  $('#footer').load('component/footer.html');

  if(isEmpty(userCookie)){
    $('#section').load('component/main_page.html', () => {
     
    });
  }else{
    $('#section').load('component/my_page.html', () => {
      $('#main_name').text(`${userCookie}님 다이어리`)
      let list = localStorage.getItem('diary_list');
      draw_diary_list(list);
    }); 
  }

}