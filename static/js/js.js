//Style changes depending on whether or not there's JS in browser, 
//if there's no JS this won't load, so class "nojs" will remain on the body of the file
const yesjs = document.getElementById("yesjs");

yesjs.classList.remove("nojs");

//Display edit field, the editfield is hidden behind a button (unless there's nojs), when the user clicks on this button the edit
//field and save button will show up, while the edit button, and message will hide.
//There's multiple messages, x will determine which one is being clicked and which one will be hidden/showed.

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

//get one of the subs to remove the hidden css. User only sees this subject as suggestion to talk about
function getRandomSub(){
let subNr = Math.floor(Math.random() * 10)
const randomSub = document.getElementById('sub' + subNr)
randomSub.classList.remove('hideSub')
}

window.addEventListener('load', getRandomSub);