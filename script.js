let input = document.querySelector('.input-text')
let add = document.querySelector('.add')
let tasksContainer = document.querySelector('.tasks')

let tasksList = []

if (window.localStorage.getItem('tasks')) {
  tasksList = JSON.parse(window.localStorage.getItem('tasks'))
}

showLSData()

add.addEventListener('click', function () {
  if (input.value !== '') {
    addToList(input.value)
    input.value = ''
  }
})

tasksContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    deleteTask(e.target.parentElement.parentElement.getAttribute('data-id'))
    e.target.parentElement.parentElement.remove()
  }

  if (e.target.classList.contains('edit')) {
    let textDiv = e.target.parentElement.parentElement.firstChild
    let targetId = e.target.parentElement.parentElement.getAttribute('data-id')
    if (textDiv.getAttribute('contentEditable') == 'true') {
      let str = textDiv.innerText
      toggleEdit(textDiv)
      deleteTask(targetId)
      e.target.parentElement.parentElement.remove()
      addToList(str)
    } else {
      toggleEdit(textDiv)
    }
  }

  if (e.target.classList.contains('task')) {
    toggleStatus(e.target.getAttribute('data-id'))
    e.target.classList.toggle('done')
  }
})

function addToList(value) {
  let task = {
    id: Date.now(),
    content: value,
    completed: false,
  }
  tasksList.push(task)
  addToPage(tasksList)
  pushToLocalStorage(tasksList)
}

function addToPage(arr) {
  tasksContainer.innerHTML = ''
  arr.forEach((task) => {
    let div = document.createElement('div')
    div.className = 'task'
    if (task.completed) {
      div.className = 'done task'
    }
    div.setAttribute('data-id', task.id)
    let taskTextDiv = document.createElement('div')
    taskTextDiv.className = 'task-text'
    taskTextDiv.setAttribute('contentEditable', 'false')
    taskTextDiv.appendChild(document.createTextNode(task.content))
    div.appendChild(taskTextDiv)

    let delSpan = document.createElement('span')
    delSpan.className = 'delete'
    delSpan.appendChild(document.createTextNode('Delete'))
    div.appendChild(delSpan)

    let editLink = document.createElement('a')
    editLink.setAttribute('href', '#')
    editLink.className = 'edit'
    editLink.appendChild(document.createTextNode('Edit'))

    let div2 = document.createElement('div')
    div2.appendChild(editLink)
    div2.appendChild(delSpan)

    div.appendChild(div2)
    tasksContainer.appendChild(div)
  })
}

function pushToLocalStorage(tasksList) {
  window.localStorage.setItem('tasks', JSON.stringify(tasksList))
}

function showLSData() {
  let data = window.localStorage.getItem('tasks')
  if (data) {
    let tasks = JSON.parse(data)
    addToPage(tasks)
  }
}

function deleteTask(id) {
  tasksList = tasksList.filter((task) => task.id != id)
  pushToLocalStorage(tasksList)
}

function toggleStatus(id) {
  for (let element of tasksList) {
    if (element.id == id) {
      element.completed == false
        ? (element.completed = true)
        : (element.completed = false)
    }
  }
  pushToLocalStorage(tasksList)
}

function toggleEdit(textDiv) {
  textDiv.getAttribute('contentEditable') == 'false'
    ? textDiv.setAttribute('contentEditable', 'true')
    : textDiv.setAttribute('contentEditable', 'false')
}
