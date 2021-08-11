let userInfo;
let fetchUrl = "http://203.241.228.134:3000/user.json"

let mypage = document.querySelector(".mypage")
let user = mypage.querySelector("#user");
let machine = mypage.querySelector("#machine");
let setting = mypage.querySelector("#setting");

let userNameMyPage = user.querySelector("#name");
let userBirth = user.querySelector("#birth");
let userClass = user.querySelector("#class");

let machineHome = machine.querySelector("#home");
let machineFactroy = machine.querySelector("#factroy");
let machineOffice = machine.querySelector("#office");

let settingBackground = setting.querySelector("#background-color");
let settingFont = setting.querySelector("#font");
let settingFontSize = setting.querySelector("#font-size");

window.addEventListener("load",function(){
    fetch(fetchUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonfile){
        userInfo = jsonfile;        
        refreshInfo();
    })
});

function viewUrl(){
    console.log(fetchUrl);
}

function refreshInfo(){
    userNameMyPage.textContent = userInfo["Name"];
    userBirth.textContent = userInfo["Birthday"];
    userClass.textContent = userInfo["Class"];

    machineHome.textContent = userInfo["Have_Machine"][0]["home"];
    machineFactroy.textContent = userInfo["Have_Machine"][0]["Factroy"];
    machineOffice.textContent = userInfo["Have_Machine"][0]["Office"];

    settingBackground.value = userInfo["Home_setting"][0]["Background-c"];
    settingFont.textContent = userInfo["Home_setting"][0]["font"];
    settingFontSize.textContent = userInfo["Home_setting"][0]["font_size"];
    
}

function setBgColor(color){
    let hexColor = color;
    document.documentElement.style.setProperty('--color-background-mypage', hexColor);
}