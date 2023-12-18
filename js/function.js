// 맴버리스트를 불러온다
function loadMember(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', 'data/member.json', true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText)
          callback(xhr.responseText);
      }
  };
  xhr.send(null);
}

// 맴버리스트 로컬스토리지에 저장
function processJSON(jsonData) {
  var memberList = JSON.parse(jsonData);

  localStorage.setItem('member_list', JSON.stringify(memberList));

}

// 쿠키 가져오는 함수
function getCookie(cookieName) {
  cookieName = cookieName + '=';
  var cookieData = document.cookie;
  var start = cookieData.indexOf(cookieName);
  var cookieValue = '';
  if(start != -1){
      start += cookieName.length;
      var end = cookieData.indexOf(';', start);
      if(end == -1)end = cookieData.length;
      cookieValue = cookieData.substring(start, end);
  }
  return unescape(cookieValue);
}

// 쿠키값을 설정하는 함수
function setCookie(cookieName, value, exdays, httpOnly=false, secure=false){
  var exdate = new Date();
  if (exdays == ""){
      exdate.setDate(exdate.getDate() + exdays);
      var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
  }
  else{
      exdate.setDate(exdate.getDate() + exdays);
      var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
  }
  if (httpOnly && secure){
    document.cookie = cookieName + "=" + cookieValue + "; httpOnly; Secure";
  } else if(httpOnly && !secure){
    document.cookie = cookieName + "=" + cookieValue + "; httpOnly";
  } else if (!httpOnly && secure){
    document.cookie = cookieName + "=" + cookieValue + "; Secure";
  }
  else{
    document.cookie = cookieName + "=" + cookieValue + ";"
  }
}

// 쿠키값을 삭제하는 함수
function deleteCookie(cookieName){
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() - 1);
  document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

// 값이 공백인지 아닌지 확인하는 함수
function isEmpty(value, pMsg=""){
  if( value == "" || value == null || value == 'null' || value == "undefined" || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
    if (pMsg !== "")
      alert(pMsg);
    return true
  }else{
      return false
  }
}