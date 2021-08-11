let infoJson = "";
let fetchUrl = "http://203.241.228.134:3000/views/info.json"
let machineCount = 0;
let listUi = document.querySelector(".view");
let spaceList = document.querySelector('#bylist_space');
let menuBar = document.querySelector(".list");
let reloadBtn = document.querySelector(".select-reload");
let temperaturebox = listUi.querySelector("#temperature");
let humiditybox = listUi.querySelector("#humidity");
let season = 0;
let seasonControl = listUi.querySelector("#season");

let temperature = new Array();
temperature[0] = temperaturebox.querySelector("#tempCurrent");
temperature[1] = temperaturebox.querySelector("#tempMin");
temperature[2] = temperaturebox.querySelector("#tempMax");

let humidity = new Array();
humidity[0] = humiditybox.querySelector("#humidCurrent");
humidity[1] = humiditybox.querySelector("#humidMin");
humidity[2] = humiditybox.querySelector("#humidMax");

var myHeader = new Headers();

var myInit = {
    method : 'GET',
    headers : myHeader,
    mode: 'no-cors',
    cache : 'default'
};

var myRequest = new Request(fetchUrl, myInit);

window.addEventListener("load", function(){
    menuBar.addEventListener("click", function(e){
        if(!e.target.classList.contains("select")) return;
        if(e.target.id == ""){
            document.querySelector('#'+e.target.parentNode.id).querySelector('.select-arrow').classList.toggle('turn');
            document.querySelector('#by'+e.target.parentNode.id).classList.toggle('visible');
        }
        else{
            document.querySelector('#'+e.target.id).querySelector('.select-arrow').classList.toggle('turn');
            document.querySelector('#by'+e.target.id).classList.toggle('visible');
        }      
    });

    reloadBtn.addEventListener("click", function(){
        console.log("updata!",fetchUrl);
        myRequest = new Request(fetchUrl, myInit);
        let spacechild = spaceList.childNodes;
        for(;spacechild[0] != null;)
            spacechild[0].remove();
        getInfo();
        addMachineEvent();    
    });
    getInfo();
    addMachineEvent();
});

function addMachineEvent(){
    spaceList.addEventListener("click", function(e){
        if(!e.target.classList.contains("machine")) return;
        let selectedMachine = 0;
        if(e.target.id == "")
            selectedMachine = e.target.parentNode.id;
        else
            selectedMachine = e.target.id;
        selectedMachine = Number(selectedMachine);
        displayInfo(selectedMachine);
    });
}

function displayInfo(index){
    temperature[0].textContent = infoJson[index - 1]["temp"];    
    temperature[1].textContent = infoJson[index - 1]["mintemp"];
    temperature[2].textContent = infoJson[index - 1]["maxtemp"];    

    humidity[0].textContent = infoJson[index - 1]["humi"];
    humidity[1].textContent = infoJson[index - 1]["minhumi"];
    humidity[2].textContent = infoJson[index - 1]["maxhumi"];    
    updataSeason();
};

function updataSeason(){
    season = seasonControl.value;
    if(season == 0)
        elementColor(19 ,23, 50);
    else if(season==1)
        elementColor(24,27, 60);
    else    
        elementColor(18,21, 40);
};

seasonControl.addEventListener("change", updataSeason);

function elementColor(min, max, humi){
    
    temperature.forEach(function(el){
        if(el.textContent < min)
            el.style.color = "blue";
        else if(el.textContent <= max)
            el.style.color = "green";    
        else 
            el.style.color = "red";
    });
    humidity.forEach(function(el){
        if(el.textContent < humi)
            el.style.color = "blue";
        else if(el.textContent == humi)
            el.style.color = "green";    
        else 
            el.style.color = "red";        
    });
}


function addSpaceNode(spaceName){
    if(spaceList.querySelector("#"+spaceName) != null) return;
    
    let newSpaceNode = document.createElement("li");
    newSpaceNode.id = spaceName;
    newSpaceNode.classList.add("select")
    newSpaceNode.innerHTML =
    '<span class="select-name select">'+ spaceName +'</span> \
    <i class="fas fa-chevron-circle-left select-arrow select"></i>';
    spaceList.appendChild(newSpaceNode);
    
    let newSpaceUl = document.createElement("ul");
    newSpaceUl.id = "by" + spaceName;
    newSpaceUl.classList.add("invisible");
    spaceList.appendChild(newSpaceUl);
}

function addMachineNode(index, machine){
    let spaceUl = spaceList.querySelector("#by"+ machine[index]["space"]);
    let newMachineNode = document.createElement("li");
    newMachineNode.id = machine[index]["number"];
    newMachineNode.classList.add("machine");
    newMachineNode.innerHTML = 
    '<img class="machine" src="../../images/running/machine.jpg" > \
    <span class="machine">'+ machine[index]["number"] +'</span>';
    spaceUl.appendChild(newMachineNode);
}
function makeMenu(jsonfile){
    let machineCount = Object.keys(jsonfile).length;       
    for(let i = 0; i < machineCount; i++){
        addSpaceNode(jsonfile[i]["space"]);  
        addMachineNode(i, jsonfile);
    }       
        
}

function getInfo(){
    fetch(myRequest)
        .then(function(response){            
            return response.json();
        })
        .then(function(Jsonfile){
            infoJson = Jsonfile;
            makeMenu(infoJson);
        });
};

function viewUrl(){
    console.log(fetchUrl);
}



   