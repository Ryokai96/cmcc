function ajax(method, url, data) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) {
      return;
    }
    if (xhr.status == 200) {
      console.log("请求成功", xhr.responseText);
    } else {
      console.log("请求失败", xhr);
    }
  }

  if (method == "GET") {
    xhr.open(method, url + "?" + data, true);
    xhr.send(null);
  } else if (method == "POST") {
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }
}

module.exports.ajax = ajax;