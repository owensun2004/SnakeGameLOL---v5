const ul = document.querySelector('ul');
const input = document.getElementById('item');
let itemsArray = localStorage.getItem('items') ?


JSON.parse(localStorage.getItem('items')) : [];
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
    li.textContent = arr[i][1] + " "+ arr[i][0];
    ul.appendChild(li);
  }
}

function add(){
  //itemsArray.push(input.value);
  if(checkName(input.value, itemsArray)==0){
    itemsArray.push([getCookie("gamescore"), input.value]);
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

function checkName(pname, arr){
    for(let i=0;i<arr.length;i++){
        if(pname==arr[i][1]){
            arr[i][0]=getCookie("gamescore");
            return 1;
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