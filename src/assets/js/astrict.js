/*var lastTime = new Date().getTime();
var currentTime = new Date().getTime();
var timeOut = 1 * 30 * 1000; //设置超时时间： 30分
 
window.onload = function () {
  window.document.onmousedown = function () {
    localStorage.setItem("lastTime",new Date().getTime());
	lastTime = localStorage.getItem("lastTime",new Date().getTime());
  }
};
function checkTimeout() {
  currentTime = new Date().getTime(); //更新当前时间
  // console.log(currentTime - lastTime);
  // console.log(timeOut);
  if (currentTime - lastTime > timeOut) { //判断是否超时
    // console.log("超时");
    var url = window.location.href;
    var newUrl=url.match(/(\S*)#/)[1];
    
    window.open(newUrl + '#/login','_self');
  }
}
 
window.setInterval(checkTimeout, 1000);  
/* 定时器 间隔30秒检测是否长时间未操作页面 */
 