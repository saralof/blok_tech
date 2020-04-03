
let editMsg = document.querySelector('.i')

function showBox() {
    let clickEdit = document.getElementById(i+'_lbl')
    let hideMsg = document.getElementById(i+'_txt')
    clickEdit.classList.toggle('show')
    hideMsg.classList.toggle('hide')
}

editMsg.addEventListener("click", showBox)