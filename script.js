//reference Jeanette example//

const url = 'http://localhost:3000/notes'
const form = document.querySelector('#entry-form')
const entryList = document.querySelector('#entry-list')



form.addEventListener('submit', event => {
    event.preventDefault()
    const entryText = document.getElementById('entry-text').value
    // console.log(entryText, "this where it should show up")
    createEntry(entryText)
})

entryList.addEventListener('click', event =>{
if (event.target.classList.contains('delete')){
    deleteEntry(event.target)
}
})

entryList.addEventListener('click',event  => {
    if (event.target.classList.contains('update')){
        updateEntry(event.target)
    }
})
//Remember the CRUD functions//


function listEntry() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        for (let entry of data){
            renderEntryItem(entry)
        }
    })
}


function createEntry(entryText) {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: entryText,
            body: entryText,
            create_at: moment().format()
        })
    })
    .then(response => response.json())
    .then(data => 
        renderEntryItem(data))
    }

function deleteEntry(element) {
    const entryId = element.parentElement.id
    fetch(url + "/" + `${entryId}`, {
        method: 'DELETE'
    }).then(() => element.parentElement.remove())
}

//Use method: PATCH to request to edit item??//
//Still need to troubleshoot why the edit button isn't working//

function updateEntry(element) {
    const entryId = element.parentElement.id
    fetch(url + "/" + `${entryId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: entryText,
            body: entryText,
        })
    })
    .then(response => response.json())
    .then(data => renderEntryItem(data))
}


//DOM manipulation//

function renderEntryItem(entryObj) {
    const itemEl = document.createElement('li')
    itemEl.id = entryObj.id
    itemEl.classList.add('lh-copy', 'pv3', 'ba', 'bl-0', 'bt-0', 'br-0', 'b-black-3')
    renderTodoText(itemEl, entryObj)
    entryList.appendChild(itemEl)
    
} 

function renderTodoText(entryListItem, entryObj) {
    entryListItem.innerHTML = `<span class="dib w-60">${entryObj.body}</sp><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i>`
}

listEntry();
