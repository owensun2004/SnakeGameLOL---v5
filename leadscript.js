const ul = document.querySelector('ul');
const input = document.getElementById('item');
var ptitle=document.getElementById('smttit');
var btn=document.getElementById('addbut');
var checker=0;
let itemsArray = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];

for(let i=0;i<itemsArray.length;i++){
    itemsArray[i][0]=parseInt(itemsArray[i][0]);
}
itemsArray.sort(sortFunction);

addTask(itemsArray);
//console.log(itemsArray);
//itemsArray.forEach(addTask);
var todo=document.getElementById("todo");
var overlay=document.getElementById("overlay");

if(getCookie("lpop")=="1"){
    todo.classList.add("open-popup");
    overlay.classList.add('active');
}else if(getCookie("lpop")=="0"){
    todo.classList.remove("open-popup");
    overlay.classList.remove('active');
}

function addTask(arr){
    ul.innerHTML="";
  for(let i=0;i<arr.length;i++){
    const li = document.createElement('li');
    li.textContent = arr[i][1];
    ul.appendChild(li);
    const li2 = document.createElement('li');
    li2.textContent = arr[i][0];
    ul.appendChild(li2);
  }
}

function add(){
  //itemsArray.push(input.value);
  if(checker==0){
    let a= checkName(input.value, itemsArray);
    if(a==0){
      //NOTE1 maybe consider parsing getCookie to int??
      if(itemsArray.length==10 && parseInt(getCookie("gamescore"))<itemsArray[9][0]){
        //case 1: max limit and new player score is less than top 10
        alerting();
        return;
      }else if(itemsArray.length==10){
        //case 2: max limit shown with new player with high score
        itemsArray.pop();
        itemsArray.push([getCookie("gamescore"), input.value]);
      }else{
        //case 3: new player with high score and no max limit
        itemsArray.push([getCookie("gamescore"), input.value]);
      }
      alerting2(2);
      return;
    }else if(a==1){
      alerting2(1);
      return;
    }else{
      alerting2(1.5)
      return;
    }
    
  }else{
    checker=0;
    btn.innerHTML="Add Item";
    ptitle.innerHTML="Submit your score here";
    input.classList.remove("hide");
  }
  itemsArray.sort(sortFunction);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  addTask(itemsArray);

  input.value = '';
  document.cookie="lpop=0;";
  //sortList();
  todo.classList.remove("open-popup");
    overlay.classList.remove('active');
  
}

function XclosePopUp(){
  if(checker==1){
    add();
    return;
  }
  input.value = '';
  document.cookie="lpop=0;";
  //sortList();
  todo.classList.remove("open-popup");
    overlay.classList.remove('active');
}

function alerting(){
  btn.innerHTML="Okay";
  ptitle.innerHTML="Sorry, your score is too low, pls play again";
  input.classList.add("hide");
  checker=1;
}

function alerting2(num){
  btn.innerHTML="Okay";
  if(num==1){
    ptitle.innerHTML="Hi "+ input.value+", your score has been updated with your new record!";
  }else if(num==1.5){
    ptitle.innerHTML="Hi "+ input.value+", your score will not be updated since your new score is lower than your original";
  }else if(num==2){
    ptitle.innerHTML="Welcome to Snake Game "+ input.value+"! Your score has been added to the leaderboard!";
  }
  input.classList.add("hide");
  checker=1;
}

function checkName(pname, arr){
    for(let i=0;i<arr.length;i++){
        if(pname==arr[i][1]){
            //NOTE1 same here
          if(arr[i][0]<parseInt(getCookie("gamescore"))){
            arr[i][0]=getCookie("gamescore");
            return 1;
          }else{
            return 2;
          }
            
        }
    }
    return 0;
}

function del(){
    localStorage.clear();
    ul.innerHTML = '';
    itemsArray = [];
  }


  function sortFunction(a, b) {
      if (a[0] === b[0]) {
          return 0;
      }
      else {
          return (a[0] > b[0]) ? -1 : 1;
      }
  }

/*
  function sortList() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("id01");
    switching = true;
    // Make a loop that will continue until
    //no switching has been done: 
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("LI");
      // Loop through all list-items:
      for (i = 0; i < (b.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        // check if the next item should
        //switch place with the current item: 
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          // if next item is alphabetically
          //lower than current item, mark as a switch
          //and break the loop: 
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        // If a switch has been marked, make the switch
        //and mark the switch as done: 
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }
  */

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }