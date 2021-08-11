//menu 컨트롤
var menuButton = document.querySelector(".menu-button");
var menu = document.querySelector("#menu-select");

menuButton.addEventListener("click", function () {
    menu.classList.toggle("visible");
});

//action bar 컨트롤
var actionBarButton = document.querySelector(".action-bar-button");
var actionBar = document.querySelector(".action-bar");

actionBarButton.addEventListener("click", actionBarClick);

setTimeout(function () {
    actionBarClick();
    setTimeout(actionBarClick, 1800);
}, 10);


function actionBarClick() {
    actionBar.classList.toggle("visible");
    actionBarButton.classList.toggle("turn");
};

//login 노출
var isLogin = false;
var loginBlock = document.querySelector(".login");
var loginInfo = document.querySelector(".myinfo");

var userName = loginInfo.querySelector(".name");
var userMail = loginInfo.querySelector(".mail");
function displayLogin() {
    if (isLogin) {
        loginBlock.style.display = "none";
        loginInfo.style.display = "grid";
    } else {
        loginBlock.style.display = "inline-block";
        loginInfo.style.display = "none";
    }
};

//부드러운 스크롤 (구버전 IE에서 작동이 안되는 호환성 문제 해결 필요)
var scroll_e = document.querySelectorAll(".scroll");
for (let i = 0; i < scroll_e.length; i++)
    scroll_e[i].addEventListener("click", function () {
        var target = document.getElementById('by' + scroll_e[i].id);
        var targetY = target.offsetTop; //타겟 위치        
        targetY = targetY - document.getElementById('main-header').offsetHeight;
        window.scrollTo({ top: targetY, left: 0, behavior: 'smooth' });
    });


