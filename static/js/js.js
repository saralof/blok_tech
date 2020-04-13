//Style changes depending on whether or not there's JS in browser
const yesjs = document.getElementById("yesjs");

yesjs.classList.remove("nojs");

//Display edit field

for (i = 0; i < 3; i++) {
let x = i

let editMsg = document.querySelector('#editButton' + x)

function showBox() {
    const clickEdit = document.getElementById('editMsg' + x)
    const saveMsg = document.getElementById('saveMsg' + x)
    const hideMsg = document.getElementById('theMsg' + x)
    const hideButton = document.getElementById('editButton' + x)
    clickEdit.classList.remove('hideEdit')
    saveMsg.classList.remove('hideEdit')
    hideMsg.classList.toggle('hideMsg')
    hideButton.classList.toggle('hideButton')
}

editMsg.addEventListener("click", showBox)
}


function getRandomSub(){
let subNr = Math.floor(Math.random() * 10)
const randomSub = document.getElementById('sub' + subNr)
randomSub.classList.remove('hideSub')
}

window.addEventListener('load', getRandomSub);