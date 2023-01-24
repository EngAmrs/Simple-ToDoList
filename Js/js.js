//Start Global variables

//Lists
const list = document.getElementById("list");
const listUnchecked = document.getElementById("list").getElementsByClassName("unchecked")[0];
const listchecked = document.getElementById("list").getElementsByClassName("checked")[0];
//input
const addTaskInput = document.getElementById("input").getElementsByClassName("taskInp")[0];
const addTaskBtn = document.getElementById("input").getElementsByTagName("i")[0];
//local storage
var existingEntries = JSON.parse(localStorage.getItem("tasks"));
var checkedList = JSON.parse(localStorage.getItem("Compelete"));
let completed = false;
var id = Date.now();
//End Global variables

loadHtml();

// Add new item
addTaskBtn.addEventListener('click', ()=>{
id = Date.now();

// Save allEntries back to local storage for tasks
existingEntries = JSON.parse(localStorage.getItem("tasks"));
if(existingEntries == null) existingEntries = [];
var entryTitle = addTaskInput.value;

var entry = {"id": id, "value": entryTitle, "done": completed};

existingEntries.push(entry);
localStorage.setItem("tasks", JSON.stringify(existingEntries));
listUnchecked.innerHTML += `<li name="${entry["id"]}"><input class="custom-checkbox" type="checkbox" id="${entry["id"]}"><label for="${entry["id"]}">${entry["value"]}</label><span act="delet">X</span></li>`
addTaskInput.value = "";
})



//Switching between 2 localstorage objects
function checkedLi(e){
    for(let i = 0; i < existingEntries.length; i++){  
       if(e.target.id == existingEntries[i]['id']) {
            if(e.target.checked){
                console.log("test");
                completed = true;  
                existingEntries[i]["done"] = completed
                localStorage.setItem("tasks", JSON.stringify(existingEntries));  
            }     
        }
        if(existingEntries[i]["done"] === true){
            checkedList = JSON.parse(localStorage.getItem("Compelete"));
            if(checkedList == null) checkedList = [];
            var entry2 = existingEntries[i];
            
            checkedList.push(entry2);
            localStorage.setItem("Compelete", JSON.stringify(checkedList));

            existingEntries.splice(i,1); 
            localStorage.setItem("tasks", JSON.stringify(existingEntries));
            listchecked.appendChild(e.target.parentElement);
        }
    }



    for(let i = 0; i < checkedList.length; i++){
        if(e.target.id == checkedList[i]['id']) {
            if(!e.target.checked){
                console.log("test2");
                completed = false;
                checkedList[i]["done"] = completed
                localStorage.setItem("Compelete", JSON.stringify(checkedList));
            } 
        }
            if (checkedList[i]["done"] === false){
                existingEntries = JSON.parse(localStorage.getItem("tasks"));
                var entry = checkedList[i];
    
                existingEntries.push(entry);
                localStorage.setItem("tasks", JSON.stringify(existingEntries));
    
                checkedList.splice(i,1); 
                localStorage.setItem("Compelete", JSON.stringify(checkedList)); 
                listUnchecked.appendChild(e.target.parentElement);
            }
    
    } 
    
}

list.addEventListener('change', checkedLi);



//Remove

function Remove(e){
    if(e.target.getAttribute("act") === "delet" && existingEntries != undefined){
            for(let i = 0; i < existingEntries.length; i++){
                 if (existingEntries[i]["id"] == e.target.parentElement.getAttribute("name")){
                    existingEntries.splice(i,1); 
                    localStorage.setItem("tasks", JSON.stringify(existingEntries));
                }
            }
            e.target.parentElement.remove();  
    }
    if(e.target.getAttribute("act") === "delet" && checkedList != undefined){   

        for(let i = 0; i < checkedList.length; i++){      
            if(checkedList[i]["id"] == e.target.parentElement.getAttribute("name")){
                checkedList.splice(i,1); 
                localStorage.setItem("Compelete", JSON.stringify(checkedList)); 
            }
        }
        e.target.parentElement.remove();  
     }        
}
    
    list.addEventListener('click', Remove);




function loadHtml(){
    //Reload both lists
    if(JSON.parse(localStorage.getItem("tasks")) !== null){
        for( let i = 0;i < existingEntries.length; i++){
            listUnchecked.innerHTML += `<li name="${existingEntries[i]["id"]}"><input class="custom-checkbox" type="checkbox" id="${existingEntries[i]["id"]}"><label for="${existingEntries[i]["id"]}">${existingEntries[i]["value"]}</label><span act="delet">X</span></li>`
        }
    }
    if(JSON.parse(localStorage.getItem("Compelete")) !== null){
        for( let i = 0;i < checkedList.length; i++){
            listchecked.innerHTML += `<li name="${checkedList[i]["id"]}"><input class="custom-checkbox" type="checkbox" id="${checkedList[i]["id"]}" checked><label for="${checkedList[i]["id"]}">${checkedList[i]["value"]}</label><span act="delet">X</span></li>`
        }
    }
}
